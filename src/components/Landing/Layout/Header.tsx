import * as React from "react";
import LinkInterface from "../../../interfaces/link.interface";
import Login from "../Login";
import Nav from "../../ui/Nav";
import {
  Button,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi";
import { HiMenu, HiOutlineHome } from "react-icons/hi";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router";

type HeaderProps = {
  links: LinkInterface[];
  toggleMenu: () => void;
};

const Header = ({ links, toggleMenu }: HeaderProps) => {
  const { user } = useAuth();
  const { push } = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex as="header" justify="space-between" align="center" px={2} py={5}>
      <IconButton
        variant="ghost"
        aria-label="Toggle menu"
        icon={<HiMenu size={20} />}
        display={{ base: "flex", lg: "none" }}
        _focus={{}}
        onClick={toggleMenu}
      />

      <Stack direction="row" align="center" ml={{ lg: 10 }}>
        <Image src="logo.png" boxSize={8} />

        <Text fontWeight="bold">SmartIO</Text>
      </Stack>

      <Nav
        links={links}
        hasOnlyTitle
        navProps={{
          display: { base: "none", lg: "block" },
        }}
        listProps={{
          listStyleType: "none",
          display: "flex",
          gridGap: 5,
          m: 0,
        }}
        buttonProps={{
          variant: "ghost",
          px: 10,
          fontWeight: "bold",
          _focus: {},
          _active: {},
        }}
        activeLinkStyle={{ backgroundColor: "var(--chakra-colors-pink-500)" }}
      />

      {!user && (
        <Button
          variant="ssolid"
          display={{ base: "none", lg: "flex" }}
          mr={4}
          px={10}
          onClick={onOpen}
        >
          Login
        </Button>
      )}

      {user && (
        <IconButton
          variant="ghost"
          size="lg"
          aria-label="Go home"
          icon={<HiOutlineHome />}
          mr={{ base: 0, lg: 4 }}
          _focus={{}}
          onClick={() => push("/home")}
        />
      )}

      {!user && (
        <IconButton
          variant="ghost"
          size="lg"
          aria-label="Login"
          icon={<FiLogIn />}
          display={{ base: "flex", lg: "none" }}
          _focus={{}}
          onClick={onOpen}
        />
      )}

      {!user && <Login modalProps={{ isOpen, onClose }} />}
    </Flex>
  );
};

export default Header;

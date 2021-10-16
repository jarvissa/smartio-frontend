import * as React from "react";
import Nav from "../../ui/Nav";
import { Button, IconButton } from "@chakra-ui/button";
import { FiLogIn } from "react-icons/fi";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { HiMenu, HiOutlineHome } from "react-icons/hi";
import { Image } from "@chakra-ui/image";
import LinkInterface from "../../../interfaces/link.interface";
import { useDisclosure } from "@chakra-ui/hooks";
import Login from "../../Login";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router";

type HeaderProps = {
  links: LinkInterface[];
  toggleMenu: () => void;
};

const Header = ({ links, toggleMenu }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { push } = useHistory();

  return (
    <Flex as="header" justify="space-between" align="center" px={2} py={5}>
      <IconButton
        aria-label="Toggle menu"
        icon={<HiMenu size={20} />}
        variant="ghost"
        display={{ base: "flex", md: "none" }}
        _focus={{}}
        onClick={toggleMenu}
      />

      <Stack direction="row" align="center" ml={{ md: 10 }}>
        <Image src="logo.svg" boxSize={8} />

        <Text fontWeight="bold">SmartIO</Text>
      </Stack>

      <Nav
        links={links}
        navProps={{
          display: { base: "none", md: "block" },
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
          display={{ base: "none", md: "flex" }}
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
          mr={{ base: 0, md: 4 }}
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
          display={{ base: "flex", md: "none" }}
          _focus={{}}
          onClick={onOpen}
        />
      )}

      {!user && <Login modalProps={{ isOpen, onClose }} />}
    </Flex>
  );
};

export default Header;

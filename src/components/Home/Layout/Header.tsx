import * as React from "react";
import AddDevice from "../AddDevice";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";

const DATE = new Date();

const Header = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const date = DATE.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  });

  const time = DATE.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const greeting = () => {
    const hours = DATE.getHours();

    if (hours >= 6 && hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good afternoon";
    } else if (hours >= 18 && hours < 24) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };

  return (
    <GridItem as="header" colSpan={{ base: 12, lg: undefined }} p={4} pt={8}>
      <Button
        variant="ssolid"
        leftIcon={<FaPlus />}
        display="flex"
        mx={{ base: "auto", lg: 0 }}
        mb={{ base: 2, lg: 0 }}
        onClick={onOpen}
      >
        Add device
      </Button>

      <Flex justify={{ base: "center", lg: "space-between" }} align="center">
        <Box>
          <Text fontSize="xl" textAlign={{ base: "center", lg: "left" }}>
            {greeting()},{" "}
            <Text as="span" fontWeight="bold">
              {user?.displayName}
            </Text>
          </Text>

          <Text
            color="gray.500"
            fontSize="md"
            textAlign={{ base: "center", lg: "left" }}
          >
            Have a nice day!
          </Text>
        </Box>

        <Box display={{ base: "none", lg: "block" }}>
          <Text fontSize="5xl" textAlign="right">
            {time}
          </Text>

          <Text mt={-2} color="gray.500" textAlign="right">
            {date}
          </Text>
        </Box>
      </Flex>

      <AddDevice modalProps={{ isOpen, onClose }} />
    </GridItem>
  );
};

export default Header;

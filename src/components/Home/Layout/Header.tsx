import * as React from "react";
import { Box, GridItem, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";

const DATE = new Date();

const Header = () => {
  const { user } = useAuth();

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
    <GridItem
      as="header"
      display="flex"
      justifyContent={{ base: "center", lg: "space-between" }}
      alignItems="center"
      colSpan={{ base: 12, lg: undefined }}
      p={4}
    >
      <Box>
        <Text fontSize="xl" textAlign={{ base: "center", lg: "left" }}>
          {greeting()},{" "}
          <Text as="span" fontWeight="bold">
            {user?.username}
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
    </GridItem>
  );
};

export default Header;

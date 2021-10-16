import * as React from "react";
import { GridItem } from "@chakra-ui/layout";
import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <GridItem as="header" colSpan={{ base: 12, md: undefined }} p={2} bg="red">
      {"Good afternoon, " + user?.username}
    </GridItem>
  );
};

export default Header;

import * as React from "react";
import Header from "./Header";
import NavDrawer from "./Drawer";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../ui/Loading";

const links = [
  { key: "home", title: "Home", to: "/" },
  { key: "about", title: "About", to: "/about" },
];

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { loading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return !loading ? (
    <React.Fragment>
      <Header links={links} toggleMenu={onOpen} />

      <NavDrawer
        links={links}
        drawerProps={{ size: "full", placement: "left", isOpen, onClose }}
      />

      <Box as="main">{children}</Box>
    </React.Fragment>
  ) : (
    <Loading />
  );
};

export default Layout;

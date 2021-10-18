import * as React from "react";
import Header from "./Header";
import NavDrawer from "./Drawer";
import Sidebar from "./Sidebar";
import { Grid, GridItem, IconButton, useDisclosure } from "@chakra-ui/react";
import { HiHome, HiMenu } from "react-icons/hi";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
import { useAuth } from "../../../hooks/useAuth";
import { useGuard } from "../../../hooks/useGuard";
import { useHistory } from "react-router";

const links = [
  { key: "home", title: "Home", to: "/home", icon: HiHome },
  {
    key: "notifications",
    title: "Notifications",
    to: "/home/notifications",
    icon: IoMdNotifications,
  },
  {
    key: "settings",
    title: "Settings",
    to: "/home/settings",
    icon: IoMdSettings,
  },
];

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { user } = useAuth();
  const { push } = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useGuard(() => {
    if (!user) {
      push("/");
    }
  });

  return user ? (
    <Grid templateRows="auto 4fr" templateColumns="auto 3fr 1fr">
      <NavDrawer
        links={links}
        drawerProps={{ size: "full", placement: "left", isOpen, onClose }}
      />

      <Sidebar links={links} />

      <GridItem display={{ base: "flex", lg: "none" }} colSpan={12} p={2}>
        <IconButton
          variant="ghost"
          aria-label="Toggle menu"
          icon={<HiMenu size={20} />}
          _focus={{}}
          onClick={onOpen}
        />
      </GridItem>

      <Header />

      <GridItem
        as="aside"
        bgColor="yellow"
        rowSpan={{ lg: 2 }}
        colSpan={{ base: 12, lg: undefined }}
        order={{ base: 4, lg: 0 }}
      >
        aside
      </GridItem>

      <GridItem as="main" bgColor="green" colSpan={{ base: 12, lg: undefined }}>
        {children}
      </GridItem>
    </Grid>
  ) : (
    <p>salam</p>
  );
};

export default Layout;

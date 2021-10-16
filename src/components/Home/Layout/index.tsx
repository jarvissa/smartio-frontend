import * as React from "react";
import Header from "./Header";
import { Grid, GridItem, IconButton } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { useGuard } from "../../../hooks/useAuthGuard";
import { useHistory } from "react-router";
import { useDisclosure } from "@chakra-ui/hooks";
import NavDrawer from "./Drawer";
import { HiHome, HiMenu } from "react-icons/hi";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
import Sidebar from "./Sidebar";

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
    <Grid templateRows="1fr 3fr" templateColumns="auto 3fr 1fr">
      <NavDrawer
        links={links}
        drawerProps={{ isOpen, onClose, size: "full", placement: "left" }}
      />

      <Sidebar links={links} />

      <GridItem display={{ base: "flex", md: "none" }} colSpan={12}>
        <IconButton
          aria-label="Toggle menu"
          icon={<HiMenu size={20} />}
          variant="ghost"
          _focus={{}}
          onClick={onOpen}
        />
      </GridItem>

      <Header />

      <GridItem
        as="aside"
        bgColor="yellow"
        rowSpan={{ md: 2 }}
        colSpan={{ base: 12, md: undefined }}
        order={{ base: 4, md: 0 }}
      >
        aside
      </GridItem>

      <GridItem as="main" bgColor="green" colSpan={{ base: 12, md: undefined }}>
        main
      </GridItem>
    </Grid>
  ) : (
    <p>salam</p>
  );
};

export default Layout;

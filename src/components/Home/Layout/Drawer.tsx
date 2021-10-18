import * as React from "react";
import LinkInterface from "../../../interfaces/link.interface";
import Nav from "../../ui/Nav";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from "@chakra-ui/react";

type NavDrawerProps = {
  links: LinkInterface[];
  drawerProps: Omit<DrawerProps, "children">;
};

const NavDrawer = ({ links, drawerProps }: NavDrawerProps) => {
  return (
    <Drawer {...drawerProps}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton _focus={{}} />

        <DrawerBody display="grid" placeItems="center" p={0}>
          <Nav
            links={links}
            hasBothTitleAndIcon
            navProps={{ w: "full", textAlign: "center" }}
            listProps={{ listStyleType: "none", m: 0 }}
            buttonProps={{
              variant: "ghost",
              size: "lg",
              isFullWidth: true,
              my: 2,
              borderRadius: 0,
              _focus: {},
              _active: {},
            }}
            activeLinkStyle={{
              backgroundColor: "var(--chakra-colors-pink-500)",
            }}
          ></Nav>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;

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
} from "@chakra-ui/modal";

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
            navProps={{ w: "full", textAlign: "center" }}
            listProps={{ listStyleType: "none", m: 0 }}
            buttonProps={{
              variant: "ghost",
              isFullWidth: true,
              size: "lg",
              my: 2,
              borderRadius: 0,
              _focus: {},
              _active: {},
            }}
            activeLinkStyle={{
              backgroundColor: "var(--chakra-colors-pink-500)",
            }}
            hasBothTitleAndIcon
          ></Nav>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;

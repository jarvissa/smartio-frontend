import * as React from "react";
import LinkInterface from "../../../interfaces/link.interface";
import Nav from "../../ui/Nav";

type SidebarProps = {
  links: LinkInterface[];
};

const Sidebar = ({ links }: SidebarProps) => {
  return (
    <Nav
      links={links}
      hasOnlyIcon
      navProps={{
        minH: "100vh",
        display: { base: "none", lg: "flex" },
        alignItems: "center",
        gridRow: "1 / span 2",
        px: 2,
      }}
      listProps={{ listStyleType: "none", m: 0 }}
      buttonProps={{
        variant: "ghost",
        size: "lg",
        my: 2,
        px: 4,
        _focus: {},
        _active: {},
      }}
      activeLinkStyle={{ backgroundColor: "var(--chakra-colors-pink-500)" }}
    />
  );
};

export default Sidebar;

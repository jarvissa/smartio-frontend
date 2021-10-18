import * as React from "react";
import LinkInterface from "../../../interfaces/link.interface";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  CSSObject,
  Icon,
  ListItem,
  ListItemProps,
  ListProps,
  UnorderedList,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

type NavProps = {
  links: LinkInterface[];
  navProps?: BoxProps;
  listProps?: ListProps;
  listItemProps?: ListItemProps;
  buttonProps?: ButtonProps;
  activeLinkStyle?: CSSObject;
  hasOnlyTitle?: boolean;
  hasOnlyIcon?: boolean;
  hasBothTitleAndIcon?: boolean;
};

const Nav = ({
  links,
  navProps,
  listProps,
  listItemProps,
  buttonProps,
  activeLinkStyle,
  hasOnlyTitle = false,
  hasOnlyIcon = false,
  hasBothTitleAndIcon = false,
}: React.PropsWithChildren<NavProps>) => {
  return (
    <Box as="nav" {...navProps}>
      <UnorderedList {...listProps}>
        {links.map((link) => {
          return (
            <ListItem key={link.key} {...listItemProps}>
              <Button
                as={NavLink}
                to={link.to}
                exact
                leftIcon={
                  hasBothTitleAndIcon ? <Icon as={link.icon} /> : undefined
                }
                activeStyle={activeLinkStyle}
                {...buttonProps}
              >
                {hasOnlyTitle && link.title}
                {hasOnlyIcon && <Icon as={link.icon} />}
                {hasBothTitleAndIcon && link.title}
              </Button>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export default Nav;

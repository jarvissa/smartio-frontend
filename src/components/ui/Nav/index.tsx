import * as React from "react";
import LinkInterface from "../../../interfaces/link.interface";
import {
  Box,
  BoxProps,
  ListItem,
  ListItemProps,
  ListProps,
  UnorderedList,
} from "@chakra-ui/layout";
import { CSSObject } from "@chakra-ui/styled-system";
import { NavLink } from "react-router-dom";
import { Button, ButtonProps } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";

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
  hasOnlyTitle,
  hasOnlyIcon,
  hasBothTitleAndIcon,
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

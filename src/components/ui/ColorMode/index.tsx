import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { IconButton, IconButtonProps } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";

const ColorMode = (props: Omit<IconButtonProps, "aria-label">) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"}`}
      icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      onClick={toggleColorMode}
      {...props}
    />
  );
};

export default ColorMode;

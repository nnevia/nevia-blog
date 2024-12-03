import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "var(--color-grey-900)" : "var(--color-grey-100)",
        color: props.colorMode === "dark" ? "var(--color-grey-100)" : "var(--color-grey-900)",
      },
    }),
  },
});
export default theme;

import { useColorMode, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ToggleButton() {
  const { toggleColorMode, colorMode } = useColorMode();
  const Icon = colorMode === "light" ? FaMoon : FaSun;

  return (
    <IconButton
      onClick={toggleColorMode}
      variant='ghost'
      aria-label='Toggle dark mode'
      icon={<Icon />}
      title={`${colorMode === "light" ? "다크" : "라이트"} 모드로 전환`}
      _hover={{ bg: "transparent", transform: "scale(1.1)" }}
      transition='all 0.2s'
    />
  );
}

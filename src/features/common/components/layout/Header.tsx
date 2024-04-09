import { AuthContext } from "@/features/auth/contexts/AuthContext";
import ToggleThemeButton from "@/features/common/components/layout/ToggleThemeButton";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const Header = ({ onOpen, ...rest }: MobileProps) => {
  // @ts-ignore
  const { revoke, user } = useContext(AuthContext);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Split Seller
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"} gap={5}>
          <ToggleThemeButton />
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} color="white" name={user?.first_name} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                  minW="60px"
                >
                  <Text fontSize="sm">{user?.first_name}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <Box px={3} pb={3} pt={1}>
                <Text fontSize="sm" fontWeight="thin" color="gray.500">
                  {user?.email}
                </Text>
              </Box>
              <Divider borderStyle="dashed" />
              <Stack py={2}>
                <MenuItem as={NavLink} to="/" fontSize="sm">
                  Dashboard
                </MenuItem>
                <MenuItem as={NavLink} to="/account" fontSize="sm">
                  Meu Perfil
                </MenuItem>
              </Stack>
              <Divider borderStyle="dashed" />
              <Stack pt={2}>
                <MenuItem onClick={() => revoke()} fontSize="sm">
                  Sair
                </MenuItem>
              </Stack>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Header;

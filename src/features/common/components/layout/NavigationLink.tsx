import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Link as ChakraLink,
  HStack,
  Icon,
  LinkProps,
  Stack,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { NavLink, useLocation } from "react-router-dom";

export interface NavigationLinkProps extends LinkProps {
  label: string;
  icon?: IconType;
  href?: string;
  links?: NavigationLinkProps[];
}

const NavigationLink = ({
  icon,
  href,
  label,
  links = [],
  ...rest
}: NavigationLinkProps) => {
  const [color] = useToken("colors", ["primary.500"]);

  const activeColor = useColorModeValue("primary.600", "primary.500");

  const activeBg = useColorModeValue("primary.100", color + "20");

  const hoverBg = useColorModeValue("gray.200", color + "10");

  const { pathname } = useLocation();

  const Link = (
    <ChakraLink
      {...(href ? { as: NavLink, to: href } : {})}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      _activeLink={{
        color: activeColor,
        bg: activeBg,
      }}
      align="center"
      display="flex"
      alignItems="center"
      p="3"
      px="5"
      mx="3"
      role="group"
      borderRadius="lg"
      cursor="pointer"
      color="gray.500"
      fontSize="sm"
      fontWeight={500}
      _hover={{
        bg: hoverBg,
      }}
      transition="all 0.3s"
      {...rest}
    >
      {icon && <Icon mr="4" fontSize="16" as={icon} />}
      {label}
    </ChakraLink>
  );

  if (links.length > 0) {
    const someChildrenActive = links.some((link) =>
      pathname.startsWith(link.href || "")
    );

    return (
      <Accordion
        allowToggle
        display="flex"
        alignItems="center"
        mx="3"
        borderRadius="lg"
        cursor="pointer"
        color="gray.500"
        fontSize="sm"
        fontWeight={500}
        transition="all 0.3s"
        position="relative"
        colorScheme="primary"
      >
        <AccordionItem w="full" rounded="lg" border="none">
          <Card
            w="full"
            p={0}
            bg="transparent"
            gap={0}
            rounded="lg"
            color="gray.500"
          >
            <AccordionButton
              w="full"
              rounded="lg"
              p="3"
              px="5"
              pr="2"
              {...(someChildrenActive && {
                color: activeColor,
                bg: activeBg,
              })}
              _hover={{
                bg: hoverBg,
              }}
            >
              <HStack flex="1" gap={0}>
                <Icon mr="4" fontSize="16" as={icon} />
                <Box flex="1" textAlign="left" fontSize="sm" fontWeight={500}>
                  {label}
                </Box>
              </HStack>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0} m={1} rounded="lg" color="gray.500">
              <Stack gap={1} p={1}>
                {links.map((link) => (
                  <NavigationLink key={link.label} {...link} mx="0" />
                ))}
              </Stack>
            </AccordionPanel>
          </Card>
        </AccordionItem>
      </Accordion>
    );
  }

  return Link;
};

export default NavigationLink;

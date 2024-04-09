import NavigationLink, {
  NavigationLinkProps,
} from "@/features/common/components/layout/NavigationLink";
import { useAppConfig } from "@/features/common/contexts/AppConfigContext";
import BalanceCard from "@/features/financial/components/BalanceCard";
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaProjectDiagram } from "react-icons/fa";
import {
  MdManageAccounts,
  MdNewLabel,
  MdOutlineAccountBalance,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

interface SidebarProps extends BoxProps {
  onClose: () => void;
  display?: FlexProps["display"];
}

const LinkItems: Array<NavigationLinkProps> = [
  // TODO: extract to a config file
  { label: "Dashboard", icon: RxDashboard, href: "/" },
  { label: "Banking", icon: MdOutlineAccountBalance, href: "/banking" },
  {
    label: "Admin",
    icon: FaProjectDiagram,
    links: [
      { label: "Solicitações Gateway", href: "/gateway-requests" },
      { label: "Antecipações", href: "/anticipations" },
      { label: "Empresas", href: "/companies" },
      { label: "Transações", href: "/transactions" },
      { label: "Saques", href: "/withdrawals" },
      { label: "Clientes", href: "/customers" },
    ],
  },
  {
    label: "White Label",
    icon: MdNewLabel,
    links: [
      { label: "Adquirentes", href: "/acquirers" },
      { label: "BaaS", href: "/baas" },
    ],
  },
  {
    label: "Conta",
    icon: MdManageAccounts,
    links: [
      { label: "Meu perfil", href: "/account" },
      { label: "Sua Empresa", href: "/company" },
    ],
  },
];

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { logo } = useAppConfig();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">
        <HStack>
          <Image
            src={logo}
            alt="Logo"
            sx={{
              maxWidth: "150px",
            }}
          />
        </HStack>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box mx={4} mb={5}>
        <BalanceCard />
      </Box>
      <Flex
        direction="column"
        width={"100%"}
        gap="1"
        justifyContent="flex-start"
      >
        {LinkItems.map((link) => (
          <NavigationLink key={link.label} {...link} />
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;

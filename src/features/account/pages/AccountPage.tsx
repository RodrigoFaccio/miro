import ChangePasswordForm from "@/features/account/components/ChangePasswordForm";
import PageContainer from "@/features/common/components/layout/PageContainer";
import {
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { HiLockClosed } from "react-icons/hi";

const AccountPage = () => {
  return (
    <PageContainer
      title="Meu Perfil"
      crumbs={[
        {
          href: "/account",
          label: "Meu Perfil",
        },
      ]}
      maxW="container.lg"
    >
      <Tabs position="relative" colorScheme="primary">
        <TabList>
          <Tab>
            <HStack>
              <Icon as={HiLockClosed} />
              <Text>Alterar Senha</Text>
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel sx={{ px: 0 }}>
            <ChangePasswordForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContainer>
  );
};

export default AccountPage;

import AccountDocumentsForm from "@/features/account/components/AccountDocumentsForm";
import useAccountStatusConfig from "@/features/account/hooks/UseAccountStatusConfig";
import { AccountFormValues } from "@/features/account/schemas/AccountFormSchema";
import { saveAccount } from "@/features/account/services";
import { AccountStatus } from "@/features/account/types";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import SplitCard from "@/features/common/components/cards/SplitCard";
import PageContainer from "@/features/common/components/layout/PageContainer";
import BankAccountCard from "@/features/financial/components/BankAccountCard";
import BankExtractTable from "@/features/financial/components/BankExtractTable";
import PixKeysTable from "@/features/financial/components/PixKeysTable";
import CreatePixKeyModal from "@/features/financial/modals/CreatePixKeyModal";
import SendPixModal from "@/features/financial/modals/SendPixModal";
import OnBoardStepperForm from "@/features/onboard/components/OnBoardStepperForm";
import {
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BsSendFill } from "react-icons/bs";

const BankingPage = () => {
  const toast = useToast();

  const {
    isOpen: isOpenPixForm,
    onOpen: onOpenPixForm,
    onClose: onClosePixForm,
  } = useDisclosure();

  const {
    isOpen: isOpenSendPixForm,
    onOpen: onOpenSendPixForm,
    onClose: onCloseSendPixForm,
  } = useDisclosure();

  const { mutateAsync: saveAccountMutation, isPending: isPendingAccount } =
    useMutation({
      mutationFn: (values: AccountFormValues) => saveAccount(values),
      onSuccess: () => {
        toast({
          title: "Cadastro atualizado",
          description: "Seu cadastro foi atualizado com sucesso",
        });
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast({
          description:
            error.response?.data.message || "Erro ao atualizar cadastro",
          status: "error",
        });
      },
    });

  const { account } = useAuth();

  const { status } = useAccountStatusConfig();

  return (
    <>
      <PageContainer
        crumbs={[
          {
            href: "/banking",
            label: "Banking",
          },
        ]}
      >
        <Stack mb={6} _empty={{ display: "none" }}>
          <HStack flexWrap="wrap" gap={3} justify="space-between">
            <Heading fontWeight="bold">Dados Bancários</Heading>
            <Tooltip
              label={
                status.value !== AccountStatus.ACTIVE
                  ? `Cadastro: ${status.label}`
                  : ""
              }
              placement="left-end"
              hasArrow
              colorScheme="red"
            >
              <Button
                colorScheme="green"
                leftIcon={<BsSendFill />}
                onClick={onOpenSendPixForm}
                isDisabled={status.value !== AccountStatus.ACTIVE}
              >
                Enviar pix
              </Button>
            </Tooltip>
          </HStack>
        </Stack>

        <Tabs
          colorScheme="primary"
          variant="soft-rounded"
          defaultIndex={
            [AccountStatus.PENDING, AccountStatus.WAITING_DOCUMENTS].includes(
              status.value,
            )
              ? 3
              : 0
          }
        >
          <TabList
            as={Card}
            rounded="xl"
            variant="unstyled"
            gap={3}
            p={3}
            overflowX="auto"
          >
            <Tab rounded="xl">Conta</Tab>
            <Tab rounded="xl">Chaves Pix</Tab>
            <Tab rounded="xl">Extrato</Tab>
            <Tab rounded="xl">Identidade</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={1}>
              <BankAccountCard rounded="xl" border="none" />
            </TabPanel>
            <TabPanel px={0}>
              <Stack>
                <Card rounded="lg" variant="unstyled">
                  <PixKeysTable />
                </Card>
                <Flex justify="flex-end">
                  <Button
                    colorScheme="primary"
                    size="sm"
                    onClick={onOpenPixForm}
                  >
                    Adicionar chave
                  </Button>
                </Flex>
              </Stack>
            </TabPanel>
            <TabPanel px={0}>
              <BankExtractTable />
            </TabPanel>
            {status.value === AccountStatus.WAITING_DOCUMENTS && account && (
              <TabPanel px={0}>
                <SplitCard
                  title="Documentos"
                  subtitle="Envie seus documentos para liberar sua conta"
                >
                  <AccountDocumentsForm />
                </SplitCard>
              </TabPanel>
            )}
            {status.value === AccountStatus.PENDING && account && (
              <TabPanel px={0}>
                <SplitCard
                  title="Cadastro"
                  subtitle="Complete seu cadastro para liberar sua conta"
                >
                  <OnBoardStepperForm
                    onSubmit={async (values) => saveAccountMutation(values)}
                    submitting={isPendingAccount}
                    initialValues={account as unknown as AccountFormValues}
                  />
                </SplitCard>
              </TabPanel>
            )}
            {![AccountStatus.PENDING, AccountStatus.WAITING_DOCUMENTS].includes(
              status.value,
            ) &&
              account && (
                <TabPanel px={0}>
                  <SplitCard title="Identidade" subtitle={status.description}>
                    <VStack gap={5} p={5} maxW={400} mx="auto">
                      <Icon
                        as={status.icon}
                        color={status.color}
                        fontSize={80}
                      />
                      <Stack>
                        <Heading fontSize="2xl" textAlign="center">
                          {status.label}
                        </Heading>
                        <Text fontSize="sm" color="gray.500" textAlign="center">
                          {status.description}
                        </Text>
                      </Stack>
                    </VStack>
                  </SplitCard>
                </TabPanel>
              )}
          </TabPanels>
        </Tabs>
      </PageContainer>
      <CreatePixKeyModal open={isOpenPixForm} onClose={onClosePixForm} />
      <SendPixModal open={isOpenSendPixForm} onClose={onCloseSendPixForm} />
    </>
  );
};

export default BankingPage;

import AccountDocumentsForm from "@/features/account/components/AccountDocumentsForm";
import useAccountStatusConfig from "@/features/account/hooks/UseAccountStatusConfig";
import { AccountFormValues } from "@/features/account/schemas/AccountFormSchema";
import { saveAccount } from "@/features/account/services";
import { AccountStatus } from "@/features/account/types";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import SplitCard from "@/features/common/components/cards/SplitCard";
import PeriodInput, {
  Period,
} from "@/features/common/components/dates/PeriodInput";
import PageContainer from "@/features/common/components/layout/PageContainer";
import { formatCurrency } from "@/features/common/utils/formatters";
import DashboardPage from "@/features/companies/components/DashboardPage";
import TransactionsTable from "@/features/companies/components/TransactionsTable";
import DashboardStatWidget from "@/features/dashboard/components/DashboardStatWidget";
import CreatePixKeyModal from "@/features/financial/modals/CreatePixKeyModal";
import SendPixModal from "@/features/financial/modals/SendPixModal";
import { getBalanceCompany } from "@/features/financial/services";
import {
  Button,
  Card,
  Grid,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import moment from "moment";
import { useState } from "react";
import { FaClock, FaWallet } from "react-icons/fa";
import { FaDollarSign, FaSackDollar } from "react-icons/fa6";

import { useLoading } from "@/features/companies/hooks/LoadingCompany";
import { BsSendFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
const DetailsCompaniesPage = () => {
  const { loading } = useLoading();

  const { id } = useParams();

  const toast = useToast();
  const {
    data: {
      balance,
      pendingBalance,
      anticipationBalance = 0,
      reservedBalance = 0,
    },
  } = useQuery({
    queryKey: ["user_balance"],
    queryFn: () => getBalanceCompany(Number(id)),
    initialData: {
      balance: 0,
      anticipationBalance: 0,
      pendingBalance: 0,
      reservedBalance: 0,
    },
  });
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
  const [period, setPeriod] = useState(Period.LAST_7_DAYS);

  const [dates, setDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: moment().subtract(7, "days").toDate(),
    endDate: moment().toDate(),
  });
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
            href: "",
            label: "Dados empresa",
          },
        ]}
      >
        <Stack mb={6} _empty={{ display: "none" }}>
          <HStack flexWrap="wrap" gap={3} justify="space-between">
            <Heading fontWeight="bold">Dados Empresa</Heading>
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
                hidden={true}
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
         {
          loading&&(
            <TabList
            as={Card}
            rounded="xl"
            variant="unstyled"
            gap={3}
            p={3}
            overflowX="auto"
          >
            <Tab rounded="xl">Dashboard</Tab>
            <Tab rounded="xl">Saldo</Tab>
            <Tab rounded="xl">Transações</Tab>
          </TabList>
          )
         }
          <TabPanels>
            <TabPanel px={1}>
             
                  <DashboardPage />

                
            </TabPanel>

            <TabPanel px={0}>
              <SimpleGrid
                columns={
                  useBreakpointValue({
                    base: 1,
                    lg: 2,
                  }) as number
                }
                spacing={5}
              >
                <DashboardStatWidget
                  title="Saldo disponível"
                  stat={formatCurrency(balance)}
                  icon={FaDollarSign}
                  color="green.500"
                />
                <DashboardStatWidget
                  title="Disponível para antecipação"
                  stat={formatCurrency(anticipationBalance || 0)}
                  icon={FaSackDollar}
                  color="blue.500"
                />
                <DashboardStatWidget
                  title="Saldo pendente"
                  stat={formatCurrency(pendingBalance)}
                  icon={FaClock}
                  color="orange.300"
                />
                <DashboardStatWidget
                  title="Reserva financeira"
                  stat={formatCurrency(reservedBalance || 0)}
                  icon={FaWallet}
                  color="purple.500"
                />
              </SimpleGrid>
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

            <TabPanel px={0}>
              <Grid
                width="100%"
                maxW="100%"
                justifyContent="end"
                alignItems="end"
              >
                <PeriodInput
                  value={{
                    period,
                    startDate: dates.startDate,
                    endDate: dates.endDate,
                  }}
                  onChange={({ period, startDate, endDate }) => {
                    setPeriod(period);
                    setDates({
                      startDate,
                      endDate,
                    });
                  }}
                />
              </Grid>
              <TransactionsTable
                endDate={dates.endDate}
                startDate={dates.startDate}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageContainer>
      <CreatePixKeyModal open={isOpenPixForm} onClose={onClosePixForm} />
      <SendPixModal open={isOpenSendPixForm} onClose={onCloseSendPixForm} />
    </>
  );
};

export default DetailsCompaniesPage;

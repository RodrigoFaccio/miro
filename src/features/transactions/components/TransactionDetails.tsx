/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomerCard from "@/features/customers/components/CustomerCard";
import PaymentCard from "@/features/transactions/components/PaymentCard";
import TransactionActionsForm from "@/features/transactions/components/TransactionActionsForm";
import SellerCard from "@/features/transactions/components/SellerCard";
import TransactionCard from "@/features/transactions/components/TransactionCard";
import TransactionFeesCard from "@/features/transactions/components/TransactionFeesCard";
import TransactionItemsCard from "@/features/transactions/components/TransactionItemsCard";
import { updateTransaction } from "@/features/transactions/services";
import { ReadTransactionResponse } from "@/features/transactions/types";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  transaction: ReadTransactionResponse;
};

const TransactionDetails: React.FC<Props> = ({ transaction }) => {
  const navigate = useNavigate();

  const toast = useToast();

  return (
    <Tabs colorScheme="primary">
      <TabList gap={1}>
        <Tab>Transação</Tab>
        <Tab>Cliente</Tab>
        <Tab>Pagamento</Tab>
        <Tab>Ações</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px={0} as={Stack}>
          <SellerCard seller={transaction.user} bg="transparent" />

          <TransactionCard transaction={transaction} bg="transparent" />

          <TransactionFeesCard transaction={transaction} bg="transparent" />

          <TransactionItemsCard items={transaction.items} bg="transparent" />
        </TabPanel>
        <TabPanel px={0}>
          <CustomerCard
            customer={transaction.customer}
            actions={
              <Button
                colorScheme="primary"
                size="sm"
                rightIcon={<Icon as={SearchIcon} />}
                onClick={() =>
                  navigate(`/customers/${transaction.customer.id}`)
                }
              >
                Visualizar cliente
              </Button>
            }
            bg="transparent"
          />
        </TabPanel>
        <TabPanel px={0}>
          <PaymentCard transaction={transaction} bg="transparent" />
        </TabPanel>
        <TabPanel px={0}>
          <TransactionActionsForm
            onSubmit={(values) =>
              updateTransaction(transaction.id as string, values)
            }
            onError={(error) => {
              toast({
                title: "Erro ao realizar ação",
                description: error.response?.data.message,
                status: "error",
              });
            }}
            onSuccess={() => {
              toast({
                title: "Ação realizada com sucesso",
                status: "success",
              });
            }}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TransactionDetails;

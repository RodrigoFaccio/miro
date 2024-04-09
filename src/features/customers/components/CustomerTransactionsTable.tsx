import TableBuilder from "@/features/common/components/table/TableBuilder";
import { formatCurrency } from "@/features/common/utils/formatters";
import { ReadCustomerResponse } from "@/features/customers/types";
import TransactionStatusTag from "@/features/transactions/components/TransactionStatusTag";
import { PaymentMethodConfig } from "@/features/transactions/constants";
import TransactionDetailsModal from "@/features/transactions/modals/TransactionDetailsModal";
import {
  PaymentMethod,
  TransactionStatus,
} from "@/features/transactions/types";
import {
  Badge,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

type Props = {
  transactions: ReadCustomerResponse["transactions"];
};

type RowType = Props["transactions"][number];

const helper = createColumnHelper<RowType>();

const CustomerTransactionsTable: React.FC<Props> = ({ transactions }) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<RowType | null>(null);

  const {
    isOpen: isTransactionDetailsModalOpen,
    onOpen: openTransactionDetailsModal,
    onClose: closeTransactionDetailsModal,
  } = useDisclosure();

  return (
    <>
      <TableBuilder
        enableColumnFilters={false}
        columns={
          [
            helper.accessor("amount", {
              cell: ({ row }) => (
                <HStack gap={3}>
                  <Icon
                    as={
                      PaymentMethodConfig[
                        row.original.paymentMethod || PaymentMethod.PIX
                      ].icon
                    }
                    color={
                      PaymentMethodConfig[
                        row.original.paymentMethod || PaymentMethod.PIX
                      ].color
                    }
                    boxSize={6}
                  />
                  <Stack gap={0}>
                    <Text fontSize="sm" fontWeight="bold">
                      {formatCurrency(row.original.amount)}
                    </Text>
                    <Text fontSize="xs" fontWeight="light" color="gray.500">
                      {row.original.installments > 1 ? (
                        <>em {row.original.installments} parcelas</>
                      ) : (
                        <>à vista</>
                      )}
                    </Text>
                  </Stack>
                </HStack>
              ),
              header: "PAGAMENTO",
            }),
            helper.accessor("items", {
              cell: ({ getValue }) => (
                <Stack>
                  {[...getValue()].slice(0, 1).map((item) => (
                    <Stack gap={0.5} display="flex" alignItems="flex-start">
                      <HStack>
                        <Badge
                          textTransform="lowercase"
                          rounded="md"
                          fontSize="xs"
                        >
                          {item.quantity}x
                        </Badge>
                        <Text fontSize="xs" fontWeight="light" color="gray.500">
                          {formatCurrency(item.unitPrice)}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="sm" fontWeight="bold">
                          {item.title}
                        </Text>
                        {getValue().length > 1 && (
                          <Text
                            fontSize="2xs"
                            fontWeight="light"
                            color="gray.500"
                          >
                            + {getValue().length - 1} item
                          </Text>
                        )}
                      </HStack>
                    </Stack>
                  ))}
                  {getValue().length === 0 && (
                    <Text color="gray.500" fontSize="xs">
                      Nenhum item
                    </Text>
                  )}
                </Stack>
              ),
              header: "ITENS",
            }),
            helper.accessor("status", {
              cell: ({ getValue }) => (
                <TransactionStatusTag
                  status={getValue() || TransactionStatus.PENDING}
                />
              ),
              header: "STATUS",
            }),
          ] as ColumnDef<RowType>[]
        }
        data={transactions}
        onRowClick={(transaction) => {
          setSelectedTransaction(transaction);
          openTransactionDetailsModal();
        }}
        enableRowSelection={false}
        cardProps={{
          rounded: "none",
          border: "none",
        }}
      />
      <TransactionDetailsModal
        id={selectedTransaction?.id}
        open={isTransactionDetailsModalOpen}
        onClose={closeTransactionDetailsModal}
      />
    </>
  );
};

export default CustomerTransactionsTable;

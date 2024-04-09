import CheckboxTableFilter from "@/features/common/components/table-filters/CheckboxTableFilter";
import DateRangeTableFilter from "@/features/common/components/table-filters/DateRangeTableFilter";
import { PaginatedTable } from "@/features/common/components/table/PaginatedTable";
import { formatCurrency } from "@/features/common/utils/formatters";
import PaymentMethodTag from "@/features/transactions/components/PaymentMethodTag";
import TransactionStatusTag from "@/features/transactions/components/TransactionStatusTag";
import {
  PaymentMethodConfig,
  TransactionStatusConfig,
} from "@/features/transactions/constants";
import TransactionDetailsModal from "@/features/transactions/modals/TransactionDetailsModal";
import { getTransactions } from "@/features/transactions/services";
import { Transaction } from "@/features/transactions/types";
import { Box, Tag, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  FiltersColumn,
  PaginationState,
  SortingState,
  createColumnHelper,
} from "@tanstack/react-table";
import { format } from "date-fns";
import moment from "moment";
import { useState } from "react";
import { useParams } from "react-router-dom";

const helper = createColumnHelper<Transaction>();

const columns = [
  helper.accessor("items", {
    cell: ({ row }) => {
      const [item] = row.original.items || [];

      return (
        <Tooltip label={item?.title} hasArrow>
          <Box maxWidth={300} overflow="hidden">
            <Text size="lg" fontWeight="semibold" isTruncated>
              {item?.title || "N/A"}
            </Text>
          </Box>
        </Tooltip>
      );
    },
    header: "Produto",
  }),
  
  helper.accessor("acquirerType", {
    cell: (row) => (
      <Tag colorScheme="gray" textTransform="capitalize">
        {row.getValue() || "N/A"}
      </Tag>
    ),
    header: "Adquirente",
  }),
  helper.accessor("paymentMethod", {
    cell: (row) => <PaymentMethodTag paymentMethod={row.getValue()} />,
    header: "Método de Pagamento",
    meta: {
      filterComponent: (props: FiltersColumn<Transaction>) => (
        <CheckboxTableFilter
          options={Object.values(PaymentMethodConfig).map((paymentMethod) => ({
            label: paymentMethod.label,
            value: paymentMethod.id,
            render: () => (
              <PaymentMethodTag size="sm" paymentMethod={paymentMethod.id} />
            ),
          }))}
          {...props}
        />
      ),
    },
  }),
  helper.accessor("status", {
    cell: (row) => <TransactionStatusTag status={row.getValue()} />,
    header: "Status",
    meta: {
      filterComponent: (props: FiltersColumn<Transaction>) => (
        <CheckboxTableFilter
          options={Object.values(TransactionStatusConfig).map((status) => ({
            label: status.label,
            value: status.value,
            render: () => (
              <TransactionStatusTag size="sm" status={status.value} />
            ),
          }))}
          {...props}
        />
      ),
    },
  }),
  helper.accessor("amount", {
    cell: (row) => formatCurrency(row.getValue()),
    header: "Valor",
    enableColumnFilter: false,
  }),
  helper.accessor("createdAt", {
    cell: (row) => moment(row.getValue()).format("DD MMM YYYY HH:mm\\h"),
    header: "Data da transação",
    meta: {
      type: "date",
      filterComponent: (props: FiltersColumn<Transaction>) => (
        <DateRangeTableFilter {...props} />
      ),
    },
  }),
];
interface ITransaction {
  startDate?: Date | null;
  endDate?: Date | null;
}

const TransactionsTable: React.FC<ITransaction> = ({ startDate, endDate }) => {
  
  const [selectedTransaction, setSelectedTransaction] =
  useState<Transaction | null>(null);   
   const { id } = useParams();
   const newStart = startDate ? format(startDate, "yyyy-MM-dd") : null;
  const newEnd = endDate ? format(endDate, "yyyy-MM-dd") : null;

  const {
    isOpen: isDetailsModalOpen,
    onOpen: openDetailsModal,
    onClose: closeDetailsModal,
  } = useDisclosure();

  const [search, setSearch] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: records, isFetching } = useQuery({
    queryKey: ["transactions", { pagination, search, filters, sorting, id,newStart,newEnd}],
    queryFn: () => getTransactions({ ...pagination, search, filters, sorting,user:Number(id),start_date:newStart,end_date:newEnd }),
    initialData: {
      results: [],
      count: 0,
    },
  });

  return (
    <>
      <PaginatedTable
        onPaginationChange={setPagination}
        records={records}
        columns={columns as ColumnDef<Transaction>[]}
        enableGlobalFilter
        enableColumnFilters
        enableRowSelection={false}
        fetching={isFetching}
        enableSorting
        onGlobalFilterChange={setSearch}
        onColumnFiltersChange={setFilters}
        onSortingChange={setSorting}
        onRowClick={(transaction) => {
          setSelectedTransaction(transaction);
          openDetailsModal();
        }}
        initialState={{
          pagination,
          sorting,
          columnFilters: filters,
        }}
        state={{
          pagination,
          sorting,
          columnFilters: filters,
        }}
      />
      <TransactionDetailsModal
        id={selectedTransaction?.id}
        open={isDetailsModalOpen}
        onClose={closeDetailsModal}
      />
    </>
  );
};

export default TransactionsTable;

import CheckboxTableFilter from "@/features/common/components/table-filters/CheckboxTableFilter";
import DateRangeTableFilter from "@/features/common/components/table-filters/DateRangeTableFilter";
import { PaginatedTable } from "@/features/common/components/table/PaginatedTable";
import { formatCurrency } from "@/features/common/utils/formatters";
import BankExtractStatusTag from "@/features/financial/components/BankExtractStatusTag";
import { BankExtractStatusConfig } from "@/features/financial/constants";
import { getBankExtract } from "@/features/financial/services";
import { BankExtract, BankExtractDirection } from "@/features/financial/types";
import { Transaction } from "@/features/transactions/types";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  FiltersColumn,
  PaginationState,
  SortingState,
  createColumnHelper,
} from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";

const helper = createColumnHelper<BankExtract>();

const columns = [
  helper.accessor("description", {
    header: "Descrição",
  }),
  helper.accessor("amount", {
    cell: ({ getValue, row }) => (
      <HStack>
        <Icon
          as={
            row.original.direction === BankExtractDirection.IN
              ? ArrowUpIcon
              : ArrowDownIcon
          }
          color={
            row.original.direction === BankExtractDirection.IN
              ? "green.500"
              : "red.500"
          }
        />
        <Text>{formatCurrency(Math.abs(getValue()))}</Text>
      </HStack>
    ),
    header: "Valor",
    enableColumnFilter: false,
  }),
  helper.accessor("status", {
    cell: (row) => <BankExtractStatusTag status={row.getValue()} />,
    header: "Status",
    meta: {
      filterComponent: (props: FiltersColumn<Transaction>) => (
        <CheckboxTableFilter
          options={Object.values(BankExtractStatusConfig).map((status) => ({
            label: status.label,
            value: status.value,
            render: () => (
              <BankExtractStatusTag size="sm" status={status.value} />
            ),
          }))}
          {...props}
        />
      ),
    },
  }),
  helper.accessor("created_at", {
    cell: (row) => moment(row.getValue()).format("DD MMM YYYY HH:mm\\h"),
    header: "Data",
    meta: {
      type: "date",
      filterComponent: (props: FiltersColumn<Transaction>) => (
        <DateRangeTableFilter {...props} />
      ),
    },
  }),
];

const BankExtractTable: React.FC = () => {
  const [search, setSearch] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: records, isFetching } = useQuery({
    queryKey: ["bank.extract", { pagination, search, filters, sorting }],
    queryFn: () => getBankExtract({ ...pagination, search, filters, sorting }),
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
        columns={columns as ColumnDef<BankExtract>[]}
        enableGlobalFilter
        enableColumnFilters
        enableRowSelection={false}
        enableSorting
        manualFiltering
        manualSorting
        onSortingChange={setSorting}
        fetching={isFetching}
        onGlobalFilterChange={setSearch}
        onColumnFiltersChange={setFilters}
        initialState={{
          sorting,
          pagination,
          columnFilters: filters,
        }}
        state={{
          sorting,
          pagination,
          columnFilters: filters,
        }}
      />
    </>
  );
};

export default BankExtractTable;

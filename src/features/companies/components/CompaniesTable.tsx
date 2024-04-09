import CheckboxTableFilter from "@/features/common/components/table-filters/CheckboxTableFilter";
import DateRangeTableFilter from "@/features/common/components/table-filters/DateRangeTableFilter";
import { PaginatedTable } from "@/features/common/components/table/PaginatedTable";
import ListItem from "@/features/common/components/widgets/ListItem";
import { formatCurrency } from "@/features/common/utils/formatters";
import CompanySettings from "@/features/companies/components/CompanySettings";
import CompanyStatusTag from "@/features/companies/components/CompanyStatusTag";
import { CompanyStatusConfig } from "@/features/companies/constants";
import { getCompanies } from "@/features/companies/services";
import { Company } from "@/features/companies/types";
import { Transaction } from "@/features/transactions/types";
import {
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
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
import { FaBuildingShield } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const helper = createColumnHelper<Company>();

const columns = [
  helper.accessor("id", {
    cell: ({ row }) => (
          
      <Popover  placement="right" variant="responsive">
        <PopoverTrigger>
          <IconButton
            aria-label="Settings"
            size="md"
            variant="ghost"
            rounded="full"
            colorScheme="primary"
            
          >
            <Icon  as={IoSettings} fontSize="xl" />
          </IconButton>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w={500} maxW="60vw">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <ListItem
                icon={FaBuildingShield}
                primary="Configurações"
                secondary={row.original.first_name || "-"}
              />
            </PopoverHeader>
            <PopoverBody>
              <CompanySettings company={row.original} />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    ),
    meta: {
      width: 50,
    },
    header: "",
    enableColumnFilter: false,
    enableSorting: false,
  }),
  helper.accessor("first_name", {
    cell: ({ row }) => {
      return <ListItem primary={row.original.first_name} />;
    },
    header: "Nome",
  }),
  helper.accessor("email", {
    cell: ({ row }) => {
      return <ListItem primary={row.original.email} />;
    },
    header: "Email",
  }),
  helper.accessor("totalSales", {
    cell: ({ row }) => formatCurrency(row.original.totalSales || 0),
    header: "Total em vendas",
    enableColumnFilter: false,
  }),
  helper.accessor("liquidSales", {
    cell: ({ row }) => formatCurrency(row.original.liquidSales || 0),
    header: "Total líquido",
    enableColumnFilter: false,
  }),
  helper.accessor("withdrawAmount", {
    cell: ({ row }) => formatCurrency(row.original.withdrawAmount || 0),
    header: "Total Sacado",
    enableColumnFilter: false,
  }),
  helper.accessor("status", {
    cell: ({ getValue }) => <CompanyStatusTag status={getValue()} />,
    header: "Status",
    meta: {
      filterComponent: (props: FiltersColumn<Transaction>) => (
        <CheckboxTableFilter
          options={Object.values(CompanyStatusConfig).map(
            ({ value, label }) => ({
              label,
              value,
              render: () => <CompanyStatusTag size="sm" status={value} />,
            }),
          )}
          {...props}
        />
      ),
    },
  }),
  helper.accessor("date_joined", {
    cell: ({ getValue }) => moment(getValue()).format("DD MMM YYYY HH:mm"),
    header: "Criado em",
    meta: {
      type: "date",
      filterComponent: (props: FiltersColumn<Transaction>) => (
        <DateRangeTableFilter {...props} />
      ),
    },
  }),
] as ColumnDef<Company>[];

const CompaniesTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: records, isFetching } = useQuery({
    queryKey: ["companies", pagination, search, sorting, filters],
    queryFn: () => getCompanies({ ...pagination, search, sorting, filters }),
    initialData: {
      results: [],
      count: 0,
    },
  });


  return (
    <>
      <PaginatedTable
        records={records}
        columns={columns}
        enableRowSelection={false}
        enableGlobalFilter
        onPaginationChange={setPagination}
        fetching={isFetching}
        enableColumnFilters
        onColumnFiltersChange={setFilters}
        onSortingChange={setSorting}
        enableSorting
        onGlobalFilterChange={setSearch}
        state={{
          pagination,
          sorting,
          columnFilters: filters,
        }}
      />
    </>
  );
};

export default CompaniesTable;

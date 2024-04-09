import { PaginatedTable } from "@/features/common/components/table/PaginatedTable";
import ListItem from "@/features/common/components/widgets/ListItem";
import {
  formatCNPJ,
  formatCPF,
  formatPhone,
} from "@/features/common/utils/formatters";
import { getCustomers } from "@/features/customers/services";
import { Customer, DocumentType } from "@/features/customers/types";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  PaginationState,
  createColumnHelper,
} from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const helper = createColumnHelper<Customer>();

const columns = [
  helper.accessor("name", {
    cell: ({ row, getValue }) => (
      <ListItem
        avatar={getValue()}
        primary={getValue()}
        secondary={row.original.email}
      />
    ),
    header: "Nome",
  }),
  helper.accessor("docNumber", {
    cell: ({ row, getValue }) => (
      <ListItem
        primary={row.original.docType.toUpperCase()}
        secondary={
          row.original.docType === DocumentType.CPF
            ? formatCPF(getValue())
            : formatCNPJ(getValue())
        }
      />
    ),
    header: "Documento",
  }),
  helper.accessor("phone", {
    cell: ({ getValue }) => formatPhone(getValue() || ("" as string)),
    header: "Telefone",
  }),
  helper.accessor("createdAt", {
    cell: ({ getValue }) => moment(getValue()).format("DD MMM YYYY HH:mm"),
    header: "Criado em",
  }),
];

const CustomersTable: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: records, isFetching } = useQuery({
    queryKey: ["customers", pagination, search],
    queryFn: () =>
      getCustomers({ ...pagination, search, sorting: [], filters: [] }),
    initialData: {
      results: [],
      count: 0,
    },
  });

  return (
    <>
      <PaginatedTable
        records={records}
        columns={columns as ColumnDef<Customer>[]}
        enableRowSelection={false}
        enableGlobalFilter
        onPaginationChange={setPagination}
        fetching={isFetching}
        onGlobalFilterChange={setSearch}
        initialState={{
          pagination,
        }}
        state={{
          pagination,
        }}
        onRowClick={(customer) => {
          navigate(`/customers/${customer.id}`);
        }}
      />
    </>
  );
};

export default CustomersTable;

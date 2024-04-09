import DateRangeTableFilter from "@/features/common/components/table-filters/DateRangeTableFilter";
import { PaginatedTable } from "@/features/common/components/table/PaginatedTable";
import ListItem from "@/features/common/components/widgets/ListItem";
import {
  formatCNPJ,
  formatCPF,
  formatCurrency,
} from "@/features/common/utils/formatters";
import CompanyStatusTag from "@/features/companies/components/CompanyStatusTag";
import { Company, CompanyStatus } from "@/features/companies/types";
import GatewayRequestDetails from "@/features/gateway-requests/components/GatewayRequestDetails";
import { getGatewayRequests } from "@/features/gateway-requests/services";
import { GatewayRequest } from "@/features/gateway-requests/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
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

const helper = createColumnHelper<GatewayRequest>();

const columns = [
  helper.accessor("first_name", {
    cell: ({ row, getValue }) => {
      const document =
        formatCNPJ(row.original.cnpj || "") ||
        formatCPF(row.original.cpf || "") ||
        "";
      return <ListItem primary={getValue() || "-"} secondary={document} />;
    },
    header: "Nome",
  }),
  helper.accessor("status", {
    cell: ({ getValue }) => <CompanyStatusTag status={getValue()} />,
    header: "Status",
    enableColumnFilter: false,
  }),
  helper.accessor("averageRevenue", {
    cell: ({ getValue }) => formatCurrency(getValue()),
    header: "Faturamento médio",
    enableColumnFilter: false,
  }),
  helper.accessor("date_joined", {
    cell: ({ getValue }) => moment(getValue()).format("DD MMM YYYY HH:mm"),
    header: "Criado em",
    meta: {
      type: "date",
      filterComponent: (props: FiltersColumn<GatewayRequest>) => (
        <DateRangeTableFilter {...props} />
      ),
    },
  }),
];

type Props = {
  status: CompanyStatus.GATEWAY_PENDING | CompanyStatus.REJECTED;
};

const GatewayRequestsTable: React.FC<Props> = ({ status }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedRequest, setSelectedRequest] = useState<GatewayRequest | null>(
    null,
  );

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: records, isFetching } = useQuery({
    queryKey: [
      "gateway-requests",
      pagination,
      search,
      sorting,
      filters,
      status,
    ],
    queryFn: () =>
      getGatewayRequests({
        ...pagination,
        search,
        sorting,
        filters: [...filters, { id: "status", value: status }],
      }),
    initialData: {
      results: [],
      count: 0,
    },
  });

  return (
    <>
      <PaginatedTable
        records={records}
        columns={columns as ColumnDef<Company>[]}
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
        onRowClick={(request) => {
          setSelectedRequest(request);
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Solicitação Gateway</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            {selectedRequest && (
              <GatewayRequestDetails
                request={selectedRequest}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GatewayRequestsTable;

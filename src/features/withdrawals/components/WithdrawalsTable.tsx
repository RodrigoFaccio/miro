import CheckboxTableFilter from "@/features/common/components/table-filters/CheckboxTableFilter";
import DateRangeTableFilter from "@/features/common/components/table-filters/DateRangeTableFilter";
import { PaginatedTable } from "@/features/common/components/table/PaginatedTable";
import WithConfirmation from "@/features/common/components/wrappers/WithConfirmation";
import { formatCurrency } from "@/features/common/utils/formatters";
import ApproveWithdrawalForm from "@/features/withdrawals/components/ApproveWithdrawalForm";
import WithdrawalsStatusTag from "@/features/withdrawals/components/WithdrawalStatusTag";
import { WithdrawalsStatusConfig } from "@/features/withdrawals/constants";
import WithdrawalDetailsModal from "@/features/withdrawals/modals/WithdrawalDetailsModal";
import {
  approveWithdrawal,
  getWithdrawals,
  rejectWithdrawal,
} from "@/features/withdrawals/services";
import {
  Withdrawal,
  WithdrawalStatus,
  WithdrawalType,
} from "@/features/withdrawals/types";
import {
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  FiltersColumn,
  PaginationState,
  SortingState,
  createColumnHelper,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import moment from "moment";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { MdClose } from "react-icons/md";

const helper = createColumnHelper<Withdrawal>();

const columns: ColumnDef<Withdrawal>[] = [
  helper.accessor("id", {
    cell: (row) => row.getValue(),
    header: "ID",
  }),
  helper.accessor("createdAt", {
    cell: (row) => moment(row.getValue()).format("DD/MM/YYYY HH:mm"),
    header: "data",
    meta: {
      type: "date",
      filterComponent: (props: FiltersColumn<Withdrawal>) => (
        <DateRangeTableFilter {...props} />
      ),
    },
  }),
  helper.accessor("amountReceived", {
    cell: (row) => formatCurrency(row.getValue()),
    header: "Valor Recebido",
    enableColumnFilter: false,
  }),
  helper.accessor("fee", {
    cell: (row) => formatCurrency(row.getValue()),
    header: "Taxa",
    enableColumnFilter: false,
  }),
  helper.accessor("status", {
    cell: (row) => (
      <WithdrawalsStatusTag status={row.getValue() as Withdrawal["status"]} />
    ),
    header: "status",
    meta: {
      filterComponent: (props: FiltersColumn<Withdrawal>) => (
        <CheckboxTableFilter
          options={Object.values(WithdrawalsStatusConfig).map(
            ({ value, label }) => ({
              label,
              value,
              render: () => <WithdrawalsStatusTag size="sm" status={value} />,
            })
          )}
          {...props}
        />
      ),
    },
  }),
  
] as ColumnDef<Withdrawal>[];

type Props = {
  type: WithdrawalType;
};

const WithdrawalsTable: React.FC<Props> = ({ type }) => {
  const toast = useToast();

  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);

  const {
    isOpen: isDetailsOpen,
    onOpen: openDetails,
    onClose: closeDetails,
  } = useDisclosure();

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: records,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["withdrawals", pagination, search, filters, sorting],
    queryFn: () =>
      getWithdrawals({
        ...pagination,
        search,
        filters: [...filters, { id: "type", value: type }],
        sorting,
      }),
    initialData: {
      results: [],
      count: 0,
    },
  });

  const {
    mutateAsync: reject,
    isPending: rejecting,
    variables: rejectingID,
  } = useMutation({
    mutationFn: rejectWithdrawal,
    onSuccess: () => {
      refetch();
      toast({
        description: "Solicitação de saque rejeitada com sucesso",
        status: "success",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        description:
          error.response?.data.message ||
          "Erro ao rejeitar solicitação de saque",
        status: "error",
      });
    },
  });

  return (
    <>
      <PaginatedTable
        records={records}
        columns={[
          ...columns,
          helper.accessor("id", {
            cell: ({ row }) => (
              <HStack justify="flex-end">
                {row.original.status === WithdrawalStatus.PENDING && (
                  <>
                    <Tooltip label="Aprovar" aria-label="Aprovar" hasArrow>
                      <Popover placement="bottom-start">
                        {({ onClose, isOpen }) => (
                          <>
                            <PopoverTrigger>
                              <IconButton
                                size="xs"
                                aria-label="Aprovar"
                                icon={<IoMdCheckmark />}
                                rounded="full"
                                colorScheme="green"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              />
                            </PopoverTrigger>
                            <Portal>
                              <PopoverContent
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <PopoverArrow />
                                <PopoverHeader>
                                  <Text fontWeight="bold">Aprovar</Text>
                                </PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                  {isOpen && (
                                    <ApproveWithdrawalForm
                                      onCancel={onClose}
                                      onSubmit={(values) =>
                                        approveWithdrawal(
                                          row.original.id,
                                          values
                                        )
                                      }
                                      withdrawal={row.original}
                                      onError={(error) => {
                                        toast({
                                          description:
                                            error.response?.data.message ||
                                            "Erro ao aprovar solicitação de saque",
                                          status: "error",
                                        });
                                      }}
                                      onSuccess={() => {
                                        refetch();
                                        toast({
                                          description:
                                            "Solicitação de saque aprovada com sucesso",
                                          status: "success",
                                        });
                                      }}
                                    />
                                  )}
                                </PopoverBody>
                              </PopoverContent>
                            </Portal>
                          </>
                        )}
                      </Popover>
                    </Tooltip>
                    <Tooltip label="Rejeitar" aria-label="Rejeitar" hasArrow>
                      <WithConfirmation
                        onConfirm={() => reject(row.original.id)}
                      >
                        <IconButton
                          size="xs"
                          aria-label="Rejeitar"
                          icon={<MdClose />}
                          rounded="full"
                          colorScheme="red"
                          isLoading={
                            rejecting && rejectingID === row.original.id
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </WithConfirmation>
                    </Tooltip>
                  </>
                )}
                <Tooltip label="Detalhes" aria-label="Detalhes" hasArrow>
                  <IconButton
                    size="xs"
                    aria-label="Detalhes"
                    icon={<FaInfo />}
                    rounded="full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWithdrawal(row.original);
                      openDetails();
                    }}
                  />
                </Tooltip>
              </HStack>
            ),
            header: "",
            enableColumnFilter: false,
          }),
        ]}
        enableGlobalFilter
        enableColumnFilters
        fetching={isFetching}
        enableRowSelection={false}
        onGlobalFilterChange={setSearch}
        onColumnFiltersChange={setFilters}
        enableSorting
        onSortingChange={setSorting}
        onPaginationChange={setPagination}
        state={{
          pagination,
          sorting,
          columnFilters: filters,
        }}
        onRowClick={(withdrawal) => {
          setSelectedWithdrawal(withdrawal);
          openDetails();
        }}
      />
      <WithdrawalDetailsModal
        open={isDetailsOpen}
        onClose={() => closeDetails()}
        withdrawal={selectedWithdrawal}
      />
    </>
  );
};

export default WithdrawalsTable;

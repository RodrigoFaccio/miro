import {
  PeriodConfig,
  PeriodData,
} from "@/features/common/components/dates/PeriodInput";
import DebouncedSearch from "@/features/common/components/table/DebouncedSearch";
import TablePagination from "@/features/common/components/table/TablePagination";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Checkbox,
  HStack,
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
  Progress,
  Stack,
  Table,
  TableContainer,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Column,
  ColumnDef,
  FiltersColumn,
  TableOptions,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaFilter } from "react-icons/fa";
import { TbFilter, TbFilterFilled } from "react-icons/tb";

export type PageBuilderProps<T extends object> = Partial<TableOptions<T>> & {
  data: T[];
  columns: ColumnDef<T>[];
  fetching?: boolean;
  pageable?: boolean;
  onRowClick?: (data: T) => void;
  cardProps?: React.ComponentProps<typeof VStack>;
};

const TableBuilder = <T extends object>({
  data,
  columns,
  fetching,
  pageable,
  onRowClick,
  cardProps = {},
  ...props
}: PageBuilderProps<T>) => {
  const table = useReactTable({
    ...props,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rowHoverBg = useColorModeValue("gray.50", "gray.900");

  const filteredColumns = table
    .getState()
    .columnFilters.map((filter) => table.getColumn(filter.id));

  const formatFilterValue = (column: Column<T>): string => {
    const { type } = (column.columnDef.meta || {}) as unknown as {
      type: "date" | unknown;
    };

    const value = column.getFilterValue();

    if (type === "date") {
      const { period } = value as PeriodData;

      if (period in PeriodConfig) {
        return PeriodConfig[period].label;
      }

      return "-";
    }

    return value?.toString() || "-";
  };

  return (
    <VStack
      as={Card}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"xl"}
      overflow="hidden"
      {...cardProps}
    >
      <Stack w="full" gap={0}>
        <Stack gap={4} p={5} _empty={{ p: 0 }}>
          {table.options.enableGlobalFilter && (
            <DebouncedSearch
              id="search"
              placeholder="Pesquisar..."
              variant="filled"
              onChange={(search) => {
                table.setGlobalFilter(search);
              }}
            />
          )}
          {filteredColumns.length > 0 && table.options.enableColumnFilters && (
            <HStack flexWrap="wrap" gap={2}>
              {filteredColumns.map((column) => (
                <Tag
                  key={column?.id}
                  size="sm"
                  variant="subtle"
                  colorScheme="primary"
                >
                  <Icon as={FaFilter} mr={2} fontSize={10} />
                  <TagLabel
                    maxW={{
                      base: "full",
                      md: 200,
                    }}
                    overflow="hidden"
                  >
                    <HStack gap={1}>
                      <Text noOfLines={1} fontWeight={700}>
                        {column?.columnDef.header as string}:{" "}
                      </Text>
                      <Text noOfLines={1}>
                        {formatFilterValue(column as Column<T>)}
                      </Text>
                    </HStack>
                  </TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      table.setColumnFilters((prev) =>
                        prev.filter(
                          (prevColumn) => prevColumn.id !== column?.id
                        )
                      );
                    }}
                  />
                </Tag>
              ))}
            </HStack>
          )}
        </Stack>
        <TableContainer width="full" rounded="xl">
          <Table size="md" variant="simple">
            <Thead bg={useColorModeValue("gray.50", "gray.700")}>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {table.options.enableRowSelection && (
                    <Th w={5}>
                      <Checkbox
                        isChecked={table.getIsAllRowsSelected()}
                        onChange={() => table.toggleAllRowsSelected()}
                        isIndeterminate={table.getIsSomeRowsSelected()}
                      />
                    </Th>
                  )}

                  {headerGroup.headers.map((header) => {
                    const meta = header.column.columnDef.meta as {
                      isNumeric: boolean;
                      width: number;
                      filterComponent: (
                        filters: FiltersColumn<T>
                      ) => React.ReactNode;
                    };

                    return (
                      <Th
                        key={header.id}
                        isNumeric={meta?.isNumeric}
                        width={meta?.width}
                        textTransform="capitalize"
                      >
                        <Stack>
                          <HStack gap={1}>
                            <Box
                              {...(header.column.getCanSort() && {
                                cursor: "pointer",
                              })}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </Box>
                            {header.column.getCanSort() && (
                              <>
                                {header.column.getIsSorted() === "desc" && (
                                  <TriangleDownIcon
                                    fontSize={10}
                                    aria-label="sorted descending"
                                  />
                                )}
                                {header.column.getIsSorted() === "asc" && (
                                  <TriangleUpIcon
                                    fontSize={10}
                                    aria-label="sorted ascending"
                                  />
                                )}
                              </>
                            )}
                            {header.column.getCanFilter() && (
                              <Popover
                                placement="right-start"
                                closeOnBlur
                                closeOnEsc
                              >
                                <PopoverTrigger>
                                  <IconButton
                                    icon={
                                      header.column.getIsFiltered() ? (
                                        <TbFilterFilled />
                                      ) : (
                                        <TbFilter />
                                      )
                                    }
                                    size="xs"
                                    aria-label="Filtrar"
                                    variant="ghost"
                                    rounded="full"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  />
                                </PopoverTrigger>
                                <Portal>
                                  <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Filtrar</PopoverHeader>
                                    <PopoverBody>
                                      {meta?.filterComponent?.(
                                        header.column
                                      ) || (
                                        <DebouncedSearch
                                          defaultValue={header.column
                                            .getFilterValue()
                                            ?.toString()}
                                          onChange={
                                            header.column.setFilterValue
                                          }
                                          size="sm"
                                          rounded="md"
                                          autoFocus
                                        />
                                      )}
                                    </PopoverBody>
                                  </PopoverContent>
                                </Portal>
                              </Popover>
                            )}
                          </HStack>
                        </Stack>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
              <Tr>
                {fetching && (
                  <Progress
                    size="xs"
                    w="full"
                    roundedTop="xl"
                    isIndeterminate
                    colorScheme="primary"
                    position="absolute"
                    top={0}
                  />
                )}
              </Tr>
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  {...(onRowClick && {
                    _hover: {
                      cursor: "pointer",
                      bg: rowHoverBg,
                    },
                  })}
                  transition="all 0.2s"
                >
                  {table.options.enableRowSelection && (
                    <Td>
                      <Checkbox
                        isChecked={row.getIsSelected()}
                        onChange={() => row.toggleSelected()}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          zIndex: 1,
                        }}
                      />
                    </Td>
                  )}
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as {
                      isNumeric: boolean;
                    };
                    return (
                      <Td
                        key={cell.id}
                        isNumeric={meta?.isNumeric}
                        {...(onRowClick && {
                          onClick: () => {
                            onRowClick(row.original);
                          },
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
          {table.getRowModel().rows.length === 0 && (
            <Text fontSize="sm" fontWeight="light" color="gray.500" p={5}>
              Nenhum registro encontrado
            </Text>
          )}
        </TableContainer>
        {pageable && (
          <Box width="full" p={5}>
            <TablePagination table={table} />
          </Box>
        )}
      </Stack>
    </VStack>
  );
};

export default TableBuilder;

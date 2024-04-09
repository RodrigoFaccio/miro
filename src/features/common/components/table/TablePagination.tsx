import {
  Flex,
  HStack,
  IconButton,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

type TablePaginationProps<T extends object> = {
  table: Table<T>;
};

const TablePagination = <T extends object>({
  table,
}: TablePaginationProps<T>) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" width="full">
      <HStack gap={2}>
        <VStack>
          <Select
            colorScheme="primary"
            size="sm"
            rounded="md"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {["5", "10", "15", "25"].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </VStack>
        <Text fontSize="xs">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.options.pageCount || 1}
        </Text>
      </HStack>
      <HStack>
        <IconButton
          aria-label="First page"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          isDisabled={!table.getCanPreviousPage()}
          icon={<FiChevronsLeft />}
          bg="primary.500"
          color="white"
        />
        <IconButton
          aria-label="Previous page"
          size="sm"
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
          icon={<FiChevronLeft />}
          bg="primary.500"
          color="white"
        />
        <IconButton
          aria-label="Next page"
          size="sm"
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
          icon={<FiChevronRight />}
          bg="primary.500"
          color="white"
        />
        <IconButton
          aria-label="Last page"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          isDisabled={!table.getCanNextPage()}
          icon={<FiChevronsRight />}
          bg="primary.500"
          color="white"
        />
      </HStack>
    </Flex>
  );
};

export default TablePagination;

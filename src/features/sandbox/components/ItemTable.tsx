import CheckboxTableFilter from "@/features/common/components/table-filters/CheckboxTableFilter";
import DateRangeTableFilter from "@/features/common/components/table-filters/DateRangeTableFilter";
import RadioTableFilter from "@/features/common/components/table-filters/RadioTableFilter";
import { PaginatedTable } from "@/features/common/components/table/PaginatedTable";
import ItemInfoModal from "@/features/sandbox/components/ItemInfoModal";
import { getItems } from "@/features/sandbox/services";
import { Item, ItemStatus, ItemTag } from "@/features/sandbox/types";
import { useDisclosure } from "@chakra-ui/react";
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

const helper = createColumnHelper<Item>();

const columns = [
  helper.accessor("id", {
    header: "ID",
    enableColumnFilter: false,
  }),
  helper.accessor("name", {
    header: "Name",
    enableColumnFilter: true,
  }),
  helper.accessor("description", {
    header: "Description",
    enableColumnFilter: true,
  }),
  helper.accessor("status", {
    header: "Status",
    meta: {
      filterComponent: (props: FiltersColumn<Item>) => (
        <RadioTableFilter
          options={[
            { label: "Pending", value: ItemStatus.PENDING },
            { label: "Done", value: ItemStatus.DONE },
          ]}
          {...props}
        />
      ),
    },
    enableColumnFilter: true,
  }),
  helper.accessor("tags", {
    header: "Tags",
    meta: {
      filterComponent: (props: FiltersColumn<Item>) => (
        <CheckboxTableFilter
          options={[
            { label: "Urgent", value: ItemTag.URGENT },
            { label: "Important", value: ItemTag.IMPORTANT },
            { label: "Optional", value: ItemTag.OPTIONAL },
          ]}
          {...props}
        />
      ),
    },
    enableColumnFilter: true,
  }),
  helper.accessor("createdAt", {
    header: "Created At",
    cell: ({ getValue }) => moment(getValue()).format("DD/MM/YYYY HH:mm"),
    meta: {
      type: "date",
      filterComponent: (props: FiltersColumn<Item>) => (
        <DateRangeTableFilter {...props} />
      ),
    },
    enableColumnFilter: true,
  }),
];

const ItemTable = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: records, isFetching } = useQuery({
    queryKey: ["sandbox", search, columnFilters, pagination, sorting],
    queryFn: () =>
      getItems({
        search,
        filters: columnFilters,
        sorting,
        ...pagination,
      }),
    initialData: {
      results: [],
      count: 0,
    },
  });
  return (
    <>
      <PaginatedTable
        fetching={isFetching}
        enableRowSelection={false}
        columns={columns as ColumnDef<Item>[]}
        records={records}
        initialState={{
          sorting: [],
          pagination,
          columnFilters,
        }}
        state={{
          sorting,
          pagination,
          columnFilters,
        }}
        onColumnFiltersChange={setColumnFilters}
        enableGlobalFilter
        enableColumnFilters
        enableSorting
        onGlobalFilterChange={setSearch}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        onRowClick={(row) => {
          setSelectedItem(row);
          onOpen();
        }}
      />
      <ItemInfoModal open={isOpen} onClose={onClose} item={selectedItem} />
    </>
  );
};

export default ItemTable;

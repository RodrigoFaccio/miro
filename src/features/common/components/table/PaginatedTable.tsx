import TableBuilder from "@/features/common/components/table/TableBuilder";
import {
  ColumnDef,
  TableOptions,
  getCoreRowModel,
} from "@tanstack/react-table";

export type PaginatedTableProps<T extends object> = Partial<TableOptions<T>> & {
  records: {
    results: T[];
    count: number;
  };
  fetching?: boolean;
  onRowClick?: (data: T) => void;
};

export function PaginatedTable<T extends object>({
  records,
  columns,
  fetching,
  onRowClick,
  ...props
}: PaginatedTableProps<T>) {
  return (
    <TableBuilder
      data={records.results}
      columns={columns as ColumnDef<T>[]}
      fetching={fetching}
      onRowClick={onRowClick}
      getCoreRowModel={getCoreRowModel()}
      pageable
      manualPagination
      manualFiltering
      enableColumnFilters={false}
      enableSorting={false}
      pageCount={Math.ceil(
        records.count / (props?.state?.pagination?.pageSize ?? 1)
      )}
      {...props}
    />
  );
}

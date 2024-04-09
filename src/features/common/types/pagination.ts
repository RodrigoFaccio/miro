import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export type PaginationResponse<T> = {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
};

export type PaginationRequest = PaginationState & {
  filters: ColumnFiltersState;
  sorting: SortingState;
  search: string;
  user?:number
  start_date?:string | null;
  end_date?:string|null
};

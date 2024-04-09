import { AuthenticatedHttp } from "@/features/common/http/axios";
import { PaginationRequest } from "@/features/common/types/pagination";
import { parsePaginationParams } from "@/features/common/utils/http";
import {
  FetchCustomersResponse,
  ReadCustomerResponse,
} from "@/features/customers/types";

export const getCustomers = async (
  request: PaginationRequest
): Promise<FetchCustomersResponse> =>
  AuthenticatedHttp.get("/customers/", {
    params: parsePaginationParams(request),
  }).then((response) => response.data);

export const getCustomer = async (id: number): Promise<ReadCustomerResponse> =>
  AuthenticatedHttp.get(`/sellers/customer/${id}/`).then(
    (response) => response.data
  );

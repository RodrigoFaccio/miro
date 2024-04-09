import { Acquirer } from "@/features/acquirers/types";
import { AuthenticatedHttp } from "@/features/common/http/axios";
import { PaginationResponse } from "@/features/common/types/pagination";

export const getAcquirers = async (): Promise<PaginationResponse<Acquirer>> =>
  AuthenticatedHttp.get<PaginationResponse<Acquirer>>("/acquirers/").then(
    (response) => response.data
  );

export const getAcquirer = async (acquirerId: number): Promise<Acquirer> => {
  return AuthenticatedHttp.get(`/acquirer/${acquirerId}/`).then(
    (response) => response.data
  );
};

export const updateAcquirer = async (
  acquirerId: number,
  payload: Partial<Acquirer>
): Promise<void> => {
  return AuthenticatedHttp.patch(`/acquirer/${acquirerId}/`, payload);
};

export const enablePaymentMethodsForAcquirer = async (
  acquirerId: number,
  payload: {
    creditCardEnabled?: boolean;
    ticketEnabled?: boolean;
    pixEnabled?: boolean;
  }
): Promise<void> =>
  AuthenticatedHttp.patch(`/acquirer/${acquirerId}/`, payload);

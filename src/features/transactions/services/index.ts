import { AuthenticatedHttp } from "@/features/common/http/axios";
import { PaginationRequest } from "@/features/common/types/pagination";
import { parsePaginationParams } from "@/features/common/utils/http";
import {
  TransactionAction,
  TransactionActionsFormValues,
} from "@/features/transactions/schemas/TransactionActionsFormSchema";
import {
  FetchTransactionsResponse,
  ReadTransactionResponse,
} from "@/features/transactions/types";

export const getTransactions = async (
  request: PaginationRequest,
): Promise<FetchTransactionsResponse> =>
  AuthenticatedHttp.get("/payments/", {
    params: parsePaginationParams(request),
  }).then((response) => response.data);

export const getTransaction = async (
  id: string,
): Promise<ReadTransactionResponse> =>
  AuthenticatedHttp.get(`/sellers/sale/${id}/`).then(
    (response) => response.data,
  );

export const refundTransaction = async (
  id: string,
  payload: TransactionActionsFormValues,
): Promise<void> =>
  AuthenticatedHttp.patch(`/sellers/sale/${id}/`, {
    status: payload.action,
    ...(payload.action === TransactionAction.CHARGEBACK && {
      amount: payload.fine,
    }),
  }).then((response) => response.data);

export const updateTransaction = async (
  id: string,
  payload: TransactionActionsFormValues,
): Promise<void> =>
  AuthenticatedHttp.patch(`/sellers/sale/${id}/`, {
    status: payload.action,
    ...(payload.action === TransactionAction.CHARGEBACK && {
      amount: payload.fine,
    }),
  }).then((response) => response.data);

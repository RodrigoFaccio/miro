import { AuthenticatedHttp } from "@/features/common/http/axios";
import {
  PaginationRequest,
  PaginationResponse,
} from "@/features/common/types/pagination";
import { parsePaginationParams } from "@/features/common/utils/http";
import { ApproveWithdrawalFormValues } from "@/features/withdrawals/schemas/ApproveWithdrawalSchema";
import { AutomaticWithdrawalAmountFormValues } from "@/features/withdrawals/schemas/AutomaticWithdrawalAmountSchema";
import { Withdrawal } from "@/features/withdrawals/types";

export const getWithdrawals = async (
  request: PaginationRequest
): Promise<PaginationResponse<Withdrawal>> =>
  AuthenticatedHttp.get("/withdrawals/", {
    params: parsePaginationParams(request),
  }).then(
    (response) =>
      response.data || {
        results: [],
        count: 0,
      }
  );

export const approveWithdrawal = async (
  id: number,
  payload: ApproveWithdrawalFormValues
): Promise<void> =>
  AuthenticatedHttp.post(`/withdrawal/${id}/approve/`, payload);

export const rejectWithdrawal = async (id: number): Promise<void> =>
  AuthenticatedHttp.post(`/withdrawal/${id}/reject/`);

export const enableAutomaticWithdrawal = async (
  enabled: boolean
): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("Automatic withdrawal enabled:", enabled);
      resolve();
    }, 2000)
  );

export const setAutomaticWithdrawalAmount = async (
  payload: AutomaticWithdrawalAmountFormValues
): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("Automatic withdrawal amount set:", payload);
      resolve();
    }, 2000)
  );

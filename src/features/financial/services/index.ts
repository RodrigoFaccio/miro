import { AuthenticatedHttp } from "@/features/common/http/axios";
import {
  PaginationRequest,
  PaginationResponse,
} from "@/features/common/types/pagination";
import { parsePaginationParams } from "@/features/common/utils/http";
import { CreatePixKeyFormValues } from "@/features/financial/schemas/CreatePixKeySchema";
import { SendPixFormValues } from "@/features/financial/schemas/SendPixFormSchema";
import {
  BankAccount,
  BankExtract,
  CreatePixKeyResponse,
  FinancialBalance,
  GetBalanceResponse,
  PixKey,
  PixKeyType,
  PixPayee,
} from "@/features/financial/types";

export const getBalance = async (): Promise<GetBalanceResponse> =>
  AuthenticatedHttp.get("/baas/balance/").then((response) => response.data);

export const getBalanceCompany = async (
  id: number,
): Promise<FinancialBalance> =>
  AuthenticatedHttp.get("/seller/balance/", {
    params: {
      account_id: id,
    },
  }).then((response) => response.data);

export const getBankAccount = async (): Promise<BankAccount> =>
  AuthenticatedHttp.get("/baas/bank/").then((response) => response.data);

export const getPixKeys = async (): Promise<PaginationResponse<PixKey>> =>
  AuthenticatedHttp.get("/baas/pix/").then((response) => response.data);

export const sendConfirmationCode = async (type: PixKeyType) =>
  new Promise((resolve) => setTimeout(() => resolve(type), 1000));

export const createPixKey = async (
  payload: CreatePixKeyFormValues,
): Promise<CreatePixKeyResponse> =>
  AuthenticatedHttp.post("/baas/pix/", payload).then(
    (response) => response.data,
  );

export const deletePixKey = async (key: string) =>
  AuthenticatedHttp.delete(`/baas/pix/${key}`).then(
    (response) => response.data,
  );

export const getBankExtract = async (
  request: PaginationRequest,
): Promise<PaginationResponse<BankExtract>> =>
  AuthenticatedHttp.get("/baas/extract/", {
    params: parsePaginationParams(request),
  }).then((response) => response.data);

export const getPixPayee = async (pixKey: string): Promise<PixPayee> =>
  new Promise((resolve) => {
    console.log("Fetching pix payee...", pixKey);
    setTimeout(() => {
      resolve({
        name: "John Doe",
        cpf: "123.456.789-00",
        account: "12345-6",
        bank: "Nu Pagamentos S.A.",
        agency: "0001",
      });
    }, 1000);
  });

export const sendPix = async (payload: SendPixFormValues) =>
  new Promise((resolve) => {
    console.log("Sending pix...", payload);
    setTimeout(() => {
      resolve("Pix sent!");
    }, 1000);
  });

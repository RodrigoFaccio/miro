import { PaginationResponse } from "@/features/common/types/pagination";

export type GetBalanceResponse = {
  balance: number;
};

export type BankAccount = {
  bankNumber: string;
  accountNumber: string;
  accountDigit: string;
  agencyNumber: string;
  agencyDigit: string | null;
};
export type FinancialBalance = {
  balance: number;
  anticipationBalance: number;
  pendingBalance: number;
  reservedBalance: number;
};

export enum BankExtractStatus {
  NORMAL = "normal",
  OTHER = "other",
  PENDING = "pending",
  PROCESSED = "processed",
  REVERSED = "reversed",
  UNKNOWN = "unknown",
}

export enum BankExtractDirection {
  IN = "in",
  OUT = "out",
}

export type BankExtract = {
  id: string;
  amount: number;
  title: string;
  description: string;
  status: BankExtractStatus;
  direction: BankExtractDirection;
  created_at: string;
};

export enum PixKeyType {
  EMAIL = "email",
  PHONE_NUMBER = "phoneNumber",
  NATIONAL_REGISTRATION = "nationalRegistration",
}

export type PixKey = {
  key: string;
  keyType: PixKeyType;
};

export type FetchPixKeysResponse = PaginationResponse<PixKey>;

export type CreatePixKeyResponse = {
  results: {
    message: string;
  };
};

export type PixPayee = {
  name: string;
  cpf: string;
  bank: string;
  agency: string;
  account: string;
};

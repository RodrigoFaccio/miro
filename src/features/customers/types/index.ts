import { User } from "@/features/auth/types";
import { PaginationResponse } from "@/features/common/types/pagination";
import { Transaction } from "@/features/transactions/types";

export enum DocumentType {
  CPF = "cpf",
  CNPJ = "cnpj",
}

export type Customer = {
  id?: number;
  user: User;
  name: string;
  email: string;
  phone: string;
  docNumber: string;
  docType: DocumentType;
  ip: string;
  fingerprint: string;
  createdAt: Date | string;
};

export type Address = {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
};

export type FetchCustomersResponse = PaginationResponse<Customer>;

export type ReadCustomerResponse = {
  customer: Customer;
  averageOrder: number;
  totalSpent: number;
  totalInOrders: number;
  paidOrderCount: number;
  totalOrdersCount: number;
  transactions: Pick<
    Transaction,
    "installments" | "amount" | "status" | "items" | "paymentMethod" | "id"
  >[];
};

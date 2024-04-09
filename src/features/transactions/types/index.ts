import { PaginationResponse } from "@/features/common/types/pagination";
import { Address, Customer } from "@/features/customers/types";

export type Product = {
  id?: number;
  title: string;
  externalRef: string;
  quantity: number;
  tangible: boolean;
  unitPrice: number;
};

export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  TICKET = "boleto",
  PIX = "pix",
  UNKNOWN = "unknown",
}

export enum TransactionStatus {
  PENDING = "pending",
  PAID = "paid",
  REFUSED = "refused",
  REFUNDED = "refunded",
  CANCELED = "canceled",
  IN_PROTEST = "in_protest",
  CHARGEBACK = "chargedback",
  PARTIALLY_PAID = "partially_paid",
  DECLINED = "declined",
  UNKNOWN = "unknown",
  BLOCKED = "blocked",
}

export type CreditCard = {
  holderName: string;
  customer: Customer;
  number: string;
  expirationDate: string | Date;
  cvv: string;
};

export type Boleto = {
  barcode: string;
  boletoUrl: string;
  expirationDate: string | Date;
};

export type Pix = {
  qrCode: string;
  expirationDate: string | Date;
};

export type Transaction = {
  id?: string;
  externalId: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    id: number;
  };
  acquirerType: string;
  customer: Customer;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  date: Date | string;
  amount: number;
  paidAmount: number;
  refundedAmount: number;
  fee: number;
  liquidAmount: number;
  installments: number;
  address: Address;
  reason: string | null;
  items: Product[];
  card?: CreditCard;
  boleto?: Boleto;
  pix?: Pix;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type FetchTransactionsResponse = PaginationResponse<Transaction>;

export type ReadTransactionResponse = Transaction;

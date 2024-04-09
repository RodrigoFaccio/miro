export enum WithdrawalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  BLOCKED = "blocked",
  UNKNOWN = "unknown",
}

export enum WithdrawalType {
  DEFAULT = "default",
  ANTICIPATION = "antecipation",
  UNKNOWN = "unknown",
}

export type Withdrawal = {
  id: number;
  date: Date | string;
  createdAt: Date | string;
  amount: number;
  amountReceived: number;
  status: WithdrawalStatus;
  type: WithdrawalType;
  fee: number;
  reason:string|null;
  data_approved:string;
  user: {
    id: number;
    cnpj: string;
    first_name: string;
    last_name: string;
    pixKey: string;
  };
};

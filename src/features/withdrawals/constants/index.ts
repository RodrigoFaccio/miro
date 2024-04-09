import { WithdrawalStatus, WithdrawalType } from "@/features/withdrawals/types";

export const WithdrawalsStatusConfig = {
  [WithdrawalStatus.APPROVED]: {
    value: WithdrawalStatus.APPROVED,
    label: "Aprovado",
    colorScheme: "green",
    color: "green.500",
  },
  [WithdrawalStatus.PENDING]: {
    value: WithdrawalStatus.PENDING,
    label: "Pendente",
    colorScheme: "yellow",
    color: "yellow.500",
  },
  [WithdrawalStatus.REJECTED]: {
    value: WithdrawalStatus.REJECTED,
    label: "Rejeitado",
    colorScheme: "red",
    color: "red.500",
  },
  [WithdrawalStatus.BLOCKED]: {
    value: WithdrawalStatus.BLOCKED,
    label: "Bloqueado",
    colorScheme: "red",
    color: "red.500",
  },
  [WithdrawalStatus.UNKNOWN]: {
    value: WithdrawalStatus.UNKNOWN,
    label: "Desconhecido",
    colorScheme: "gray",
    color: "gray.500",
  },
};

export const WithdrawalsTypeConfig = {
  [WithdrawalType.DEFAULT]: {
    value: WithdrawalType.DEFAULT,
    label: "Saque",
    colorScheme: "blue",
    color: "blue.500",
  },
  [WithdrawalType.ANTICIPATION]: {
    value: WithdrawalType.ANTICIPATION,
    label: "Antecipação",
    colorScheme: "orange",
    color: "orange.500",
  },
  [WithdrawalType.UNKNOWN]: {
    value: WithdrawalType.UNKNOWN,
    label: "Desconhecido",
    colorScheme: "gray",
    color: "gray.500",
  },
};

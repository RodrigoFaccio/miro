import { BankExtractStatus, PixKeyType } from "@/features/financial/types";

export const PixKeyTypeConfig = {
  [PixKeyType.EMAIL]: {
    label: "E-mail",
  },
  [PixKeyType.PHONE_NUMBER]: {
    label: "Telefone",
  },
  [PixKeyType.NATIONAL_REGISTRATION]: {
    label: "CPF/CNPJ",
  },
};

export const BankExtractStatusConfig = {
  [BankExtractStatus.PROCESSED]: {
    value: BankExtractStatus.PROCESSED,
    label: "Processado",
    colorScheme: "green",
  },
  [BankExtractStatus.PENDING]: {
    value: BankExtractStatus.PENDING,
    label: "Pendente",
    colorScheme: "orange",
  },
  [BankExtractStatus.REVERSED]: {
    value: BankExtractStatus.REVERSED,
    label: "Revertido",
    colorScheme: "red",
  },
  [BankExtractStatus.NORMAL]: {
    value: BankExtractStatus.NORMAL,
    label: "Normal",
    colorScheme: "blue",
  },
  [BankExtractStatus.OTHER]: {
    value: BankExtractStatus.OTHER,
    label: "Outro",
    colorScheme: "gray",
  },
  [BankExtractStatus.UNKNOWN]: {
    value: BankExtractStatus.UNKNOWN,
    label: "Desconhecido",
    colorScheme: "gray",
  },
};

import {
  PaymentMethod,
  TransactionStatus,
} from "@/features/transactions/types";
import { BsCreditCard } from "react-icons/bs";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { FaBarcode, FaPix } from "react-icons/fa6";
import { MdCancel, MdError } from "react-icons/md";

export const PaymentMethodConfig = {
  [PaymentMethod.CREDIT_CARD]: {
    id: PaymentMethod.CREDIT_CARD,
    label: "Cartão de crédito",
    icon: BsCreditCard,
    color: "red.400",
    colorScheme: "red",
  },
  [PaymentMethod.TICKET]: {
    id: PaymentMethod.TICKET,
    label: "Boleto",
    icon: FaBarcode,
    color: "blue.500",
    colorScheme: "blue",
  },
  [PaymentMethod.PIX]: {
    id: PaymentMethod.PIX,
    label: "Pix",
    icon: FaPix,
    color: "green.500",
    colorScheme: "green",
  },
  [PaymentMethod.UNKNOWN]: {
    id: PaymentMethod.UNKNOWN,
    label: "Desconhecido",
    icon: MdError,
    color: "gray.500",
    colorScheme: "gray",
  },
};

export const TransactionStatusConfig = {
  [TransactionStatus.PENDING]: {
    value: TransactionStatus.PENDING,
    label: "Pendente",
    icon: FaClock,
    color: "yellow.500",
    colorScheme: "yellow",
  },
  [TransactionStatus.PAID]: {
    value: TransactionStatus.PAID,
    label: "Pago",
    icon: FaCheckCircle,
    color: "green.500",
    colorScheme: "green",
  },
  [TransactionStatus.REFUSED]: {
    value: TransactionStatus.REFUSED,
    label: "Recusado",
    icon: MdCancel,
    color: "red.500",
    colorScheme: "red",
  },
  [TransactionStatus.REFUNDED]: {
    value: TransactionStatus.REFUNDED,
    label: "Estornado",
    icon: MdCancel,
    color: "red.500",
    colorScheme: "red",
  },
  [TransactionStatus.CANCELED]: {
    value: TransactionStatus.CANCELED,
    label: "Cancelado",
    icon: MdCancel,
    color: "red.500",
    colorScheme: "red",
  },
  [TransactionStatus.IN_PROTEST]: {
    value: TransactionStatus.IN_PROTEST,
    label: "Em protesto",
    icon: MdCancel,
    color: "red.500",
    colorScheme: "red",
  },
  [TransactionStatus.PARTIALLY_PAID]: {
    value: TransactionStatus.PARTIALLY_PAID,
    label: "Parcialmente pago",
    icon: FaCheckCircle,
    color: "yellow.500",
    colorScheme: "yellow",
  },
  [TransactionStatus.DECLINED]: {
    value: TransactionStatus.DECLINED,
    label: "Rejeitado",
    icon: MdCancel,
    color: "red.500",
    colorScheme: "red",
  },
  [TransactionStatus.CHARGEBACK]: {
    value: TransactionStatus.CHARGEBACK,
    label: "Chargeback",
    icon: MdCancel,
    color: "red.500",
    colorScheme: "red",
  },
  [TransactionStatus.UNKNOWN]: {
    value: TransactionStatus.UNKNOWN,
    label: "Desconhecido",
    icon: MdError,
    color: "gray.500",
    colorScheme: "gray",
  },
  [TransactionStatus.BLOCKED]: {
    value: TransactionStatus.UNKNOWN,
    label: "Bloqueado",
    icon: MdError,
    color: "red.500",
    colorScheme: "red",
  },
};

import { TransactionStatus } from "@/features/transactions/types";
import * as yup from "yup";

export enum TransactionAction {
  REFUND = "refund",
  CHARGEBACK = "chargedback",
  PRECHARGEBACK = "prechargeback",
}

const TransactionActionsFormSchema = yup.object().shape({
  action: yup.string<TransactionAction>().required(),
  hasFine: yup.boolean(),
  fine: yup.number().when("status", {
    is: TransactionStatus.CHARGEBACK,
    then: (schema) => schema.required("A multa é obrigatória"),
  }),
});

export type TransactionActionsFormValues = yup.InferType<
  typeof TransactionActionsFormSchema
>;

export default TransactionActionsFormSchema;

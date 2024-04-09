import * as yup from "yup";

const AutomaticWithdrawalAmountFormSchema = yup.object().shape({
  amount: yup
    .number()
    .required("Informe o valor mínimo para o saque automático")
    .min(0.01, "Valor mínimo de saque é R$ 0,01"),
});

export type AutomaticWithdrawalAmountFormValues = yup.InferType<
  typeof AutomaticWithdrawalAmountFormSchema
>;

export default AutomaticWithdrawalAmountFormSchema;

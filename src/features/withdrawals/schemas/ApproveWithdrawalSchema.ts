import * as yup from "yup";

const ApproveWithdrawalFormSchema = yup.object().shape({
  manual: yup.boolean().required(),
  pin: yup
    .string()
    .when(["$pinRequired", "manual"], function ([pinRequired, manual], schema) {
      return pinRequired && !manual
        ? schema.required("Informe o PIN").min(4, "PIN deve ter 4 dígitos")
        : schema;
    }),
});

export type ApproveWithdrawalFormValues = yup.InferType<
  typeof ApproveWithdrawalFormSchema
>;

export default ApproveWithdrawalFormSchema;

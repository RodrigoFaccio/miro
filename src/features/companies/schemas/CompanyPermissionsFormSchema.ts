import * as yup from "yup";

const CompanyPermissionsFormSchema = yup.object().shape({
  creditCard: yup
    .boolean()
    .required("Informe se o cartão de crédito está habilitado"),
  boleto: yup.boolean().required("Informe se o boleto está habilitado"),
  pix: yup.boolean().required("Informe se o pix está habilitado"),
  withdrawEnabled: yup.boolean().required("Informe se o saque está habilitado"),
  antecipationEnabled: yup
    .boolean()
    .required("Informe se a antecipação está habilitada"),
});

export type CompanyPermissionsFormValues = yup.InferType<
  typeof CompanyPermissionsFormSchema
>;

export default CompanyPermissionsFormSchema;

import * as yup from "yup";

const CompanyCustomAcquirersFormSchema = yup.object().shape({
  creditCardAcquirer: yup.number().nullable(),
  boletoAcquirer: yup.number().nullable(),
  pixAcquirer: yup.number().nullable(),
});

export type CompanyCustomAcquirersFormValues = yup.InferType<
  typeof CompanyCustomAcquirersFormSchema
>;

export default CompanyCustomAcquirersFormSchema;

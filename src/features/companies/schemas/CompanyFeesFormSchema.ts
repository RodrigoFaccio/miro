import * as yup from "yup";

const CompanyFeesFormSchema = yup.object().shape({
  pixFixed: yup.string().required("Informe a Taxa fixa"),
  pixPercentage: yup.string().required("Informe a Taxa variável"),
  ticketFixed: yup.string().required("Informe a Taxa fixa"),
  ticketPercentage: yup.string().required("Informe a Taxa variável"),
  creditCardFixed: yup.string().required("Informe a Taxa variável"),
  creditCardPercentage: yup.string().required("Informe a Taxa do cartão"),
  creditCard2x: yup.string().required("Informe a Taxa do cartão"),
  creditCard3x: yup.string().required("Informe a Taxa do cartão"),
  creditCard4x: yup.string().required("Informe a Taxa do cartão"),
  creditCard5x: yup.string().required("Informe a Taxa do cartão"),
  creditCard6x: yup.string().required("Informe a Taxa do cartão"),
  creditCard7x: yup.string().required("Informe a Taxa do cartão"),
  creditCard8x: yup.string().required("Informe a Taxa do cartão"),
  creditCard9x: yup.string().required("Informe a Taxa do cartão"),
  creditCard10x: yup.string().required("Informe a Taxa do cartão"),
  creditCard11x: yup.string().required("Informe a Taxa do cartão"),
  creditCard12x: yup.string().required("Informe a Taxa do cartão"),
  pixReleaseReserve: yup
    .number()
    .typeError("Valor inválido")
    .required("Informe a liberação em dias"),
  ticketReleaseReserve: yup
    .number()
    .typeError("Valor inválido")
    .required("Informe a liberação em dias"),
  creditCardReleaseReserve: yup
    .number()
    .typeError("Valor inválido")
    .required("Informe a liberação em dias"),
  antecipationPercentage: yup.string().required("Informe a antecipação"),
  antecipationReleaseCreditCard: yup
    .string()
    .typeError("Valor inválido")
    .required("Informe a liberação em dias"),
  antecipationReleaseTicket: yup
    .string()
    .typeError("Valor inválido")
    .required("Informe a liberação em dias"),
  antecipationReleasePix: yup
    .string()
    .typeError("Valor inválido")
    .required("Informe a liberação em dias"),
  withdrawalFee: yup.string().required("Informe taxa do saque "),
  prechargebackFixed: yup.string().required("Informe taxa do prechargeback"),
});

export type CompanyFeesFormValues = yup.InferType<typeof CompanyFeesFormSchema>;

export default CompanyFeesFormSchema;

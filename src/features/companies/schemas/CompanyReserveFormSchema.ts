import * as yup from "yup";

const CompanyReserveFormSchema = yup.object().shape({
  creditCardReserve: yup
    .number()
    .required("Informe a Reserva")
    .typeError("Valor inválido"),
  creditCardReleaseReserve: yup
    .number()
    .required("Informe a liberação em dias")
    .typeError("Valor inválido"),
  pixReserve: yup
    .number()
    .required("Informe a Reserva")
    .typeError("Valor inválido"),
  pixReleaseReserve: yup
    .number()
    .required("Informe a liberação em dias")
    .typeError("Valor inválido"),
  ticketReserve: yup
    .number()
    .required("Informe a Reserva")
    .typeError("Valor inválido"),
  ticketReleaseReserve: yup
    .number()
    .required("Informe a liberação em dias")
    .typeError("Valor inválido"),
});

export type CompanyReserveFormValues = yup.InferType<
  typeof CompanyReserveFormSchema
>;

export default CompanyReserveFormSchema;

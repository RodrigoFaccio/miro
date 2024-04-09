import { validateCep } from "validations-br";
import * as yup from "yup";

const AddressFormSchema = yup.object().shape({
  zipcode: yup
    .string()
    .test(
      "zipcode",
      "CEP inválido",
      (value) => !value || validateCep(value || "")
    )
    .transform((value) => value?.replace(/\D/g, ""))
    .required("Informe o CEP"),
  number: yup.string().required("Informe o número"),
  street: yup.string().required("Informe a rua"),
  neighborhood: yup.string().required("Informe o bairro"),
  complement: yup.string().optional().nullable(),
  city: yup.string().required("Informe a cidade"),
  state: yup.string().required("Informe o estado"),
});

export type AddressFormValues = yup.InferType<typeof AddressFormSchema>;

export default AddressFormSchema;

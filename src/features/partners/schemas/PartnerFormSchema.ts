import AddressFormSchema from "@/features/address/schemas/AddressFormSchema";
import { PartnerRole } from "@/features/partners/types";
import { validateCNPJ, validateCPF, validatePhone } from "validations-br";
import * as yup from "yup";

const PartnerFormSchema = yup.object().shape({
  name: yup.string().required("Este campo é obrigatório."),
  email: yup.string().required("Este campo é obrigatório."),
  mother_name: yup.string().required("Este campo é obrigatório."),
  document: yup
    .string()
    .transform((value) => value?.replace(/\D/g, "") || "")
    .required("Este campo é obrigatório.")
    .test("document", "Documento inválido", function (value) {
      if (value?.length === 11 && !validateCPF(value)) {
        return this.createError({ message: "CPF inválido" });
      }
      if (value?.length === 14 && !validateCNPJ(value)) {
        return this.createError({ message: "CNPJ inválido" });
      }
      return [11, 14].includes(value?.length);
    }),
  role: yup
    .string()
    .oneOf([PartnerRole.ADMIN, PartnerRole.PARTNER, PartnerRole.UNKNOWN])
    .required("Este campo é obrigatório."),
  phone: yup
    .string()
    .transform((value) => value?.replace(/\D/g, "") || "")
    .required("Este campo é obrigatório.")
    .test("phone", "Telefone inválido", (value) => validatePhone(value || "")),
  birth_date: yup.string().required("Este campo é obrigatório."),
  address: AddressFormSchema,
});

export type PartnerFormValues = yup.InferType<typeof PartnerFormSchema>;

export default PartnerFormSchema;

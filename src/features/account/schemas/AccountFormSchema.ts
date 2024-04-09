import AddressFormSchema from "@/features/address/schemas/AddressFormSchema";
import PartnerFormSchema from "@/features/partners/schemas/PartnerFormSchema";
import { validateCNPJ, validateCPF, validatePhone } from "validations-br";
import * as yup from "yup";

export const AccountFormSchema = yup.object().shape({
  cnpj: yup
    .string()
    .transform((value) => value?.replace(/\D/g, "") || "")
    .required("Informe o CNPJ")
    .test("cnpj", "Documento inválido", function (value) {
      if (value?.length === 11 && !validateCPF(value)) {
        return this.createError({ message: "CPF inválido" });
      }
      if (value?.length === 14 && !validateCNPJ(value)) {
        return this.createError({ message: "CNPJ inválido" });
      }
      return [11, 14].includes(value?.length);
    }),
  companyLegalName: yup.string().required("Informe a razão social"),
  commercialName: yup.string().required("Informe o nome comercial"),
  phone: yup
    .string()
    .transform((value) => value?.replace(/\D/g, "") || "")
    .required("Informe o telefone")
    .test("phone", "Telefone inválido", (value) => validatePhone(value || "")),
  averageRevenue: yup
    .number()
    .required("Informe o faturamento médio")
    .positive("O faturamento deve ser um valor positivo"),
  companyCreatedDate: yup.date().required("Informe a data"),
  companyType: yup.string().required("Informe o tipo da empresa"),
  companyLegalNature: yup
    .string()
    .required("Informe a natureza jurídica da empresa"),
  companyMainCnae: yup
    .string()
    .transform((value) => value?.replace(/\D/g, "") || "")
    .required("Informe o CNAE principal")
    .min(7)
    .max(7),
  passwordBaas: yup
    .string()
    .required("Informe a senha do BaaS")
    .min(4, "A senha deve ter no mínimo 4 caracteres"),
  address: AddressFormSchema,
  partners: yup
    .array()
    .of(PartnerFormSchema)
    .min(1, "A empresa precisa ter no mínimo um sócio"),
});

export type AccountFormValues = yup.InferType<typeof AccountFormSchema>;

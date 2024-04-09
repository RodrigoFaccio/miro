import * as yup from "yup";

const SendPixFormSchema = yup.object().shape({
  pixKey: yup.string().required("Chave é obrigatória"),
  amount: yup
    .number()
    .required("Valor é obrigatório")
    .min(0.01, "Valor mínimo é R$ 0,01"),
  pin: yup
    .string()
    .required("PIN é obrigatório")
    .min(4, "PIN deve ter 4 dígitos"),
});

export type SendPixFormValues = yup.InferType<typeof SendPixFormSchema>;

export default SendPixFormSchema;

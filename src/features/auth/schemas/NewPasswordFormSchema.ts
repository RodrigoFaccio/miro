import * as yup from "yup";

const NewPasswordFormSchema = yup.object().shape({
  token: yup
    .string()
    .min(6, "O código deve ter 6 caracteres")
    .required("Código é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
  passwordConfirmation: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password"), ""], "As senhas devem ser iguais"),
});

export type NewPasswordFormValues = yup.InferType<typeof NewPasswordFormSchema>;

export default NewPasswordFormSchema;

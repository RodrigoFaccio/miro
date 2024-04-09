import * as yup from "yup";

const ChangePasswordFormSchema = yup.object().shape({
  currentPassword: yup.string().required("Informe a senha atual"),
  newPassword: yup
    .string()
    .required("Informe a nova senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmNewPassword: yup
    .string()
    .required("Confirme a nova senha")
    .oneOf([yup.ref("newPassword")], "As senhas não conferem"),
});

export type ChangePasswordFormValues = yup.InferType<
  typeof ChangePasswordFormSchema
>;

export default ChangePasswordFormSchema;

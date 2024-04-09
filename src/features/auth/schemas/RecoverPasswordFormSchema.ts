import * as yup from "yup";

const RecoverPasswordFormSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export type RecoverPasswordFormValues = yup.InferType<
  typeof RecoverPasswordFormSchema
>;

export default RecoverPasswordFormSchema;

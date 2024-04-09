import * as yup from "yup";

const LoginFormSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type LoginFormValues = yup.InferType<typeof LoginFormSchema>;

export default LoginFormSchema;

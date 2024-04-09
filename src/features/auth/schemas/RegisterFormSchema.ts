import * as yup from "yup";

const RegisterFormSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export type RegisterFormValues = yup.InferType<typeof RegisterFormSchema>;

export default RegisterFormSchema;

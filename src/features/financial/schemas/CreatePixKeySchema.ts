import { PixKeyType } from "@/features/financial/types";
import * as yup from "yup";

const CreatePixKeyFormSchema = yup.object().shape({
  type: yup.string<PixKeyType>().required("Tipo de chave é obrigatório"),
  code: yup.string().when("type", {
    is: PixKeyType.NATIONAL_REGISTRATION,
    then: (schema) => schema,
    otherwise: (schema) => schema.required("Código é obrigatório"),
  }),
});

export type CreatePixKeyFormValues = yup.InferType<
  typeof CreatePixKeyFormSchema
>;

export default CreatePixKeyFormSchema;

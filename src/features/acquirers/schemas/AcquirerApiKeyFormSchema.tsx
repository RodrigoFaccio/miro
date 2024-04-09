import { Acquirer } from "@/features/acquirers/types";
import * as yup from "yup";

const AcquirerApiKeyFormSchema = yup.object().shape({
  keys: yup
    .object()
    .when("$fields", ([fields]: Acquirer["fields"][], schema) =>
      schema.shape(
        fields.reduce(
          (acc, field) => ({
            ...acc,
            [field.id]: yup.string().required("Campo obrigatório"),
          }),
          {}
        )
      )
    ),
});

export type AcquirerApiKeyFormValues = {
  keys: Acquirer["keys"];
};

export default AcquirerApiKeyFormSchema;

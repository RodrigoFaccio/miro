import * as yup from "yup";

const AcquirerCostFormSchema = yup.object().shape({

costPixFixed: yup.number().required("Informe a Taxa fixa"),
costPixPercentage: yup.number().required("Informe a Taxa variável"),
costTicketFixed: yup.number().required("Informe a Taxa fixa"),
costTicketPercentage: yup.number().required("Informe a Taxa variável"),
costCreditCardFixed: yup.number().required("Informe a Taxa variável"),
costCreditCardPercentage: yup.number().required("Informe a Taxa do cartão"),

costCreditCard2x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard3x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard4x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard5x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard6x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard7x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard8x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard9x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard10x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard11x: yup.number().required("Informe a Taxa do cartão"),
costCreditCard12x: yup.number().required("Informe a Taxa do cartão"),
});

export type AcquirerCostFormValues = yup.InferType<
  typeof AcquirerCostFormSchema
>;

export default AcquirerCostFormSchema;

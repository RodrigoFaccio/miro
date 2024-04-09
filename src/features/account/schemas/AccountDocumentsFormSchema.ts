import { DocumentTypes } from "@/features/account/types";
import * as yup from "yup";

export const DocumentSchema = yup.object().shape({
  id: yup.string().optional(),
  type: yup.string<DocumentTypes>().required("Informe o tipo do arquivo"),
  file: yup.mixed<File>().required("Informe o arquivo"),
});

export type DocumentFormValues = yup.InferType<typeof DocumentSchema>;

export const AccountDocumentsSchema = yup.object().shape({
  partners: yup.array().of(
    yup.object().shape({
      id: yup.string().nullable(),
      name: yup.string(),
      owner: yup.boolean().required(),
      documents: yup
        .array()
        .required()
        .of(DocumentSchema)
        .test(
          "validate-article-of-association",
          "Você deve enviar obrigatoriamente o contrato social",
          function (documents, context) {
            console.log(context);
            if (!context?.parent?.owner) {
              return true;
            }

            return (
              documents?.some(
                (document) =>
                  document.type === DocumentTypes.ARTICLES_OF_ASSOCIATION
              ) ||
              this.createError({
                message: "Você deve enviar obrigatoriamente o contrato social",
              })
            );
          }
        )
        .test(
          "validate-identity-documents",
          "Você deve enviar obrigatoriamente os seguintes documentos: CNH (frente e verso) ou RG (frente e verso) ou CNH Digital + Selfie",
          function (documents, context) {
            if (context?.parent?.owner) {
              return true;
            }

            const hasDriverLicense =
              documents?.some(
                (document) =>
                  document.type === DocumentTypes.DRIVER_LICENSE_FRONT
              ) &&
              documents?.some(
                (document) =>
                  document.type === DocumentTypes.DRIVER_LICENSE_VERSE
              );

            const hasIdentityCard =
              documents?.some(
                (document) =>
                  document.type === DocumentTypes.IDENTITY_CARD_FRONT
              ) &&
              documents?.some(
                (document) =>
                  document.type === DocumentTypes.IDENTITY_CARD_VERSE
              );

            const hasDigitalDriverLicense = documents?.some(
              (document) =>
                document.type === DocumentTypes.DIGITAL_DRIVER_LICENSE
            );

            return (
              hasDriverLicense ||
              hasIdentityCard ||
              hasDigitalDriverLicense ||
              this.createError({
                message:
                  "Você deve enviar obrigatoriamente os seguintes documentos: CNH (frente e verso) ou RG (frente e verso) ou CNH Digital",
              })
            );
          }
        )
        .test(
          "validate-selfie",
          "Você deve enviar obrigatoriamente uma selfie",
          function (documents, context) {
            if (context?.parent?.owner) {
              return true;
            }

            return (
              documents?.some(
                (document) => document.type === DocumentTypes.SELFIE
              ) ||
              this.createError({
                message: "Você deve enviar obrigatoriamente uma selfie",
              })
            );
          }
        ),
    })
  ),
});

export type AccountDocumentsFormValues = yup.InferType<
  typeof AccountDocumentsSchema
>;

import { DocumentFormValues } from "@/features/account/schemas/AccountDocumentsFormSchema";
import { AccountFormValues } from "@/features/account/schemas/AccountFormSchema";
import { ChangePasswordFormValues } from "@/features/account/schemas/ChangePasswordSchema";
import { Account, AccountResponseData } from "@/features/account/types";
import { AuthenticatedHttp } from "@/features/common/http/axios";
import { PartnerRole } from "@/features/partners/types";
import { AxiosError, AxiosProgressEvent } from "axios";
import moment from "moment";

export const changePassword = (payload: ChangePasswordFormValues) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log(payload);
      reject(new AxiosError("Not implemented", AxiosError.ERR_BAD_REQUEST));
      resolve(null);
    }, 1000)
  );

export const getAccount = (): Promise<Account> =>
  AuthenticatedHttp.get<AccountResponseData>("/mainCompany/")
    .then((response) => response.data)
    .then(
      (account) =>
        ({
          averageRevenue: account.averageRevenue,
          cnpj: account.cnpj,
          commercialName: account.commercialName,
          companyCreatedDate: account.companyCreatedDate,
          companyLegalName: account.companyLegalName,
          companyLegalNature: account.companyLegalNature,
          companyMainCnae: account.companyMainCnae,
          companyType: account.companyType,
          passwordBaas: account.passwordBaas,
          status: account.status,
          partners: (account.partners || []).map((partner) => ({
            birth_date: partner.birth_date,
            document: partner.document,
            email: partner.email,
            name: partner.name,
            phone: partner.phone,
            role: partner.is_master ? PartnerRole.ADMIN : PartnerRole.PARTNER,
            mother_name: partner.mother_name,
            address: {
              // TODO: map address
              zipcode: "",
              city: "",
              state: "",
              neighborhood: "",
              street: "",
              complement: "",
              number: "",
            },
          })),
          address: {
            zipcode: account.cep,
            city: account.city,
            state: account.state,
            neighborhood: account.neighborhood,
            street: account.address,
            complement: "",
            number: account.addressNumber,
          },
        } as Account)
    );

export const saveAccount = ({
  address,
  ...account
}: AccountFormValues): Promise<void> =>
  AuthenticatedHttp.post("/mainCompany/", {
    ...account,
    address: address.street,
    addressNumber: address.number,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
    companyCreatedDate: moment(account.companyCreatedDate).format("YYYY-MM-DD"),
    partners: account.partners?.map(({ address, birth_date, ...partner }) => ({
      ...partner,
      birth_date: moment(birth_date).format("YYYY-MM-DD"),
      address: {
        city: address.city,
        state: address.state,
        number: address.number,
        street: address.street,
        postal_code: address.zipcode,
        neighborhood: address.neighborhood,
      },
    })),
  });

export const sendDocument = async (
  document: DocumentFormValues,
  partnerId: string | null,
  onUploadProgress?: (event: AxiosProgressEvent) => void
): Promise<DocumentFormValues> => {
  const formData = new FormData();

  formData.append("file", document.file as File);

  formData.append("type", document.type);

  if (partnerId) {
    formData.append("partner_id", partnerId);
  }

  return AuthenticatedHttp.post("/baas/send_document/", formData, {
    onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(() => document);
};

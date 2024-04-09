import { Address } from "@/features/customers/types";
import { Partner } from "@/features/partners/types";

export enum AccountStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
  CANCELED = "canceled",
  DENIED = "denied",
  FAILED = "failed",
  NEW = "new",
  PENDING = "pending",
  QUEUED = "queued",
  SUSPENDED = "suspended",
  UNDER_REVIEW = "under_review",
  WAITING_ANALYSIS = "waiting_analysis",
  WAITING_CORRECTIONS = "waiting_corrections",
  WAITING_DOCUMENTS = "waiting_documents",
}

export type Account = {
  cnpj: string;
  commercialName: string;
  companyLegalName: string;
  passwordBaas: string;
  companyLegalNature: string;
  companyCreatedDate: string;
  companyType: string;
  companyMainCnae: string;
  averageRevenue: number;
  status: AccountStatus;
  address: Address;
  partners?: Partner[];
};

export type AccountResponseData = Omit<Account, "address" | "partners"> & {
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  address: string;
  addressNumber: string;
  partners: Array<
    Omit<Partner, "address"> & {
      city: string;
      state: string;
      number: string;
      street: string;
      postal_code: string;
      neighborhood: string;
      complement?: string;
      is_master: boolean;
    }
  >;
};

export enum DocumentTypes {
  ARTICLES_OF_ASSOCIATION = "ARTICLES_OF_ASSOCIATION",
  CCMEI = "CCMEI",
  COMPANY_BYLAWS = "COMPANY_BYLAWS",
  EI_REGISTRATION_REQUIREMENT = "EI_REGISTRATION_REQUIREMENT",
  LEGAL_STATEMENT = "LEGAL_STATEMENT",
  REVENUES_RECEIPT = "REVENUES_RECEIPT",
  DIGITAL_DRIVER_LICENSE = "DIGITAL_DRIVER_LICENSE",
  DRIVER_LICENSE_FRONT = "DRIVER_LICENSE_FRONT",
  DRIVER_LICENSE_VERSE = "DRIVER_LICENSE_VERSE",
  IDENTITY_CARD_FRONT = "IDENTITY_CARD_FRONT",
  IDENTITY_CARD_VERSE = "IDENTITY_CARD_VERSE",
  PASSPORT = "PASSPORT",
  SELFIE = "SELFIE",
  SIGNATURE_CARD = "SIGNATURE_CARD",
  RNE_FRONT = "RNE_FRONT",
  RNE_VERSE = "RNE_VERSE",
  EMANCIPATION_STATEMENT = "EMANCIPATION_STATEMENT",
}

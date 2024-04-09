import { CompanyFeesFormValues } from "@/features/companies/schemas/CompanyFeesFormSchema";

export enum CompanyType {
  EI = "EI",
  MEI = "MEI",
  EIRELI = "EIRELI",
  LTDA = "LTDA",
  SS = "SS",
  SA = "SA",
  ME = "ME",
  EPP = "EPP",
  EMGP = "EMGP",
  COOP = "COOP",
  DEMAIS = "DEMAIS",
}

export enum CompanyStatus {
  PENDING = "pending",
  GATEWAY_PENDING = "gateway_pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  BLOCKED = "blocked",
  UNKNOWN = "unknown",
}

export type SentFile = {
  id: number;
  name: string;
  file: string;
};

export type Company = {
  id: number;
  profileCompleted: boolean;
  first_name: string;
  last_name: string;
  email: string;
  status: CompanyStatus;
  cpf: string;
  cnpj: string;
  invoiceName: string;
  commercialName: string;
  companyLegalName: string;
  averageRevenue: number;
  totalSales: number;
  liquidSales: number;
  withdrawAmount: number;
  averageTicket: number;
  physicalProduct: boolean;
  productsSelling: string;
  site: string;
  contactEmail: string;
  contactPhone: string;
  neighborhood: string;
  motherName: string;
  address: string;
  country: string;
  state: string;
  cep: string;
  city: string;
  postalCode: string;
  number: string;
  documents: Array<File | SentFile>;
  birthDate: string;
  date_joined: string;
  last_login: string;
};

export interface CompanyFeeData extends CompanyFeesFormValues {
  ticketReserve: number;
  ticketReserveRelease: number;
  creditCardReserve: number;
  creditCardReserveRelease: number;
  pixReserve: number;
  pixReserveRelease: number;
  id: number;
  name: string;
  acquirer_gateway: string;
  createdAt: string;
  enabled: boolean;
  fields: Array<{
    id: number;
    name: string;
  }>;
  keys: {
    [key: string]: string;
  };
  creditCardEnabled: boolean;
  ticketEnabled: boolean;
  pixEnabled: boolean;
  costPercentage: string;
  costPixFixed: string;
  costPixPercentage: string;
  costTicketFixed: string;
  costTicketPercentage: string;
  creditCardFixed: string;
  costCreditCardPercentage: string;
  costCreditCardFixed: string;
  creditCardPercentage: string;
  costCreditCard2x: string;
  costCreditCard3x: string;
  costCreditCard4x: string;
  costCreditCard5x: string;
  costCreditCard6x: string;
  costCreditCard7x: string;
  costCreditCard8x: string;
  costCreditCard9x: string;
  costCreditCard10x: string;
  costCreditCard11x: string;
  costCreditCard12x: string;
  costPrechargebackFixed: string;
  cashoutEnabled: boolean;
}



export type CustomAcquirerOption = {
  id: number;
  name: string;
};

export type ReadCompanyData = {
  id: number;
  profileCompleted: boolean;
  first_name: string;
  last_name: string;
  email: string;
  status: CompanyStatus;
  creditCard: boolean;
  boleto: boolean;
  pix: boolean;
  withdrawEnabled: boolean;
  antecipationEnabled: boolean;
  creditCardAcquirer: CustomAcquirerOption | null;
  boletoAcquirer: CustomAcquirerOption | null;
  pixAcquirer: CustomAcquirerOption | null;
  birthDate: string;
  date_joined: string;
  last_login: string | null;
  companyLegalName: string;
};

export enum CompanyFeesScope {
  GLOBAL = "global",
  COMPANY = "company",
}

export type Cnae = {
  id: string;
  description: string;
};

export type LegalNature = {
  id: string;
  description: string;
};

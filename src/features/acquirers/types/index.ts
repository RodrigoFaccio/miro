import { CompanyFeeData } from "@/features/companies/types";

export interface Acquirer extends CompanyFeeData {
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
  cashoutEnabled: boolean;
}

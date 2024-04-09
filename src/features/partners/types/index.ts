import { Address } from "@/features/customers/types";

export enum PartnerRole {
  ADMIN = "admin",
  PARTNER = "partner",
  UNKNOWN = "unknown",
}

export interface Partner {
  id?: string;
  document: string;
  email: string;
  role: PartnerRole;
  name: string;
  phone: string;
  birth_date: string;
  mother_name: string;
  address: Address;
}

import { PartnerRole } from "@/features/partners/types";

export const PartnerRoleConfig = {
  [PartnerRole.ADMIN]: {
    label: "Administrador",
    value: PartnerRole.ADMIN,
    colorScheme: "red",
    color: "red.500",
  },
  [PartnerRole.PARTNER]: {
    label: "Parceiro",
    value: PartnerRole.PARTNER,
    colorScheme: "green",
    color: "green.500",
  },
  [PartnerRole.UNKNOWN]: {
    label: "Desconhecido",
    value: PartnerRole.UNKNOWN,
    colorScheme: "gray",
    color: "gray.500",
  },
};

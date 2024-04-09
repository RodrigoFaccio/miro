import { CompanyStatus, CompanyType } from "@/features/companies/types";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { MdBlock, MdCancel } from "react-icons/md";

export const CompanyStatusConfig = {
  [CompanyStatus.APPROVED]: {
    icon: FaCheckCircle,
    label: "Aprovado",
    description: "Seu cadastro foi aprovado com sucesso!",
    value: CompanyStatus.APPROVED,
    colorScheme: "green",
    color: "green.500",
  },
  [CompanyStatus.PENDING]: {
    icon: FaRegClock,
    label: "Pendente",
    description: "Aguardando envio dos dados",
    value: CompanyStatus.PENDING,
    colorScheme: "yellow",
    color: "yellow.500",
  },
  [CompanyStatus.GATEWAY_PENDING]: {
    icon: FaRegClock,
    label: "Aprovação do Gateway Pendente",
    description:
      "Recebemos seus dados. Agora, precisamos da aprovação do nosso gateway de pagamento para continuar com o seu cadastro. Em breve, entraremos em contato com mais informações.",
    value: CompanyStatus.GATEWAY_PENDING,
    colorScheme: "orange",
    color: "orange.500",
  },
  [CompanyStatus.REJECTED]: {
    icon: MdCancel,
    label: "Rejeitado",
    description:
      "Analisamos seus dados e não foi possível aprovar seu cadastro no momento. Entre em contato com o nosso suporte para mais informações.",
    value: CompanyStatus.REJECTED,
    colorScheme: "red",
    color: "red.500",
  },
  [CompanyStatus.BLOCKED]: {
    icon: MdBlock,
    label: "Bloqueado",
    description:
      "Seu cadastro foi bloqueado. Entre em contato com o nosso suporte para mais informações.",
    value: CompanyStatus.BLOCKED,
    colorScheme: "red",
    color: "red.500",
  },
  [CompanyStatus.UNKNOWN]: {
    icon: FaRegClock,
    label: "Desconhecido",
    description: "Não foi possível identificar o status do seu cadastro.",
    value: CompanyStatus.UNKNOWN,
    colorScheme: "gray",
    color: "gray.500",
  },
};

export const CompanyTypeConfig = {
  [CompanyType.EI]: {
    label: "Empresário Individual",
  },
  [CompanyType.MEI]: {
    label: "Microempreendedor Individual",
  },
  [CompanyType.EIRELI]: {
    label: "Empresa Individual de Responsabilidade Limitada",
  },
  [CompanyType.LTDA]: {
    label: "Sociedade Limitada",
  },
  [CompanyType.SS]: {
    label: "Sociedade Simples",
  },
  [CompanyType.SA]: {
    label: "Sociedade Anônima",
  },
  [CompanyType.ME]: {
    label: "Microempresa",
  },
  [CompanyType.EPP]: {
    label: "Empresa de Pequeno Porte",
  },
  [CompanyType.EMGP]: {
    label: "Empresa Média ou Grande Porte",
  },
  [CompanyType.COOP]: {
    label: "Cooperativa",
  },
  [CompanyType.DEMAIS]: {
    label: "Demais",
  },
};

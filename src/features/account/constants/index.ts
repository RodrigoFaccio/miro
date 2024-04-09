import { AccountFormValues } from "@/features/account/schemas/AccountFormSchema";
import { AccountStatus, DocumentTypes } from "@/features/account/types";
import { CompanyType } from "@/features/companies/types";
import { InfoIcon } from "@chakra-ui/icons";
import { BsClock, BsPatchCheckFill, BsPersonStanding } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { MdBlock, MdOutlineCancel, MdOutlineQueue } from "react-icons/md";

export const AccountStatusConfig = {
  [AccountStatus.NEW]: {
    label: "Novo",
    description:
      "Seu cadastro foi criado, mas ainda não foi enviado para análise.",
    value: AccountStatus.NEW,
    colorScheme: "blue",
    color: "blue.300",
    icon: InfoIcon,
  },
  [AccountStatus.PENDING]: {
    label: "Pendente",
    description: "Seu cadastro está aguardando análise.",
    value: AccountStatus.PENDING,
    colorScheme: "orange",
    color: "orange.300",
    icon: BsClock,
  },
  [AccountStatus.UNDER_REVIEW]: {
    label: "Em análise",
    description: "Seu cadastro está sendo analisado.",
    value: AccountStatus.UNDER_REVIEW,
    colorScheme: "orange",
    color: "orange.300",
    icon: BsPersonStanding,
  },
  [AccountStatus.WAITING_ANALYSIS]: {
    label: "Aguardando análise",
    description: "Seu cadastro está aguardando análise.",
    value: AccountStatus.WAITING_ANALYSIS,
    colorScheme: "orange",
    color: "orange.300",
    icon: FaClock,
  },
  [AccountStatus.WAITING_DOCUMENTS]: {
    label: "Aguardando documentos",
    description: "Seu cadastro está aguardando documentos.",
    value: AccountStatus.WAITING_DOCUMENTS,
    colorScheme: "blue",
    color: "blue.300",
    icon: IoDocument,
  },
  [AccountStatus.WAITING_CORRECTIONS]: {
    label: "Aguardando correções",
    description: "Seu cadastro está aguardando correções.",
    value: AccountStatus.WAITING_CORRECTIONS,
    colorScheme: "blue",
    color: "blue.300",
    icon: FaClock,
  },
  [AccountStatus.ACTIVE]: {
    label: "Ativo",
    description: "Seu cadastro foi aprovado e está ativo.",
    value: AccountStatus.ACTIVE,
    colorScheme: "green",
    color: "green.400",
    icon: BsPatchCheckFill,
  },
  [AccountStatus.DENIED]: {
    label: "Negado",
    description:
      "Seu cadastro foi negado. Entre em contato com o nosso suporte para mais informações.",
    value: AccountStatus.DENIED,
    colorScheme: "red",
    color: "red.300",
    icon: MdBlock,
  },
  [AccountStatus.FAILED]: {
    label: "Falhou",
    description:
      "Seu cadastro falhou. Entre em contato com o nosso suporte para mais informações.",
    value: AccountStatus.FAILED,
    colorScheme: "red",
    color: "red.300",
    icon: MdOutlineCancel,
  },
  [AccountStatus.CANCELED]: {
    label: "Cancelado",
    description:
      "Seu cadastro foi cancelado. Entre em contato com o nosso suporte para mais informações.",
    value: AccountStatus.CANCELED,
    colorScheme: "red",
    color: "red.300",
    icon: MdOutlineCancel,
  },
  [AccountStatus.SUSPENDED]: {
    label: "Suspenso",
    description:
      "Seu cadastro foi suspenso. Entre em contato com o nosso suporte para mais informações.",
    value: AccountStatus.SUSPENDED,
    colorScheme: "red",
    color: "red.300",
    icon: MdOutlineCancel,
  },
  [AccountStatus.QUEUED]: {
    label: "Em fila",
    description: "Seu cadastro está em fila de análise.",
    value: AccountStatus.QUEUED,
    colorScheme: "blue",
    color: "blue.300",
    icon: MdOutlineQueue,
  },
  [AccountStatus.BLOCKED]: {
    label: "Bloqueado",
    description:
      "Seu cadastro foi bloqueado. Entre em contato com o nosso suporte para mais informações.",
    value: AccountStatus.BLOCKED,
    colorScheme: "red",
    color: "red.300",
    icon: MdBlock,
  },
};

export const AccountFormDefaultValues: AccountFormValues = {
  cnpj: "",
  companyLegalName: "",
  commercialName: "",
  companyMainCnae: "",
  companyCreatedDate: new Date(),
  companyType: CompanyType.LTDA,
  companyLegalNature: "",
  averageRevenue: 0,
  address: {
    city: "",
    neighborhood: "",
    number: "",
    state: "",
    street: "",
    zipcode: "",
    complement: "",
  },
  passwordBaas: "",
  partners: [],
  phone: "",
};

export const DocumentTypesConfig = {
  [DocumentTypes.DRIVER_LICENSE_FRONT]: {
    label: "CNH Frente",
  },
  [DocumentTypes.DRIVER_LICENSE_VERSE]: {
    label: "CNH Verso",
  },
  [DocumentTypes.IDENTITY_CARD_FRONT]: {
    label: "RG Frente",
  },
  [DocumentTypes.IDENTITY_CARD_VERSE]: {
    label: "RG Verso",
  },
  [DocumentTypes.PASSPORT]: {
    label: "Passaporte",
  },
  [DocumentTypes.SELFIE]: {
    label: "Selfie",
  },
  [DocumentTypes.SIGNATURE_CARD]: {
    label: "Carteira de Assinatura",
  },
  [DocumentTypes.RNE_FRONT]: {
    label: "RNE Frente",
  },
  [DocumentTypes.RNE_VERSE]: {
    label: "RNE Verso",
  },
  [DocumentTypes.EMANCIPATION_STATEMENT]: {
    label: "Declaração de Emancipação",
  },
  [DocumentTypes.ARTICLES_OF_ASSOCIATION]: {
    label: "Contrato Social",
  },
  [DocumentTypes.CCMEI]: {
    label: "CCMEI",
  },
  [DocumentTypes.COMPANY_BYLAWS]: {
    label: "Estatuto Social",
  },
  [DocumentTypes.EI_REGISTRATION_REQUIREMENT]: {
    label: "Requerimento de Empresário Individual",
  },
  [DocumentTypes.LEGAL_STATEMENT]: {
    label: "Declaração de Firma Individual",
  },
  [DocumentTypes.REVENUES_RECEIPT]: {
    label: "Comprovante de Receita",
  },
  [DocumentTypes.DIGITAL_DRIVER_LICENSE]: {
    label: "CNH Digital",
  },
};

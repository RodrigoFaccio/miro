import AccountBankDetailsForm from "@/features/account/components/AccountBankDetailsForm";
import AccountDetailsForm from "@/features/account/components/AccountDetailsForm";
import AccountPartnersForm from "@/features/account/components/AccountPartnersForm";
import { AccountStatus } from "@/features/account/types";
import AddressEmbedForm from "@/features/address/components/AddressEmbedForm";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useToast } from "@chakra-ui/react";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type OnBoardContextType = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

const OnBoardSteps = {
  FirstStep: 0,
  CompanySettings: 1,
  CompanyAddress: 2,
  PartnerDetails: 3,
  CompanyBankDetails: 4,
  LastStep: 5,
};

const OnBoardStepsConfig: Record<
  number,
  {
    icon: string;
    title: string;
    description: string;
    Component: React.FC | null;
    canGoBack: boolean;
    canGoNext: boolean;
    fields: string[];
  }
> = {
  [OnBoardSteps.FirstStep]: {
    icon: "👋",
    title: "Bem-vindo!",
    description:
      "Configure sua conta agora e aproveite uma experiência personalizada e conveniente.",
    Component: null,
    canGoBack: false,
    canGoNext: true,
    fields: [],
  },
  [OnBoardSteps.CompanySettings]: {
    icon: "🏢",
    title: "Informações da empresa",
    description: "Preencha as informações da sua empresa.",
    Component: AccountDetailsForm,
    canGoBack: false,
    canGoNext: true,
    fields: [
      "cnpj",
      "commercialName",
      "companyLegalName",
      "companyLegalNature",
      "companyCreatedDate",
      "companyType",
      "companyMainCnae",
      "averageRevenue",
      "phone",
    ],
  },
  [OnBoardSteps.CompanyAddress]: {
    icon: "📍",
    title: "Endereço da empresa",
    description: "Preencha o endereço da sua empresa.",
    Component: AddressEmbedForm,
    canGoBack: true,
    canGoNext: true,
    fields: ["address"],
  },
  [OnBoardSteps.PartnerDetails]: {
    icon: "🤝",
    title: "Informações dos sócios",
    description: "Preencha as informações dos sócios da sua empresa.",
    Component: AccountPartnersForm,
    canGoBack: true,
    canGoNext: true,
    fields: ["partners"],
  },
  [OnBoardSteps.CompanyBankDetails]: {
    icon: "💰",
    title: "Dados bancários",
    description: "Preencha o PIN de saque.",
    Component: AccountBankDetailsForm,
    canGoBack: true,
    canGoNext: true,
    fields: ["passwordBaas"],
  },
  [OnBoardSteps.LastStep]: {
    icon: "🎉",
    title: "Pronto!",
    description: "Agora clique em Salvar e aguarde a aprovação da sua conta.",
    Component: null,
    canGoBack: true,
    canGoNext: false,
    fields: [],
  },
};

const OnBoardContext = createContext<OnBoardContextType>({
  activeStep: 0,
  setActiveStep: () => {},
});

const OnBoardProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(OnBoardSteps.FirstStep);

  const { account } = useAuth();

  const toast = useToast();

  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
    }),
    [activeStep, setActiveStep]
  );

  useEffect(() => {
    if (
      account?.status === AccountStatus.WAITING_DOCUMENTS &&
      !toast.isActive("account-waiting-documents")
    ) {
      toast({
        title: "Seu cadastro está aguardando documentos.",
        status: "info",
        id: "account-waiting-documents",
      });
    }
  }, [account?.status, toast]);

  return (
    <OnBoardContext.Provider value={value}>{children}</OnBoardContext.Provider>
  );
};

const useOnBoard = () => {
  const context = useContext(OnBoardContext);

  if (context === undefined) {
    throw new Error("useOnBoard must be used within a OnBoardProvider");
  }

  return context;
};

export {
  OnBoardContext,
  OnBoardProvider,
  OnBoardSteps,
  OnBoardStepsConfig,
  useOnBoard,
};

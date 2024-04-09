import {
  CompanySettingsActionType,
  CompanySettingsContext,
} from "@/features/companies/contexts/CompanySettingsContext";
import { loginAsCompany } from "@/features/companies/services";
import {
  Company,
  CompanyStatus,
  ReadCompanyData,
} from "@/features/companies/types";
import {
  Button,
  ButtonProps,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  useToken,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { IconType } from "react-icons";
import { BsBank } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { RiInformationLine } from "react-icons/ri";

import {
  MdAccountBalanceWallet,
  MdBlock,
  MdCheckCircle,
  MdReceipt,
} from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

type Props = {
  company: Company | ReadCompanyData;
};

const CompanySettings: React.FC<Props> = ({ company }) => {
  const toast = useToast();
  const navigate = useNavigate()

  const { open } = useContext(CompanySettingsContext);

  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationFn: () => loginAsCompany(company.id as number),
    onSuccess: ({ url }) => {
      window.open(url, "_blank");
    },
    onError: () => {
      toast({
        description: "Ocorreu um erro ao fazer login na empresa",
        status: "error",
      });
    },
  });

  const handleRoute = () => {
    navigate(`/company/${company.id}`);
  }
  return (
    <Stack spacing={4}>
      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
        }}
        spacing={2}
      >
        <CardAction
          onClick={() => open(CompanySettingsActionType.EDIT_FEES, company)}
          icon={MdReceipt}
          label="Alterar Taxas"
        />
        <CardAction
          onClick={() =>
            open(CompanySettingsActionType.EDIT_PERMISSIONS, company)
          }
          icon={RiSecurePaymentFill}
          label="Alterar Permissões"
        />
        <CardAction
          onClick={() =>
            handleRoute()
          }
          icon={RiInformationLine}
          label="Informações adicionais"
        />
        <CardAction
          onClick={() =>
            open(CompanySettingsActionType.CUSTOM_ACQUIRER, company)
          }
          icon={BsBank}
          label="Adquirentes Customizadas"
        />
        <CardAction
          onClick={() =>
            open(CompanySettingsActionType.CUSTOM_RESERVE, company)
          }
          icon={MdAccountBalanceWallet}
          label="Reservas Customizadas"
        />
        <CardAction
          onClick={() => login()}
          icon={FaSignInAlt}
          isLoading={isLoginPending}
          label="Fazer Login"
        />
        {company.status === CompanyStatus.BLOCKED ? (
          <CardAction
            onClick={() => open(CompanySettingsActionType.ACTIVATE, company)}
            icon={MdCheckCircle}
            label="Ativar"
          />
        ) : (
          <CardAction
            onClick={() => open(CompanySettingsActionType.BLOCK, company)}
            icon={MdBlock}
            label="Bloquear"
          />
        )}
      </SimpleGrid>
    </Stack>
  );
};

const CardAction: React.FC<
  {
    onClick: () => void;
    icon: IconType;
    label: string;
  } & ButtonProps
> = ({ onClick, icon, label, ...props }) => {
  const [bg] = useToken("colors", ["primary.300"]);

  return (
    <Button
      colorScheme="primary"
      variant="ghost"
      size="sm"
      onClick={onClick}
      bg={bg + "20"}
      {...props}
    >
      <HStack gap={3}>
        <Icon as={icon} fontSize={15} />
        <Text fontSize="xs">{label}</Text>
      </HStack>
    </Button>
  );
};

export default CompanySettings;

import BlockCompanyModal from "@/features/companies/modals/BlockCompanyModal";
import CompanyCustomAcquirersModal from "@/features/companies/modals/CompanyCustomAcquirersModal";
import CompanyFeesModal from "@/features/companies/modals/CompanyFeesModal";
import CompanyPermissionsModal from "@/features/companies/modals/CompanyPermissionsModal";
import CompanyReserveModal from "@/features/companies/modals/CompanyReserveModal";
import {
  Company,
  CompanyFeesScope,
  CompanyStatus,
  ReadCompanyData,
} from "@/features/companies/types";
import { Heading, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren, createContext, useState } from "react";

export enum CompanySettingsActionType {
  EDIT_FEES = "edit.fees",
  EDIT_PERMISSIONS = "edit.permissions",
  LOGIN_AS_COMPANY = "login.company",
  CUSTOM_ACQUIRER = "custom.acquirer",
  CUSTOM_RESERVE = "custom.reserve",
  BLOCK = "block",
  ACTIVATE = "activate",
}

type CompanySettingsContextData = {
  company?: Company | ReadCompanyData | null;
  open: (
    action: CompanySettingsActionType,
    company: Company | ReadCompanyData
  ) => void;
  close: () => void;
};

const CompanySettingsContext = createContext<CompanySettingsContextData>({
  company: null,
  open: () => {},
  close: () => {},
});

const CompanySettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [company, setCompany] = useState<Company | ReadCompanyData | null>(
    null
  );

  const [action, setAction] = useState<CompanySettingsActionType>(
    CompanySettingsActionType.EDIT_FEES
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const open = (
    action: CompanySettingsActionType,
    company: Company | ReadCompanyData
  ) => {
    setCompany(company);
    setAction(action);
    onOpen();
  };

  const close = () => {
    onClose();
  };

  return (
    <CompanySettingsContext.Provider value={{ company, open, close }}>
      {children}
      {action === CompanySettingsActionType.EDIT_FEES && (
        <CompanyFeesModal
          title={
            <Stack>
              <Heading size="md">Taxas da Empresa</Heading>
              <Text fontSize="sm" color="gray.500">
                {company?.companyLegalName}
              </Text>
            </Stack>
          }
          scope={CompanyFeesScope.COMPANY}
          id={company?.id as number}
          isOpen={isOpen && action === CompanySettingsActionType.EDIT_FEES}
          onClose={onClose}
        />
      )}
      {action === CompanySettingsActionType.EDIT_PERMISSIONS && (
        <CompanyPermissionsModal
          id={company?.id as number}
          isOpen={
            isOpen && action === CompanySettingsActionType.EDIT_PERMISSIONS
          }
          onClose={onClose}
        />
      )}
      {action === CompanySettingsActionType.CUSTOM_ACQUIRER && (
        <CompanyCustomAcquirersModal
          id={company?.id as number}
          isOpen={
            isOpen && action === CompanySettingsActionType.CUSTOM_ACQUIRER
          }
          onClose={onClose}
        />
      )}
      {action === CompanySettingsActionType.CUSTOM_RESERVE && (
        <CompanyReserveModal
          scope={CompanyFeesScope.COMPANY}
          id={company?.id as number}
          isOpen={isOpen && action === CompanySettingsActionType.CUSTOM_RESERVE}
          onClose={onClose}
        />
      )}
      <BlockCompanyModal
        id={company?.id as number}
        status={company?.status as CompanyStatus}
        isOpen={
          isOpen &&
          [
            CompanySettingsActionType.BLOCK,
            CompanySettingsActionType.ACTIVATE,
          ].includes(action)
        }
        onClose={onClose}
      />
    </CompanySettingsContext.Provider>
  );
};

export { CompanySettingsContext, CompanySettingsProvider };

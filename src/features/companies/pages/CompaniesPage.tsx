import PageContainer from "@/features/common/components/layout/PageContainer";
import CompaniesTable from "@/features/companies/components/CompaniesTable";
import CompanyFeesModal from "@/features/companies/modals/CompanyFeesModal";
import CompanyReserveModal from "@/features/companies/modals/CompanyReserveModal";
import { CompanyFeesScope } from "@/features/companies/types";
import { SettingsIcon } from "@chakra-ui/icons";
import { Button, HStack, LightMode, useDisclosure } from "@chakra-ui/react";

const CompaniesPage = () => {
  const {
    isOpen: isOpenDefaultFeeModal,
    onOpen: onOpenDefaultFeeModal,
    onClose: onCloseDefaultFeeModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDefaultReserveModal,
    onOpen: onOpenDefaultReserveModal,
    onClose: onCloseDefaultReserveModal,
  } = useDisclosure();

  return (
    <PageContainer
      title={
        <HStack justify="space-between" w="full">
          <span>Empresas</span>
          <LightMode>
            <HStack>
              <Button
                size="sm"
                colorScheme="primary"
                leftIcon={<SettingsIcon />}
                onClick={onOpenDefaultFeeModal}
              >
                Taxa Padrão
              </Button>
              <Button
                size="sm"
                colorScheme="primary"
                leftIcon={<SettingsIcon />}
                onClick={onOpenDefaultReserveModal}
              >
                Reserva Padrão
              </Button>
            </HStack>
          </LightMode>
        </HStack>
      }
      crumbs={[
        {
          href: "/companies",
          label: "Empresas",
        },
      ]}
    >
      <CompaniesTable />
      <CompanyFeesModal
        title="Taxas Padrões"
        scope={CompanyFeesScope.GLOBAL}
        isOpen={isOpenDefaultFeeModal}
        onClose={onCloseDefaultFeeModal}
      />
      <CompanyReserveModal
        scope={CompanyFeesScope.GLOBAL}
        isOpen={isOpenDefaultReserveModal}
        onClose={onCloseDefaultReserveModal}
      />
    </PageContainer>
  );
};

export default CompaniesPage;

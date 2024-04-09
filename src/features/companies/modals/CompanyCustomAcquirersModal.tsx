import CompanyCustomAcquirersForm from "@/features/companies/components/CompanyCustomAcquirersForm";
import { useCompanyData } from "@/features/companies/hooks/UseCompanyData";
import { updateCompanyCustomAcquirers } from "@/features/companies/services";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  CircularProgress,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";

type Props = {
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

const CompanyCustomAcquirersModal: React.FC<Props> = ({
  id,
  isOpen,
  onClose,
}) => {
  const toast = useToast();

  const { data: acquirers, status, refetch } = useCompanyData(id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adquirentes Customizados</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          {status === "pending" && (
            <Flex minH={350} align="center" justify="center">
              <CircularProgress color="primary.500" isIndeterminate />
            </Flex>
          )}
          {status === "error" && (
            <Alert status="error">
              <AlertIcon />
              Ocorreu um erro ao carregar os adquirentes
            </Alert>
          )}
          {status === "success" && acquirers && (
            <Stack gap={3}>
              <Alert status="info" rounded="md">
                <AlertIcon />
                <AlertDescription>
                  Selecione adquirentes customizadas para empresas específicas
                  da plataforma.
                </AlertDescription>
              </Alert>
              <CompanyCustomAcquirersForm
                defaultValues={{
                  creditCardAcquirer: acquirers.creditCardAcquirer?.id || null,
                  boletoAcquirer: acquirers.boletoAcquirer?.id || null,
                  pixAcquirer: acquirers.pixAcquirer?.id || null,
                }}
                onSubmit={(values) =>
                  updateCompanyCustomAcquirers(id as number, values)
                }
                onSuccess={() => {
                  refetch();
                  toast({
                    description: "Adquirentes customizados atualizados",
                    status: "success",
                    isClosable: true,
                  });
                  onClose();
                }}
                onError={() => {
                  toast({
                    description: "Ocorreu um erro ao atualizar os adquirentes",
                    status: "error",
                    isClosable: true,
                  });
                }}
              />
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CompanyCustomAcquirersModal;

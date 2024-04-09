import CompanyFeesForm from "@/features/companies/components/CompanyFeesForm";
import { useCompanyFees } from "@/features/companies/hooks/UseCompanyFees";
import { updateCompanyFees } from "@/features/companies/services";
import { CompanyFeesScope } from "@/features/companies/types";
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
  id?: number;
  title: string | React.ReactNode;
  scope: CompanyFeesScope;
  isOpen: boolean;
  onClose: () => void;
};

const CompanyFeesModal: React.FC<Props> = ({
  id,
  title,
  scope,
  isOpen,
  onClose,
}) => {
  const { data: fees, status, refetch } = useCompanyFees(scope, id);

  const toast = useToast();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
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
              Ocorreu um erro ao carregar as taxas
            </Alert>
          )}
          {status === "success" && fees && (
            <Stack gap={3}>
              <Alert status="info" rounded="md">
                <AlertIcon />
                <AlertDescription>
                  {scope === CompanyFeesScope.GLOBAL ? (
                    <>
                      Você está definindo as{" "}
                      <strong>
                        taxas padrões para todas as novas empresas que forem
                        criadas na plataforma
                      </strong>
                    </>
                  ) : (
                    <>
                      Essa é a{" "}
                      <strong>taxa final que a empresa irá pagar</strong>
                    </>
                  )}
                </AlertDescription>
              </Alert>
              <CompanyFeesForm
                defaultValues={fees}
                onSubmit={(values) =>
                  updateCompanyFees(
                    scope === CompanyFeesScope.GLOBAL ? null : (id as number),
                    values
                  )
                }
                onSuccess={() => {
                  refetch();
                  toast({
                    description: "Taxas atualizadas com sucesso",
                    status: "success",
                    isClosable: true,
                  });
                  onClose();
                }}
                onError={() => {
                  toast({
                    description: "Ocorreu um erro ao atualizar as taxas",
                    status: "error",
                    isClosable: true,
                  });
                }}
                onCancel={onClose}
              />
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CompanyFeesModal;

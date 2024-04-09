import CompanyReserveForm from "@/features/companies/components/CompanyReserveForm";
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
  scope: CompanyFeesScope;
  id?: number;
  isOpen: boolean;
  onClose: () => void;
};

const CompanyReserveModal: React.FC<Props> = ({
  scope,
  id,
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
        <ModalHeader>Reserva Financeira</ModalHeader>
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
                  Determine quanto será mantido de reserva financeira em cada
                  método e por quanto tempo.
                </AlertDescription>
              </Alert>
              <CompanyReserveForm
                defaultValues={{
                  pixReserve: fees.pixReserve,
                  pixReleaseReserve: fees.pixReleaseReserve,
                  creditCardReserve: fees.creditCardReserve,
                  creditCardReleaseReserve: fees.creditCardReleaseReserve,
                  ticketReserve: fees.ticketReserve,
                  ticketReleaseReserve: fees.ticketReleaseReserve,
                }}
                onSubmit={(values) =>
                  updateCompanyFees(
                    scope === CompanyFeesScope.GLOBAL ? null : (id as number),
                    values,
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

export default CompanyReserveModal;

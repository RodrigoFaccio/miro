import CompanyPermissionsForm from "@/features/companies/components/CompanyPermissionsForm";
import { useCompanyData } from "@/features/companies/hooks/UseCompanyData";
import { updateCompanyPermissions } from "@/features/companies/services";
import {
  Alert,
  AlertIcon,
  CircularProgress,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

const CompanyPermissionsModal: React.FC<Props> = ({ id, isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const { data: permissions, status } = useCompanyData(id);

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
        <ModalHeader>Permissões da Empresa</ModalHeader>
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
          {status === "success" && permissions && (
            <CompanyPermissionsForm
              defaultValues={{
                creditCard: permissions.creditCard,
                boleto: permissions.boleto,
                pix: permissions.pix,
                antecipationEnabled: permissions.antecipationEnabled,
                withdrawEnabled: permissions.withdrawEnabled,
              }}
              onSubmit={(values) =>
                updateCompanyPermissions(id as number, values)
              }
              onSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: ["company", { id }],
                });
                toast({
                  description: "Permissões atualizadas",
                  status: "success",
                  isClosable: true,
                });
                onClose();
              }}
              onError={() => {
                toast({
                  description: "Erro ao atualizar permissões",
                  status: "error",
                  isClosable: true,
                });
              }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CompanyPermissionsModal;

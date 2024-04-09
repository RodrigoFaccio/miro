import PixKeyForm from "@/features/financial/components/PixKeyForm";
import { createPixKey } from "@/features/financial/services";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

type CreatePixKeyModalProps = {
  open: boolean;
  onClose: () => void;
};

const CreatePixKeyModal: React.FC<CreatePixKeyModalProps> = ({
  open,
  onClose,
}) => {
  const toast = useToast();

  const queryClient = useQueryClient();

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={open}
      onClose={onClose}
      isCentered
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Criar Nova Chave PIX</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PixKeyForm
            onSubmit={createPixKey}
            onSuccess={(response) => {
              queryClient.invalidateQueries({ queryKey: ["pix-keys"] });
              toast({
                title: "Sucesso",
                description:
                  response.results.message || "Chave PIX criada com sucesso",
                status: "success",
              });
              onClose();
            }}
            onError={(error) => {
              toast({
                title: "Erro",
                description:
                  error.response?.data.results.message ||
                  "Erro ao criar chave PIX",
                status: "error",
              });
            }}
          />
        </ModalBody>
        <ModalFooter p={1}></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePixKeyModal;

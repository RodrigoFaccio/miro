import SendPixStepperForm from "@/features/financial/components/SendPixStepperForm";
import { sendPix } from "@/features/financial/services";
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

type SendPixModalProps = {
  open: boolean;
  onClose: () => void;
};

const SendPixModal: React.FC<SendPixModalProps> = ({ open, onClose }) => {
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
          <Text>Enviar PIX</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SendPixStepperForm
            onSubmit={sendPix}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["balance"] });
              queryClient.invalidateQueries({ queryKey: ["bank.extract"] });
              toast({
                title: "Sucesso",
                description: "PIX enviado com sucesso",
                status: "success",
              });
              onClose();
            }}
            onError={(error) => {
              toast({
                title: "Erro",
                description:
                  error.response?.data.message ||
                  "Erro ao enviar PIX. Tente novamente mais tarde",
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

export default SendPixModal;

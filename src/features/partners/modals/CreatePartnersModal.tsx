import PartnerForm from "@/features/partners/components/PartnerForm";
import { PartnerFormValues } from "@/features/partners/schemas/PartnerFormSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type CreatePartnerModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PartnerFormValues) => void;
};

const CreatePartnerModal: React.FC<CreatePartnerModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      blockScrollOnMount={false}
      returnFocusOnClose={false}
      isOpen={open}
      onClose={onClose}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Criar novo sócio</Text>
          <Text fontSize="sm" color="gray.500" fontWeight="light" mt={2}>
            Preencha os dados abaixo para criar um novo sócio.
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={0} overflowY="auto">
          <PartnerForm
            onSubmit={(values) => {
              return onSubmit(values);
            }}
            onClose={onClose}
          />
        </ModalBody>

        <ModalFooter p={1}></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePartnerModal;

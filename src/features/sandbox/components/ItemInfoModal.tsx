import { Item } from "@/features/sandbox/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

type Props = {
  item: Item | null;
  open: boolean;
  onClose: () => void;
};

const ItemInfoModal = ({ item, open, onClose }: Props) => {
  return (
    <Modal isOpen={open} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes do Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text fontSize="xl" fontWeight="bold">
              {item?.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {item?.description}
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ItemInfoModal;

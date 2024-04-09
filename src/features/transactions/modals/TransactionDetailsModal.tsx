import TransactionDetails from "@/features/transactions/components/TransactionDetails";
import { getTransaction } from "@/features/transactions/services";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

type TransactionDetailsModalProps = {
  id?: string | null;
  open: boolean;
  onClose: () => void;
};

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  id,
  open,
  onClose,
}) => {
  const {
    data: trasaction,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["transaction", { id }],
    queryFn: () => getTransaction(id as string),
    enabled: !!id,
    initialData: undefined,
  });

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
          <Text>Detalhes da transação</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isFetching && (
            <Progress
              size="xs"
              isIndeterminate
              colorScheme="primary"
              mb={3}
              rounded="md"
            />
          )}
          {isError && (
            <Alert variant={"left-accent"} status="error">
              <AlertIcon />
              <AlertDescription>Erro ao carregar transação</AlertDescription>
            </Alert>
          )}
          {trasaction && <TransactionDetails transaction={trasaction} />}
        </ModalBody>

        <ModalFooter p={1}></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailsModal;

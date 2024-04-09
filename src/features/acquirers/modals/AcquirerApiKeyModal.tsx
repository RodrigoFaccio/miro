import AcquirerApiKeyForm from "@/features/acquirers/components/AcquirerApiKeyForm";
import { useAcquirer } from "@/features/acquirers/hooks/UseAcquirer";
import { updateAcquirer } from "@/features/acquirers/services";
import {
  Alert,
  AlertIcon,
  Avatar,
  CircularProgress,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

type Props = {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
};

const AcquirerApiKeyModal: React.FC<Props> = ({ id, isOpen, onClose }) => {
  const { data: acquirer, status, refetch } = useAcquirer(id);

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
        <ModalHeader>
          <HStack gap={3}>
            <Avatar size="md" name={acquirer?.name} />
            <Stack>
              <Heading size="sm" noOfLines={1}>
                Chaves de API
              </Heading>
              <Text fontSize="xs" color="gray.500">
                {acquirer?.name || "Carregando..."}
              </Text>
            </Stack>
          </HStack>
        </ModalHeader>
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
              Ocorreu um erro ao carregar as chaves de API
            </Alert>
          )}
          {status === "success" && acquirer && (
            <AcquirerApiKeyForm
              fields={acquirer.fields}
              defaultValues={{ keys: acquirer.keys }}
              onSubmit={(values) => updateAcquirer(id as number, values)}
              onSuccess={() => {
                refetch();
                toast({
                  description: "Chaves de API atualizadas com sucesso",
                  status: "success",
                  isClosable: true,
                });
                onClose();
              }}
              onError={() => {
                toast({
                  description: "Ocorreu um erro ao atualizar as chaves de API",
                  status: "error",
                  isClosable: true,
                });
              }}
              onCancel={onClose}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AcquirerApiKeyModal;

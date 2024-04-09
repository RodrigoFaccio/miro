/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAcquirer } from "@/features/acquirers/hooks/UseAcquirer";
import { updateAcquirer } from "@/features/acquirers/services";
import CompanyFeesForm from "@/features/companies/components/CompanyFeesForm";
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

const AcquirerFeesModal: React.FC<Props> = ({ id, isOpen, onClose }) => {
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
                Taxas do Adquirente
              </Heading>
              <Text fontSize="xs" color="gray.500">
                {acquirer?.name}
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
              Ocorreu um erro ao carregar as taxas
            </Alert>
          )}
          {status === "success" && acquirer && (
            <CompanyFeesForm
            /* @ts-ignore */
              defaultValues={acquirer}
            /* @ts-ignore */
              onSubmit={(values ) => updateAcquirer(id as number, values)}
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
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AcquirerFeesModal;

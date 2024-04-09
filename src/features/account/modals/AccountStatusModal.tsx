import { AccountStatusConfig } from "@/features/account/constants";
import { AccountStatus } from "@/features/account/types";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

type AccountStatusModalProps = {
  open?: boolean;
  status: AccountStatus;
};

const AccountStatusModal: React.FC<AccountStatusModalProps> = ({
  open = true,
  status = AccountStatus.FAILED,
}) => {
  const { revoke } = useAuth();

  return (
    <Modal
      blockScrollOnMount={false}
      returnFocusOnClose={false}
      isOpen={open}
      onClose={() => {}}
      isCentered
      size="xl"
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="4px" />
      <ModalContent p={0} rounded="2xl" overflow="hidden">
        <ModalBody p={0}>
          <Alert
            variant="left-accent"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minHeight="300px"
            rounded="xl"
            colorScheme={AccountStatusConfig[status].colorScheme}
            p={8}
          >
            <Icon
              as={AccountStatusConfig[status].icon}
              boxSize={120}
              mb={3}
              color={AccountStatusConfig[status].color}
            />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {AccountStatusConfig[status].label}
            </AlertTitle>
            <AlertDescription maxWidth="sm" my={2}>
              {AccountStatusConfig[status].description}
            </AlertDescription>
            <Flex justifyContent="center" mt={4}>
              <Button
                minW={100}
                colorScheme={AccountStatusConfig[status].colorScheme}
                onClick={() => revoke()}
              >
                Sair
              </Button>
            </Flex>
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AccountStatusModal;

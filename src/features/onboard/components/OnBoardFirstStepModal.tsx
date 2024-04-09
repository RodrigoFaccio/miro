import {
  OnBoardContext,
  OnBoardSteps,
} from "@/features/onboard/contexts/OnBoardContext";
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FiArrowRight } from "react-icons/fi";

type OnBoardFirstStepModalProps = {
  open: boolean;
  onClose: () => void;
};

const OnBoardFirstStepModal: React.FC<OnBoardFirstStepModalProps> = ({
  open,
  onClose,
}) => {
  const { setActiveStep } = useContext(OnBoardContext);

  return (
    <Modal
      colorScheme="primary"
      isOpen={open}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
    >
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="4px" />
      <ModalContent
        bg={useColorModeValue("gray.100", "gray.800")}
        rounded="xl"
        borderLeft="5px solid"
        borderColor="primary.500"
      >
        <ModalHeader>🚀 Explore nosso mundo!</ModalHeader>
        <ModalBody>
          <Text>
            Configure sua conta agora e aproveite uma experiência personalizada
            e conveniente.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="primary"
            ml={3}
            rightIcon={<Icon as={FiArrowRight} />}
            onClick={() => {
              onClose();
              setActiveStep(OnBoardSteps.CompanySettings);
            }}
          >
            Começar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OnBoardFirstStepModal;

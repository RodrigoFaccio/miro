import WithdrawalDetails from "@/features/withdrawals/components/WithdrawalDetails";
import { Withdrawal } from "@/features/withdrawals/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  withdrawal: Withdrawal | null;
  open: boolean;
  onClose: () => void;
};

const WithdrawalDetailsModal: React.FC<Props> = ({
  withdrawal,
  open,
  onClose,
}) => {
  console.log(withdrawal)
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      isCentered
      size="xl"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes do Saque</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          {withdrawal && <WithdrawalDetails withdrawal={withdrawal} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawalDetailsModal;

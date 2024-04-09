import { CompanyStatus } from "@/features/companies/types";
import { answerGatewayRequest } from "@/features/gateway-requests/services";
import { GatewayRequest } from "@/features/gateway-requests/types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef } from "react";

export enum GatewayRequestAnswerAction {
  APPROVE = "approve",
  REJECT = "reject",
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  request: GatewayRequest;
  action: GatewayRequestAnswerAction;
};

const config = {
  [GatewayRequestAnswerAction.APPROVE]: {
    title: "Aprovar Solicitação",
    message: "Deseja aprovar a solicitação?",
    status: CompanyStatus.APPROVED,
  },
  [GatewayRequestAnswerAction.REJECT]: {
    title: "Rejeitar Solicitação",
    message: "Deseja rejeitar a solicitação?",
    status: CompanyStatus.REJECTED,
  },
};

const GatewayRequestAnswerModal: React.FC<Props> = ({
  request,
  action,
  onClose,
  onSuccess,
  open,
}) => {
  const { title, message } = config[action];

  const queryClient = useQueryClient();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => answerGatewayRequest(request.id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gateway-requests"] });
      toast({
        title: "Solicitação alterada com sucesso",
        status: "success",
      });
      onClose();
      onSuccess();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title:
          error.response?.data.message ||
          "Ocorreu um erro ao alterar a solicitação",
        status: "error",
      });
      onClose();
    },
  });

  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="gray">
              Cancelar
            </Button>
            <Button onClick={() => mutateAsync()} ml={3} isLoading={isPending}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default GatewayRequestAnswerModal;

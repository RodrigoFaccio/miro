import { updateCompanyStatus } from "@/features/companies/services";
import { CompanyStatus } from "@/features/companies/types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { MdBlock, MdCheckCircle } from "react-icons/md";

type Props = {
  id: number;
  status: CompanyStatus;
  isOpen: boolean;
  onClose: () => void;
};

const Action = {
  BLOCK: {
    label: "Bloquear",
    confirmation: "Tem certeza que deseja bloquear a empresa?",
    success: "Empresa bloqueada com sucesso",
    error: "Erro ao bloquear empresa",
    icon: MdBlock,
    color: "red",
    status: CompanyStatus.BLOCKED,
  },
  ACTIVATE: {
    label: "Ativar",
    confirmation: "Tem certeza que deseja ativar a empresa?",
    success: "Empresa ativada com sucesso",
    error: "Erro ao ativar empresa",
    icon: MdCheckCircle,
    color: "green",
    status: CompanyStatus.APPROVED,
  },
};

const BlockCompanyModal: React.FC<Props> = ({
  id,
  status,
  isOpen,
  onClose,
}) => {
  const action =
    status === CompanyStatus.BLOCKED ? Action.ACTIVATE : Action.BLOCK;

  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => updateCompanyStatus(id as number, action.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", { id }] });
      toast({
        title: "Sucesso",
        description: action.success,
        status: "success",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: action.error,
        status: "error",
      });
    },
  });

  return (
    <AlertDialog
      leastDestructiveRef={useRef(null)}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{action.label} empresa</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{action.confirmation}</AlertDialogBody>
        <AlertDialogFooter justifyContent="center">
          <Button
            colorScheme={action.color}
            onClick={() => mutateAsync()}
            leftIcon={<Icon as={action.icon} />}
            px={8}
            isLoading={isPending}
          >
            {action.label}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BlockCompanyModal;

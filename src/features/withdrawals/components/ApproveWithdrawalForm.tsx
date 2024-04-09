import FormCheckbox from "@/features/common/components/form/FormCheckbox";
import FormPinInput from "@/features/common/components/form/FormPinInput";
import WithdrawalAnswerSchema, {
  ApproveWithdrawalFormValues,
} from "@/features/withdrawals/schemas/ApproveWithdrawalSchema";
import { Withdrawal, WithdrawalType } from "@/features/withdrawals/types";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";

type Props = {
  withdrawal: Withdrawal;
  onSubmit: (values: ApproveWithdrawalFormValues) => Promise<void>;
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
};

const ApproveWithdrawalForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  onSuccess,
  onError,
  withdrawal,
}) => {
  const pinRequired = withdrawal.type === WithdrawalType.DEFAULT;

  const form = useForm<ApproveWithdrawalFormValues>({
    context: { pinRequired },
    resolver: yupResolver(WithdrawalAnswerSchema),
    defaultValues: {
      manual: false,
      pin: "",
    },
  });

  const manual = useWatch({ control: form.control, name: "manual" });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onSubmit,
    onError,
    onSuccess,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <Stack gap={5} my={2}>
          <Text fontSize="sm">Deseja confirmar a solicitação de saque?</Text>
          {pinRequired && !manual && (
            <FormPinInput
              autoFocus
              name="pin"
              label="PIN"
              placeholder="-"
              size="sm"
            />
          )}
          <FormCheckbox name="manual" label="Saque manual" />
          <HStack justify="flex-end">
            <Button
              type="button"
              colorScheme="gray"
              onClick={() => onCancel()}
              size="xs"
            >
              Cancelar
            </Button>
            <Button
              colorScheme="green"
              isLoading={isPending}
              type="submit"
              size="xs"
            >
              Confirmar
            </Button>
          </HStack>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default ApproveWithdrawalForm;

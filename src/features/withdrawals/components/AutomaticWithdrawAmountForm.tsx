import FormCurrencyInput from "@/features/common/components/form/FormCurrencyInput";
import AutomaticWithdrawalAmountFormSchema, {
  AutomaticWithdrawalAmountFormValues,
} from "@/features/withdrawals/schemas/AutomaticWithdrawalAmountSchema";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  defaultValues?: AutomaticWithdrawalAmountFormValues;
  onSubmit: (values: AutomaticWithdrawalAmountFormValues) => Promise<void>;
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
};

const AutomaticWithdrawalAmountForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  onSuccess,
  onError,
  defaultValues,
}) => {
  const form = useForm<AutomaticWithdrawalAmountFormValues>({
    resolver: yupResolver(AutomaticWithdrawalAmountFormSchema),
    defaultValues,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onSubmit,
    onError,
    onSuccess,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <Stack gap={5} my={2}>
          <FormCurrencyInput
            autoFocus
            name="amount"
            label="Valor mínimo para saque"
            placeholder="0,00"
            hideSymbol={false}
          />

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
              variant="solid"
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

export default AutomaticWithdrawalAmountForm;

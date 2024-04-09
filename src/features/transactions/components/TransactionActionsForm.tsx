import FormCheckbox from "@/features/common/components/form/FormCheckbox";
import FormCurrencyInput from "@/features/common/components/form/FormCurrencyInput";
import FormSelectInput from "@/features/common/components/form/FormSelectInput";
import TransactionActionsFormSchema, {
  TransactionAction,
  TransactionActionsFormValues,
} from "@/features/transactions/schemas/TransactionActionsFormSchema";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";

type Props = {
  onSubmit: (values: TransactionActionsFormValues) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
};

const TransactionActionsForm: React.FC<Props> = ({
  onSubmit,
  onSuccess,
  onError,
}) => {
  const form = useForm<TransactionActionsFormValues>({
    resolver: yupResolver(TransactionActionsFormSchema),
    defaultValues: {
      action: TransactionAction.REFUND,
      fine: 0,
      hasFine: false,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onSubmit,
    onError,
    onSuccess,
  });

  const action = useWatch({ control: form.control, name: "action" });

  const hasFine = useWatch({ control: form.control, name: "hasFine" });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <Stack gap={5}>
          <FormSelectInput
            name="action"
            label=""
            options={[
              { value: TransactionAction.REFUND, label: "Estornar" },
              { value: TransactionAction.CHARGEBACK, label: "Chargeback" },
              {
                value: TransactionAction.PRECHARGEBACK,
                label: "Prechargeback",
              },
            ]}
            isDisabled={isPending}
          />
          {action === TransactionAction.CHARGEBACK && (
            <>
              <FormCheckbox
                name="hasFine"
                label="Multa personalizada"
                isDisabled={isPending}
              />
              {hasFine && (
                <FormCurrencyInput
                  name="fine"
                  label="Valor da multa"
                  isDisabled={isPending}
                />
              )}
            </>
          )}
          <HStack justify="flex-end">
            <Button colorScheme="green" isLoading={isPending} type="submit">
              Salvar
            </Button>
          </HStack>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default TransactionActionsForm;

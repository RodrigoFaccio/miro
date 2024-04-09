import AcquirerApiKeyFormSchema, {
  AcquirerApiKeyFormValues,
} from "@/features/acquirers/schemas/AcquirerApiKeyFormSchema";
import { Acquirer } from "@/features/acquirers/types";
import FormSecretInput from "@/features/common/components/form/FormSecretInput";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  fields: Acquirer["fields"];
  defaultValues: AcquirerApiKeyFormValues;
  onSubmit: (values: AcquirerApiKeyFormValues) => Promise<void>;
  onCancel: () => void;
  onSuccess: () => void;
  onError: (error: AxiosError<{ message: string }>) => void;
};

const AcquirerApiKeyForm: React.FC<Props> = ({
  fields,
  defaultValues,
  onSubmit,
  onCancel,
  onSuccess,
  onError,
}) => {
  const form = useForm<AcquirerApiKeyFormValues>({
    context: { fields },
    resolver: yupResolver(AcquirerApiKeyFormSchema),
    defaultValues,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess,
    onError,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <Stack gap={3}>
          {fields.map(({ id, name }) => (
            <FormSecretInput key={id} name={`keys.${id}`} label={name} />
          ))}
          <HStack justify="flex-end" mt={4}>
            <Button colorScheme="gray" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={isPending} colorScheme="primary">
              Salvar
            </Button>
          </HStack>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default AcquirerApiKeyForm;

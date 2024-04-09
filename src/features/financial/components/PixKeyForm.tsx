import FormInput from "@/features/common/components/form/FormInput";
import FormRadioGroup from "@/features/common/components/form/FormRadioGroup";
import { PixKeyTypeConfig } from "@/features/financial/constants";
import CreatePixKeyFormSchema, {
  CreatePixKeyFormValues,
} from "@/features/financial/schemas/CreatePixKeySchema";
import { sendConfirmationCode } from "@/features/financial/services";
import { CreatePixKeyResponse, PixKeyType } from "@/features/financial/types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

type PixKeyFormProps = {
  onSubmit: (payload: CreatePixKeyFormValues) => Promise<CreatePixKeyResponse>;
  onSuccess?: (response: CreatePixKeyResponse) => void;
  onError?: (error: AxiosError<CreatePixKeyResponse>) => void;
};

const PixKeyForm: React.FC<PixKeyFormProps> = ({
  onSubmit,
  onSuccess,
  onError,
}) => {
  const toast = useToast();

  const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);

  const form = useForm<CreatePixKeyFormValues>({
    resolver: yupResolver(CreatePixKeyFormSchema),
    defaultValues: {
      type: PixKeyType.NATIONAL_REGISTRATION,
      code: "",
    },
  });

  const type = useWatch({
    control: form.control,
    name: "type",
  });

  const needsConfirmationCode = [
    PixKeyType.EMAIL,
    PixKeyType.PHONE_NUMBER,
  ].includes(type);

  const { mutateAsync: createPixKey, isPending: isCreatingPixKey } =
    useMutation({
      mutationFn: onSubmit,
      onSuccess,
      onError,
    });

  const {
    mutateAsync: sendConfirmationCodeMutation,
    isPending: isSendingConfirmationCode,
  } = useMutation({
    mutationFn: sendConfirmationCode,
    onSuccess: () => {
      toast({
        title: "Um código de confirmação foi enviado para você",
        status: "info",
      });
      setConfirmationCodeSent(true);
    },
    onError: () => {
      toast({
        title: "Erro ao enviar código de confirmação",
        status: "error",
      });
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => createPixKey(values))}>
        <Stack gap={5} shouldWrapChildren>
          <Alert status="info" rounded="md">
            <AlertIcon />
            <AlertDescription>
              Seleciona o tipo de chave PIX que deseja cadastrar
            </AlertDescription>
          </Alert>
          <FormRadioGroup
            name="type"
            isDisabled={confirmationCodeSent}
            orientation="vertical"
            options={[
              {
                label: PixKeyTypeConfig.nationalRegistration.label,
                value: PixKeyType.NATIONAL_REGISTRATION,
              },
              {
                label: PixKeyTypeConfig.email.label,
                value: PixKeyType.EMAIL,
              },
              {
                label: PixKeyTypeConfig.phoneNumber.label,
                value: PixKeyType.PHONE_NUMBER,
              },
            ]}
          />
          {needsConfirmationCode && !confirmationCodeSent && (
            <Button
              colorScheme="primary"
              onClick={() => {
                sendConfirmationCodeMutation(type);
              }}
              isLoading={isSendingConfirmationCode}
            >
              Enviar código de confirmação
            </Button>
          )}
          {confirmationCodeSent && needsConfirmationCode && (
            <FormInput
              label="Código de confirmação"
              placeholder="Digite o código de confirmação"
              name="code"
              isDisabled={isCreatingPixKey}
            />
          )}
          {(confirmationCodeSent || !needsConfirmationCode) && (
            <Button
              type="submit"
              colorScheme="primary"
              isLoading={isCreatingPixKey}
            >
              Cadastrar chave PIX
            </Button>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default PixKeyForm;

import ChangePasswordFormSchema, {
  ChangePasswordFormValues,
} from "@/features/account/schemas/ChangePasswordSchema";
import { changePassword } from "@/features/account/services";
import FormInput from "@/features/common/components/form/FormInput";
import { setFormErrors } from "@/features/common/utils/errors";
import {
  Button,
  Card,
  CardBody,
  HStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

const ChangePasswordForm: React.FC = () => {
  const toast = useToast();

  const form = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(ChangePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      toast({
        title: "Erro!",
        description: setFormErrors(form, error).message,
        status: "error",
      });
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Senha alterada com sucesso!",
        status: "success",
      });
    },
  });

  return (
    <Card variant="outlined">
      <CardBody>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
            <Stack spacing={4}>
              <FormInput
                type="password"
                name="currentPassword"
                label="Senha atual"
              />
              <FormInput
                type="password"
                name="newPassword"
                label="Nova senha"
              />
              <FormInput
                type="password"
                name="confirmNewPassword"
                label="Confirme a nova senha"
              />
              <HStack justify="flex-end">
                <Button
                  type="submit"
                  colorScheme="primary"
                  isLoading={isPending}
                >
                  Alterar senha
                </Button>
              </HStack>
            </Stack>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
};

export default ChangePasswordForm;

import NewPasswordFormSchema, {
  NewPasswordFormValues,
} from "@/features/auth/schemas/NewPasswordFormSchema";
import { newPassword } from "@/features/auth/services";
import FormInput from "@/features/common/components/form/FormInput";
import FormPinInput from "@/features/common/components/form/FormPinInput";
import { getErrorBag } from "@/features/common/utils/errors";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Icon,
  LightMode,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { BsSendFill } from "react-icons/bs";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const NewPasswordForm = () => {
  const navigate = useNavigate();

  const form = useForm<NewPasswordFormValues>({
    resolver: yupResolver(NewPasswordFormSchema),
    defaultValues: {
      token: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const toast = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: newPassword,
    onSuccess: () => {
      toast({
        title: "Senha redefinida com sucesso",
        status: "success",
      });

      navigate("/auth/login");
    },
    onError: (error: Error) => {
      toast({
        title: getErrorBag(error).message,
        status: "error",
      });
    },
  });

  return (
    <Box w={320} maxW="100%">
      <Stack mb={6}>
        <Icon
          as={BsSendFill}
          color="primary.500"
          fontSize="6xl"
          mx="auto"
          mb={4}
        />
        <Text
          fontSize="3xl"
          fontFamily="monospace"
          fontWeight="bold"
          textAlign="center"
        >
          Redefinir senha
        </Text>
        <Text
          fontSize="md"
          fontWeight="light"
          textAlign="center"
          color="gray.500"
        >
          Enviamos um código de verificação para o seu email. Digite o código e
          escolha uma nova senha
        </Text>
      </Stack>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <Stack spacing={4}>
            <FormPinInput
              name="token"
              label=""
              placeholder="-"
              size="lg"
              autoFocus
              digits={6}
            />
            <FormInput
              name="password"
              label="Senha"
              type="password"
              placeholder="Digite sua nova senha"
            />
            <FormInput
              name="passwordConfirmation"
              label="Confirme a senha"
              type="password"
              placeholder="Confirme sua nova senha"
            />
            <LightMode>
              <Button w={"full"} type="submit" isLoading={isPending} mt={3}>
                Atualizar senha
              </Button>
            </LightMode>
            <Link
              as={RouterLink}
              to="/auth/login"
              color="primary.500"
              textAlign="center"
              fontSize="sm"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon mr="2" fontSize="sm" as={ChevronLeftIcon} />
              Voltar para o login
            </Link>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default NewPasswordForm;

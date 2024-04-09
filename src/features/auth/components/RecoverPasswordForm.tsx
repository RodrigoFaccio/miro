import RecoverPasswordFormSchema, {
  RecoverPasswordFormValues,
} from "@/features/auth/schemas/RecoverPasswordFormSchema";
import { sendRecoveryEmail } from "@/features/auth/services";
import FormInput from "@/features/common/components/form/FormInput";
import { getErrorBag } from "@/features/common/utils/errors";
import { ChevronLeftIcon, LockIcon } from "@chakra-ui/icons";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";

const RecoverPasswordForm = () => {
  const navigate = useNavigate();

  const form = useForm<RecoverPasswordFormValues>({
    resolver: yupResolver(RecoverPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const toast = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendRecoveryEmail,
    onSuccess: () => {
      toast({
        title: "Um email foi enviado para você com as instruções",
        status: "success",
      });

      navigate("/auth/new-password");
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
          as={LockIcon}
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
          Esqueceu sua senha?
        </Text>
        <Text
          fontSize="md"
          fontWeight="light"
          textAlign="center"
          color="gray.500"
        >
          Digite o email associado à sua conta e enviaremos um link para você
          redefinir sua senha
        </Text>
      </Stack>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <Stack spacing={4}>
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Digite seu email"
            />
            <LightMode>
              <Button w={"full"} type="submit" isLoading={isPending} mt={3}>
                Enviar
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

export default RecoverPasswordForm;

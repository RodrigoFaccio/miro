import { AuthContext } from "@/features/auth/contexts/AuthContext";
import LoginFormSchema, {
  LoginFormValues,
} from "@/features/auth/schemas/LoginFormSchema";
import { login } from "@/features/auth/services";
import FormInput from "@/features/common/components/form/FormInput";
import {
  Box,
  Button,
  LightMode,
  Link,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
  const { authenticate } = useContext(AuthContext);

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toast = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ access, refresh }) => {
      toast({
        title: "Login efetuado com sucesso",
        status: "success",
      });

      authenticate(access, refresh);
    },
    onError: () => {
      toast({
        title: "Credenciais inválidas",
        status: "error",
      });
    },
  });

  return (
    <Box w={400} maxW="100%">
      <Stack mb={6}>
        <Text fontSize="3xl" fontFamily="monospace" fontWeight="bold">
          Entrar
        </Text>
        <Text fontSize="xs" fontFamily="monospace" fontWeight="light">
          Digite seu email e senha para entrar
        </Text>
      </Stack>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <Stack spacing={4}>
            <FormInput name="email" label="Email" type="email" />
            <FormInput name="password" label="Senha" type="password" />
            <Link
              as={RouterLink}
              to="/auth/recover-password"
              color="primary.500"
              fontWeight="semibold"
              textAlign="right"
              fontSize="sm"
              fontFamily="monospace"
            >
              Esqueceu a senha?
            </Link>
            <VStack alignItems="flex-start" spacing={3} mt={2}>
              <LightMode>
                <Button w={"100%"} type="submit" isLoading={isPending}>
                  Login
                </Button>
              </LightMode>
              <Text
                fontSize="xs"
                fontFamily="monospace"
                fontWeight="light"
                textAlign="center"
                w="full"
              >
                Não tem uma conta?
                <Link
                  as={RouterLink}
                  to="/auth/register"
                  color="primary.500"
                  fontWeight="semibold"
                  ml={1}
                >
                  Cadastre-se
                </Link>
              </Text>
            </VStack>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default LoginForm;

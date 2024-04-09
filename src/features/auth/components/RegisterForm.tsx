import { AuthContext } from "@/features/auth/contexts/AuthContext";
import RegisterFormSchema, {
  RegisterFormValues,
} from "@/features/auth/schemas/RegisterFormSchema";
import { register } from "@/features/auth/services";
import { RegisterUserPayload } from "@/features/auth/types";
import FormInput from "@/features/common/components/form/FormInput";
import { applyFieldErrors } from "@/features/common/utils/form";
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
import { AxiosError } from "axios";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

const RegisterForm = () => {
  const { authenticate } = useContext(AuthContext);

  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const toast = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: register,
    onSuccess: ({ access, refresh }: RegisterUserPayload) => {
      toast({
        title: "Tudo certo! Agora termine seu cadastro em nosso Onboarding",
        status: "success",
      });

      authenticate(access, refresh);
    },
    onError: (error: AxiosError) => {
      toast({
        title: "Erro ao efetuar registro",
        status: "error",
      });

      applyFieldErrors(error, form);
    },
  });

  return (
    <Box w={400} maxW="100%">
      <Stack mb={6}>
        <Text fontSize="3xl" fontFamily="monospace" fontWeight="bold">
          Cadastre-se
        </Text>
        <Text fontSize="xs" fontFamily="monospace" fontWeight="light">
          Digite seu email e senha para iniciar o seu cadastro
        </Text>
      </Stack>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <Stack spacing={4}>
            <FormInput name="email" label="Email" type="email" />
            <FormInput name="password" label="Senha" type="password" />
            <FormInput
              name="passwordConfirmation"
              label="Confirme a senha"
              type="password"
            />

            <VStack alignItems="flex-start" spacing={3} mt={2}>
              <LightMode>
                <Button w={"100%"} type="submit" isLoading={isPending}>
                  Registrar
                </Button>
              </LightMode>
              <Text
                w="full"
                fontSize="xs"
                fontFamily="monospace"
                fontWeight="light"
                textAlign="center"
              >
                Já tem uma conta?
                <Link
                  as={RouterLink}
                  to="/auth/login"
                  color="primary.500"
                  fontWeight="semibold"
                  ml={1}
                >
                  Entre
                </Link>
              </Text>
            </VStack>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default RegisterForm;

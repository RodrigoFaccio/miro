import FormCurrencyInput from "@/features/common/components/form/FormCurrencyInput";
import FormInput from "@/features/common/components/form/FormInput";
import SendPixFormSchema, {
  SendPixFormValues,
} from "@/features/financial/schemas/SendPixFormSchema";
import { getPixPayee } from "@/features/financial/services";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  HStack,
  InputRightAddon,
  PinInput,
  PinInputField,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import {
  Controller,
  FormProvider,
  UseFormReturn,
  useForm,
  useWatch,
} from "react-hook-form";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type Props = {
  onSubmit: (payload: SendPixFormValues) => Promise<unknown>;
  onSuccess: () => void;
  onError: (error: AxiosError<{ message: string }>) => void;
};

const defaultValues: SendPixFormValues = {
  amount: 0,
  pixKey: "",
  pin: "",
};

enum Steps {
  Amount = 0,
  PixKey = 1,
  Payee = 2,
  Pin = 3,
  Confirmation = 4,
}

const StepperConfig = {
  [Steps.Amount]: {
    title: "Valor",
    description: "Insira o valor do PIX",
    canContinue: (form: UseFormReturn<SendPixFormValues>): boolean => {
      return !form.formState.errors.amount;
    },
    canGoBack: () => false,
  },
  [Steps.PixKey]: {
    title: "Chave PIX",
    description: "Insira a chave PIX do beneficiário",
    canContinue: (form: UseFormReturn<SendPixFormValues>): boolean => {
      return !form.formState.errors.pixKey;
    },
    canGoBack: () => true,
  },
  [Steps.Payee]: {
    title: "Beneficiário",
    description: "Verifique as informações do beneficiário",
    canContinue: (
      _form: UseFormReturn<SendPixFormValues>,
      payeeStatus: "error" | "success" | "pending"
    ): boolean => {
      return payeeStatus === "success";
    },
    canGoBack: () => true,
  },
  [Steps.Pin]: {
    title: "PIN",
    description: "Insira o PIN de segurança",
    canContinue: (form: UseFormReturn<SendPixFormValues>): boolean => {
      return !form.formState.errors.pin;
    },
    canGoBack: () => true,
  },
  [Steps.Confirmation]: {
    title: "Confirmação",
    description: "Confirme os dados do PIX",
    canContinue: () => true,
    canGoBack: () => true,
  },
};

const SendPixStepperForm: React.FC<Props> = ({
  onSubmit,
  onSuccess,
  onError,
}) => {
  const { activeStep, setActiveStep, isActiveStep } = useSteps({
    index: Steps.Amount,
    count: Object.keys(Steps).length,
  });

  const form = useForm<SendPixFormValues>({
    resolver: yupResolver(SendPixFormSchema),
    defaultValues,
    mode: "onChange",
  });
console.log(form.watch('pin'))
  useEffect(() => {
    form.reset(defaultValues);
    setActiveStep(Steps.Amount);
  }, []);

  const pixKey = useWatch({ control: form.control, name: "pixKey" });

  const { data: payee, status: payeeStatus } = useQuery({
    queryKey: ["pix.payee", pixKey],
    queryFn: () => getPixPayee(pixKey),
    enabled: activeStep === Steps.Payee,
    initialData: undefined,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess,
    onError,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <Stack w="full">
          <Stepper
            size="lg"
            index={activeStep}
            orientation="vertical"
            w="full"
            colorScheme="primary"
          >
            {Object.values(StepperConfig).map((step, index) => (
              <Step key={index} as={Box} w="full">
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box w="full" pb={2}>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>

                  <Stack pt={5} w="full" gap={5} hidden={!isActiveStep(index)}>
                    {isActiveStep(Steps.Amount) && (
                      <Box w="full">
                         <FormCurrencyInput
                          name="amount"
                          label="Valor"
                          placeholder="0,00"
                          hideSymbol={false}
                        >
                        <InputRightAddon>$</InputRightAddon>
                      </FormCurrencyInput>
                      </Box>
                    )}
                    {isActiveStep(Steps.PixKey) && (
                      <Box w="full">
                        <FormInput
                          name="pixKey"
                          label="Chave pix"
                          placeholder=""
                          type="number"
                        />
                         
                      </Box>
                    )}
                    {isActiveStep(Steps.Payee) && (
                      <>
                        <Alert
                          status="loading"
                          rounded="md"
                          w="full"
                          hidden={payeeStatus !== "pending"}
                        >
                          <AlertIcon />
                          <AlertDescription>
                            Carregando informações do beneficiário
                          </AlertDescription>
                        </Alert>
                        <Alert
                          status="error"
                          rounded="md"
                          w="full"
                          hidden={payeeStatus !== "error"}
                        >
                          <AlertIcon />
                          <AlertDescription>
                            Ocorreu um erro ao carregar informações do
                            beneficiário
                          </AlertDescription>
                        </Alert>
                        <Box hidden={payeeStatus !== "success" || !payee}>
                          Payee data here (name - cpf, bank - agency - account)
                        </Box>
                      </>
                    )}
                    {isActiveStep(Steps.Pin) && (
                      <Box w="full">
                        <Controller
                          name="pin"
                          control={form.control}
                          defaultValue=""
                          render={({ field }) => (
                            <PinInput onChange={(e) => field.onChange(e)}>
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                            </PinInput>
                          )}
                        />
                                        
                      </Box>
                    )}
                    {isActiveStep(Steps.Confirmation) && (
                      <Box w="full">
                      
                       <Text fontSize="medium" fontWeight="600" >
                       Valor: {form.watch('amount').toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

                       </Text>
                       <Text fontSize="medium" fontWeight="600"  >
                       Destinatário: 
                       </Text>
                      </Box>
                    )}
                    {isActiveStep(index) && (
                      <HStack>
                        <Button
                          colorScheme="gray"
                          onClick={() => setActiveStep(activeStep - 1)}
                          leftIcon={<MdArrowBack />}
                          isDisabled={
                            !StepperConfig[activeStep as Steps].canGoBack()
                          }
                        >
                          Voltar
                        </Button>
                        <Button
                          colorScheme="primary"
                          onClick={() => {
                            form.trigger().then(() => {
                              if (
                                StepperConfig[activeStep as Steps].canContinue(
                                  form,
                                  payeeStatus
                                )
                              ) {
                                setActiveStep(activeStep + 1);
                              }
                            });
                          }}
                          rightIcon={<MdArrowForward />}
                          isDisabled={
                            !StepperConfig[activeStep as Steps].canContinue(
                              form,
                              payeeStatus
                            )
                          }
                          hidden={activeStep === Steps.Confirmation}
                        >
                          Continuar
                        </Button>
                        <Button
                          type="submit"
                          isLoading={isPending}
                          colorScheme="green"
                          hidden={activeStep !== Steps.Confirmation}
                        >
                          Enviar PIX
                        </Button>
                      </HStack>
                    )}
                  </Stack>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default SendPixStepperForm;

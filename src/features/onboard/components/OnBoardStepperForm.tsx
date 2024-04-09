import { AccountFormDefaultValues } from "@/features/account/constants";
import {
  AccountFormSchema,
  AccountFormValues,
} from "@/features/account/schemas/AccountFormSchema";
import {
  OnBoardContext,
  OnBoardSteps,
  OnBoardStepsConfig,
} from "@/features/onboard/contexts/OnBoardContext";
import { CheckIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Stack,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

type OnBoardStepperFormProps = {
  onSubmit: (values: AccountFormValues) => Promise<unknown>;
  submitting?: boolean;
  initialValues?: AccountFormValues;
};

const OnBoardStepperForm: React.FC<OnBoardStepperFormProps> = ({
  initialValues,
  onSubmit,
  submitting,
}) => {
  const toast = useToast();

  const form = useForm<AccountFormValues>({
    context: {
      onboard: true,
    },
    resolver: yupResolver(AccountFormSchema),
    defaultValues: {
      ...AccountFormDefaultValues,
      ...initialValues,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { activeStep, setActiveStep } = useContext(OnBoardContext);

  const stepErrors = Object.values(OnBoardStepsConfig).map((step) => {
    return Object.keys(form.formState.errors).some((error) =>
      step.fields.includes(error as never)
    );
  });

  const cardColor = useColorModeValue("gray.50", "transparent");

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () => {
          toast({
            title: "Atenção!",
            description: "Preencha todos os campos corretamente.",
            status: "error",
          });

          const firstStepWithError = stepErrors.findIndex((error) => error);

          if (firstStepWithError !== -1) {
            setActiveStep(firstStepWithError);
          }
        })}
      >
        <Stack mt={5} spacing={2}>
          <Stepper
            colorScheme="primary"
            index={activeStep}
            orientation="vertical"
          >
            {Object.values(OnBoardStepsConfig).map((step, index) => (
              <Step
                key={index}
                style={{
                  maxWidth: "100%",
                }}
              >
                <StepIndicator>
                  <StepStatus
                    complete={<CheckIcon />}
                    incomplete={step.icon}
                    active={step.icon}
                  />
                </StepIndicator>
                <Box position="relative" maxW="full" overflow="hidden">
                  <StepTitle>
                    {step.title}
                    {stepErrors[index] && <InfoIcon ml={2} color="red.300" />}
                  </StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                  {activeStep === index && (
                    <Stack
                      maxW="full"
                      bg={cardColor}
                      p={1}
                      rounded="lg"
                      mt={3}
                      spacing={5}
                    >
                      <Box
                        gap={3}
                        mb={5}
                        w={700}
                        maxW="full"
                        hidden={index === OnBoardSteps.LastStep}
                      >
                        {step.Component && <step.Component />}
                      </Box>
                      <HStack justifyContent="flex-start" spacing={3} w="full">
                        {step.canGoBack && (
                          <Button
                            variant="outline"
                            colorScheme="gray"
                            onClick={() => setActiveStep(activeStep - 1)}
                            isDisabled={!step.canGoBack || submitting}
                            size="sm"
                          >
                            Voltar
                          </Button>
                        )}
                        {step.canGoNext && (
                          <Button
                            variant="solid"
                            colorScheme="primary"
                            onClick={() => {
                              OnBoardStepsConfig[activeStep].fields.forEach(
                                (field) => {
                                  form.trigger(field as never);
                                }
                              );
                              setActiveStep(activeStep + 1);
                            }}
                            isDisabled={!step.canGoNext}
                            size="sm"
                          >
                            Avançar
                          </Button>
                        )}
                        {index === OnBoardSteps.LastStep && (
                          <Button
                            variant="solid"
                            colorScheme="primary"
                            type="submit"
                            size="sm"
                            isLoading={submitting}
                          >
                            Salvar e finalizar
                          </Button>
                        )}
                      </HStack>
                    </Stack>
                  )}
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

export default OnBoardStepperForm;

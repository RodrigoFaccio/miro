import AccountPartnerDocuments from "@/features/account/components/AccountPartnerDocuments";
import { DocumentTypesConfig } from "@/features/account/constants";
import {
  AccountDocumentsFormValues,
  AccountDocumentsSchema,
} from "@/features/account/schemas/AccountDocumentsFormSchema";
import { sendDocument } from "@/features/account/services";
import { AccountStatus, DocumentTypes } from "@/features/account/types";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosProgressEvent } from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

const AccountDocumentsForm: React.FC = () => {
  const toast = useToast();

  const { account, setStatus } = useAuth();

  const { activeStep, isActiveStep, goToPrevious, goToNext } = useSteps({
    index: 0,
    count: 2,
  });

  const [uploadState, setUploadState] = useState<{
    type: DocumentTypes;
    progress: number;
  } | null>({
    type: DocumentTypes.ARTICLES_OF_ASSOCIATION,
    progress: 0,
  });

  const form = useForm<AccountDocumentsFormValues>({
    resolver: yupResolver(AccountDocumentsSchema),
    defaultValues: {
      partners: [],
    },
  });

  const partners = useFieldArray({
    control: form.control,
    name: "partners",
  });

  useEffect(() => {
    const initialPartners: AccountDocumentsFormValues["partners"] = [
      {
        name: account?.commercialName || "Empresa",
        owner: true,
        documents: [],
      },
    ];

    account?.partners?.forEach?.((partner) => {
      initialPartners.push({
        id: partner.id,
        name: partner.name,
        owner: false,
        documents: [],
      });
    });

    form.reset({
      partners: initialPartners,
    });

    form.trigger("partners");
  }, [account]);

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: async ({ partners }: AccountDocumentsFormValues) => {
      for (const partner of partners || []) {
        const promises = (partner.documents || []).map(async (document) => {
          await sendDocument(
            document,
            partner.id || null,
            (event: AxiosProgressEvent) => {
              setUploadState({
                type: document.type,
                progress: Math.floor((event.loaded / (event.total || 0)) * 100),
              });
            }
          );
        });
        await Promise.all(promises);
      }
    },
    onSuccess: () => {
      toast({
        title: "Seus documentos foram enviados com sucesso",
        status: "success",
      });

      setStatus(AccountStatus.WAITING_ANALYSIS);
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      toast({
        title: error.response?.data?.detail || "Erro ao enviar seus documentos",
        status: "error",
      });
    },
  });

  const Actions = () => (
    <HStack>
      <Button
        colorScheme="gray"
        size="sm"
        isDisabled={isSuccess || activeStep === 0}
        onClick={() => {
          goToPrevious();
        }}
      >
        Voltar
      </Button>

      {activeStep === (partners.fields.length || 0) ? (
        <Button
          colorScheme="primary"
          type="submit"
          size="sm"
          isLoading={isPending}
          isDisabled={isSuccess}
        >
          Enviar documentos
        </Button>
      ) : (
        <Button
          colorScheme="primary"
          size="sm"
          isDisabled={isSuccess}
          onClick={() => {
            form.trigger(`partners.${activeStep}.documents`).then((isValid) => {
              if (isValid) {
                goToNext();
              }
            });
          }}
        >
          Próximo
        </Button>
      )}
    </HStack>
  );

  return (
    <Box overflow="auto" w="full">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data) => mutateAsync(data))}>
          <Stepper
            size="lg"
            index={activeStep}
            orientation="vertical"
            colorScheme="primary"
          >
            {partners.fields.map((partner, index) => (
              <Step key={index} as={Box} w="full">
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box w="full">
                  <StepTitle>{partner.name}</StepTitle>
                  <StepDescription>Documentos</StepDescription>

                  <Stack pt={5} gap={5} hidden={!isActiveStep(index)}>
                    <AccountPartnerDocuments index={index} />
                    <Actions />
                  </Stack>
                </Box>
              </Step>
            ))}
            <Step as={Box} w="full">
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box w="full">
                <StepTitle>Último etapa</StepTitle>
                <StepDescription>Enviar documentos</StepDescription>

                <Stack pt={5} gap={5} hidden={!isActiveStep(2)}>
                  {isPending && (
                    <Stack>
                      <Alert status="info" variant="subtle" rounded="md">
                        <AlertIcon />
                        <AlertTitle>Aguarde</AlertTitle>
                        <AlertDescription>
                          Isso pode levar alguns minutos
                        </AlertDescription>
                      </Alert>
                      <HStack>
                        <CircularProgress
                          value={uploadState?.progress || 0}
                          size="60px"
                        >
                          <CircularProgressLabel>
                            {uploadState?.progress || 0}%
                          </CircularProgressLabel>
                        </CircularProgress>
                        <Stack gap={1}>
                          <Text fontWeight="bold" fontSize="sm">
                            Enviando Documento
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {
                              DocumentTypesConfig[
                                uploadState?.type ||
                                  DocumentTypes.ARTICLES_OF_ASSOCIATION
                              ].label
                            }
                          </Text>
                        </Stack>
                      </HStack>
                    </Stack>
                  )}
                  {isError && (
                    <Alert status="error" variant="subtle" rounded="md">
                      <AlertIcon />
                      <AlertTitle>Erro ao enviar documentos</AlertTitle>
                      <AlertDescription>
                        Tente novamente mais tarde
                      </AlertDescription>
                    </Alert>
                  )}
                  <Actions />
                </Stack>
              </Box>
            </Step>
          </Stepper>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AccountDocumentsForm;

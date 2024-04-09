import FormCurrencyInput from "@/features/common/components/form/FormCurrencyInput";
import FormInput from "@/features/common/components/form/FormInput";
import CompanyFeesFormSchema, {
  CompanyFeesFormValues,
} from "@/features/companies/schemas/CompanyFeesFormSchema";
import {
  Button,
  Card,
  CardBody,
  HStack,
  InputRightAddon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  defaultValues: CompanyFeesFormValues;
  onSubmit: (values: CompanyFeesFormValues) => Promise<void>;
  onSuccess: () => void;
  onError: () => void;
  onCancel?: () => void;
};

const CompanyFeesForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  onCancel = () => {},
}) => {
  const form = useForm<CompanyFeesFormValues>({
    defaultValues,
    resolver: yupResolver(CompanyFeesFormSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onSubmit,
    onError,
    onSuccess,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <Stack>
          <Card variant="outline" overflow="hidden" bg="transparent">
            <CardBody>
              <Stack gap={3}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
                  Pix
                </Text>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 2,
                  }}
                  gap={3}
                >
                  <FormCurrencyInput
                    name="pixFixed"
                    label="Taxa fixa"
                    placeholder="0,00"
                    hideSymbol={false}
                  >
                    <InputRightAddon>$</InputRightAddon>
                  </FormCurrencyInput>

                  <FormCurrencyInput
                    name="pixPercentage"
                    label="Taxa variável"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  <FormInput
                    name="pixRelease"
                    label="Liberação em dias"
                    placeholder="0"
                    type="number"
                  >
                    <InputRightAddon>
                      <Text fontSize="xs">dias</Text>
                    </InputRightAddon>
                  </FormInput>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>

          <Card variant="outline" overflow="hidden" bg="transparent">
            <CardBody>
              <Stack gap={3}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
                  Boleto
                </Text>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 2,
                  }}
                  gap={3}
                >
                  <FormCurrencyInput
                    name="ticketFixed"
                    label="Taxa fixa"
                    placeholder="0,00"
                  >
                    <InputRightAddon>$</InputRightAddon>
                  </FormCurrencyInput>

                  <FormCurrencyInput
                    name="ticketPercentage"
                    label="Taxa variável"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  <FormInput
                    name="ticketRelease"
                    label="Liberação em dias"
                    placeholder="0"
                    type="number"
                  >
                    <InputRightAddon>
                      <Text fontSize="xs">dias</Text>
                    </InputRightAddon>
                  </FormInput>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>

          <Card variant="outline" overflow="hidden" bg="transparent">
            <CardBody>
              <Stack gap={3}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
                  Cartão de Crédito
                </Text>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 2,
                  }}
                  gap={3}
                >
                  <FormCurrencyInput
                    name="creditCardFixed"
                    label="Taxa fixa"
                    placeholder="0,00"
                  >
                    <InputRightAddon>$</InputRightAddon>
                  </FormCurrencyInput>

                  <FormCurrencyInput
                    name="creditCardPercentage"
                    label="Taxa variável (à vista)"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  {[...Array(11).keys()].map((index) => (
                    <FormCurrencyInput
                      name={`creditCard${index + 2}x`}
                      label={`Taxa variável (${index + 2} parcelas)`}
                      placeholder="0,00"
                      hideSymbol
                    >
                      <InputRightAddon>%</InputRightAddon>
                    </FormCurrencyInput>
                  ))}

                  <FormInput
                    name="creditCardRelease"
                    label="Liberação em dias"
                    placeholder="0"
                    type="number"
                  >
                    <InputRightAddon>
                      <Text fontSize="xs">dias</Text>
                    </InputRightAddon>
                  </FormInput>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>

          <Card variant="outline" overflow="hidden" bg="transparent">
            <CardBody>
              <Stack gap={3}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
                  Antecipação
                </Text>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 2,
                  }}
                  gap={3}
                >
                  <FormCurrencyInput
                    name="antecipationPercentage"
                    label="Antecipação"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  <FormInput
                    name="antecipationReleaseCreditCard"
                    label="Liberação em dias (Cartão)"
                    placeholder="0"
                    type="number"
                  >
                    <InputRightAddon>
                      <Text fontSize="xs">dias</Text>
                    </InputRightAddon>
                  </FormInput>

                  <FormInput
                    name="antecipationReleaseTicket"
                    label="Liberação em dias (Boleto)"
                    placeholder="0"
                    type="number"
                  >
                    <InputRightAddon>
                      <Text fontSize="xs">dias</Text>
                    </InputRightAddon>
                  </FormInput>

                  <FormInput
                    name="antecipationReleasePix"
                    label="Liberação em dias (Pix)"
                    placeholder="0"
                    type="number"
                  >
                    <InputRightAddon>
                      <Text fontSize="xs">dias</Text>
                    </InputRightAddon>
                  </FormInput>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>

          <Card variant="outline" overflow="hidden" bg="transparent">
            <CardBody>
              <Stack gap={3}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
                  Saques
                </Text>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 2,
                  }}
                >
                  <FormCurrencyInput
                    name="withdrawalFee"
                    label="Taxa do saque"
                    placeholder="0,00"
                  >
                    <InputRightAddon>$</InputRightAddon>
                  </FormCurrencyInput>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>
          <Card variant="outline" overflow="hidden" bg="transparent">
            <CardBody>
              <Stack gap={3}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
                  Prechargeback
                </Text>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 2,
                  }}
                >
                  <FormCurrencyInput
                    name="prechargebackFixed"
                    label="Taxa fixa"
                    placeholder="0,00"
                  >
                    <InputRightAddon>$</InputRightAddon>
                  </FormCurrencyInput>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        <HStack mt={4} justify="flex-end">
          <Button variant="outline" colorScheme="gray" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" colorScheme="primary" isLoading={isPending}>
            Salvar
          </Button>
        </HStack>
      </form>
    </FormProvider>
  );
};

export default CompanyFeesForm;

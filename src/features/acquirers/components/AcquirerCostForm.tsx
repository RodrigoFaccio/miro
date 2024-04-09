import AcquirerCostFormSchema, {
  AcquirerCostFormValues,
} from "@/features/acquirers/schemas/AcquirerCostFormSchema";
import FormCurrencyInput from "@/features/common/components/form/FormCurrencyInput";
import { Button, Card, CardBody, HStack, InputRightAddon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  defaultValues: AcquirerCostFormValues;
  onCancel: () => void;
  onSubmit: (values: AcquirerCostFormValues) => Promise<void>;
  onError: (error: unknown) => void;
  onSuccess: () => void;
};

const AcquirerCostForm: React.FC<Props> = ({
  defaultValues,
  onCancel,
  onSubmit,
  onError,
  onSuccess,
}) => {
  const form = useForm<AcquirerCostFormValues>({
    defaultValues,
    resolver: yupResolver(AcquirerCostFormSchema),
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
                    name="costPixFixed"
                    label="Taxa fixa"
                    placeholder="0,00"
                    hideSymbol={false}
                  >
                    <InputRightAddon>$</InputRightAddon>
                  </FormCurrencyInput>

                  <FormCurrencyInput
                    name="costPixPercentage"
                    label="Taxa variável"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                 
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
                    name="costTicketFixed"
                    label="Taxa fixa"
                    placeholder="0,00"
                  >
                    <InputRightAddon>$</InputRightAddon>
                  </FormCurrencyInput>

                  <FormCurrencyInput
                    name="costTicketPercentage"
                    label="Taxa variável"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  
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
                    name="costCreditCardFixed"
                    label="Taxa fixa"
                    placeholder="0,00"
                  >
                    <InputRightAddon>$</InputRightAddon>
                  </FormCurrencyInput>

                  <FormCurrencyInput
                    name="costCreditCardPercentage"
                    label="Taxa variável (à vista)"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  {[...Array(11).keys()].map((index) => (
                    <FormCurrencyInput
                      name={`costCreditCard${index + 2}x`}
                      label={`Taxa variável (${index + 2} parcelas)`}
                      placeholder="0,00"
                      hideSymbol
                    >
                      <InputRightAddon>%</InputRightAddon>
                    </FormCurrencyInput>
                  ))}

                  
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>
          <HStack mt={4} justify="flex-end">
            <Button variant="outline" colorScheme="gray" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="primary" isLoading={isPending}>
              Salvar
            </Button>
          </HStack>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default AcquirerCostForm;

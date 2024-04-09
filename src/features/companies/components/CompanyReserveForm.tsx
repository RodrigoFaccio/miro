import FormCurrencyInput from "@/features/common/components/form/FormCurrencyInput";
import FormInput from "@/features/common/components/form/FormInput";
import CompanyReserveFormSchema, {
  CompanyReserveFormValues,
} from "@/features/companies/schemas/CompanyReserveFormSchema";
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
  defaultValues: CompanyReserveFormValues;
  onSubmit: (values: CompanyReserveFormValues) => Promise<void>;
  onSuccess: () => void;
  onError: () => void;
  onCancel?: () => void;
};

const CompanyReserveForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  onCancel = () => {},
}) => {
  const form = useForm<CompanyReserveFormValues>({
    defaultValues,
    resolver: yupResolver(CompanyReserveFormSchema),
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
                    name="pixReserve"
                    label="Porcentagem"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  <FormInput
                    name="pixReleaseReserve"
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
                    name="ticketReserve"
                    label="Porcentagem"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  <FormInput
                    name="ticketReleaseReserve"
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
                    name="creditCardReserve"
                    label="Porcentagem"
                    placeholder="0,00"
                    hideSymbol
                  >
                    <InputRightAddon>%</InputRightAddon>
                  </FormCurrencyInput>

                  <FormInput
                    name="creditCardReleaseReserve"
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

export default CompanyReserveForm;

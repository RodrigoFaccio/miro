import FormCheckbox from "@/features/common/components/form/FormCheckbox";
import { CompanySettingsContext } from "@/features/companies/contexts/CompanySettingsContext";
import CompanyPermissionsFormSchema, {
  CompanyPermissionsFormValues,
} from "@/features/companies/schemas/CompanyPermissionsFormSchema";
import { Button, Card, CardBody, HStack, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  defaultValues: CompanyPermissionsFormValues;
  onSubmit: (values: CompanyPermissionsFormValues) => Promise<void>;
  onSuccess: () => void;
  onError: () => void;
};

const CompanyPermissionsForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
}) => {
  const { close } = useContext(CompanySettingsContext);

  const form = useForm<CompanyPermissionsFormValues>({
    defaultValues,
    resolver: yupResolver(CompanyPermissionsFormSchema),
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
                  Formas de Pagamento
                </Text>
                <FormCheckbox
                  name="creditCard"
                  label="Cartão de Crédito"
                  colorScheme="primary"
                />
                <FormCheckbox
                  name="boleto"
                  label="Boleto"
                  colorScheme="primary"
                />
                <FormCheckbox name="pix" label="Pix" colorScheme="primary" />
              </Stack>
            </CardBody>
          </Card>

          <Card variant="outline" overflow="hidden" bg="transparent">
            <CardBody>
              <Stack gap={3}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
                  Regras de Transferência
                </Text>
                <FormCheckbox
                  name="withdrawEnabled"
                  label="Transferência habilitada"
                  colorScheme="primary"
                />
              </Stack>
            </CardBody>
          </Card>

          <Card variant="outline" overflow="hidden" bg="transparent">
            <CardBody>
              <Stack gap={3}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
                  Regras de Antecipação
                </Text>
                <FormCheckbox
                  name="antecipationEnabled"
                  label="Antecipação habilitada"
                  colorScheme="primary"
                />
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        <HStack mt={4} justify="flex-end">
          <Button variant="outline" colorScheme="gray" onClick={close}>
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

export default CompanyPermissionsForm;

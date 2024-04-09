import useAcquirers from "@/features/acquirers/hooks/UseAcquirers";
import { Acquirer } from "@/features/acquirers/types";
import FormSelectInput from "@/features/common/components/form/FormSelectInput";
import { CompanySettingsContext } from "@/features/companies/contexts/CompanySettingsContext";
import CompanyCustomAcquirersFormSchema, {
  CompanyCustomAcquirersFormValues,
} from "@/features/companies/schemas/CompanyCustomAcquirersFormSchema";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  defaultValues: CompanyCustomAcquirersFormValues;
  onSubmit: (values: CompanyCustomAcquirersFormValues) => Promise<void>;
  onSuccess: () => void;
  onError: () => void;
};

const CompanyCustomAcquirersForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
}) => {
  const { close } = useContext(CompanySettingsContext);

  const {
    data: { results, count },
    isFetching,
  } = useAcquirers();

  const form = useForm<CompanyCustomAcquirersFormValues>({
    defaultValues,
    resolver: yupResolver(CompanyCustomAcquirersFormSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onSubmit,
    onError,
    onSuccess,
  });

  const acquirers = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = (acquirer: Acquirer, field: keyof Acquirer) => ({
      value: acquirer.id,
      label: acquirer.name,
    });
    return {
      creditCardAcquirer: results.map((acquirer) => {
        return map(acquirer, "creditCardEnabled");
      }),
      boletoAcquirer: results.map((acquirer) => {
        return map(acquirer, "ticketEnabled");
      }),
      pixAcquirer: results.map((acquirer) => {
        return map(acquirer, "pixEnabled");
      }),
    };
  }, [results]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <Stack gap={3} key={`acquirers-${count}`}>
          <FormSelectInput
            name="creditCardAcquirer"
            label="Cartão de Crédito"
            options={acquirers.creditCardAcquirer}
            isLoading={isFetching}
            placeholder="Nenhum"
          />
          <FormSelectInput
            name="boletoAcquirer"
            label="Boleto"
            options={acquirers.creditCardAcquirer}
            isLoading={isFetching}
            isClearable
            placeholder="Nenhum"
          />
          <FormSelectInput
            name="pixAcquirer"
            label="Pix"
            options={acquirers.creditCardAcquirer}
            isLoading={isFetching}
            isClearable
            placeholder="Nenhum"
          />
        </Stack>

        <HStack mt={5} justify="flex-end">
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

export default CompanyCustomAcquirersForm;

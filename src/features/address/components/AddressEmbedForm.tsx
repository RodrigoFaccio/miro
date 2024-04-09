import { states } from "@/features/address/constants";
import { AddressFormValues } from "@/features/address/schemas/AddressFormSchema";
import { getAddressByZipCode } from "@/features/address/services/cep";
import FormInput from "@/features/common/components/form/FormInput";
import FormMaskedInput from "@/features/common/components/form/FormMaskedInput";
import FormSelectInput from "@/features/common/components/form/FormSelectInput";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const AddressEmbedForm = () => {
  const form = useFormContext<{
    address: AddressFormValues;
  }>();

  const zipcode = useWatch({
    control: form.control,
    name: "address.zipcode",
  });

  const { data: address } = useQuery({
    queryKey: ["cep", { zipcode }],
    queryFn: () => getAddressByZipCode(zipcode || ""),
    enabled: !!zipcode,
  });

  useEffect(() => {
    if (address?.street && form) {
      form.setValue("address.street", address.street);
      form.setValue("address.neighborhood", address.neighborhood);
      form.setValue("address.city", address.city);
      form.setValue("address.state", address.state);
      form.trigger("address");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Stack gap={3}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
        <FormMaskedInput
          autoFocus
          name="address.zipcode"
          label="CEP"
          mask="00000-000"
          type="text"
          placeholder="CEP"
        />
        <FormInput
          name="address.number"
          label="Número"
          type="text"
          placeholder="Número"
        />
      </SimpleGrid>
      <FormInput
        name="address.street"
        label="Rua"
        type="text"
        placeholder="Rua"
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
        <FormInput
          name="address.neighborhood"
          label="Bairro"
          type="text"
          placeholder="Bairro"
        />

        <FormInput
          name="address.complement"
          label="Complemento"
          type="text"
          placeholder="Complemento"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
        <FormInput
          name="address.city"
          label="Cidade"
          type="text"
          placeholder="Cidade"
        />
        <FormSelectInput
          name="address.state"
          label="Estado"
          placeholder="Estado"
          options={states}
        />
      </SimpleGrid>
    </Stack>
  );
};

export default AddressEmbedForm;

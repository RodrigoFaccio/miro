import { AccountFormValues } from "@/features/account/schemas/AccountFormSchema";
import FormCurrencyInput from "@/features/common/components/form/FormCurrencyInput";
import FormInput from "@/features/common/components/form/FormInput";
import FormMaskedInput from "@/features/common/components/form/FormMaskedInput";
import FormSelectInput from "@/features/common/components/form/FormSelectInput";
import CompanyCnaePicker from "@/features/companies/components/CompanyCnaePicker";
import { CompanyTypeConfig } from "@/features/companies/constants";
import { getCompanyDetailsByCNPJ } from "@/features/companies/services";
import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  InputRightElement,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { validateCNPJ } from "validations-br";

const AccountDetailsForm = () => {
  const [pickingCnae, setPickingCnae] = useState(false);

  const [, setPickingLegalNature] = useState(false);

  const { control, setValue } = useFormContext<AccountFormValues>();

  const cnpj = useWatch({ control, name: "cnpj" });

  useEffect(() => {
    if (validateCNPJ(cnpj || "")) {
      getCompanyDetailsByCNPJ(cnpj).then((data) => {
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as keyof AccountFormValues, value);
        });
      });
    }
  }, [cnpj]);

  return (
    <Stack gap={2}>
      <CompanyCnaePicker
        open={pickingCnae}
        onClose={() => {
          setPickingCnae(false);
        }}
        onCnaeSelected={(cnae) => {
          setValue("companyMainCnae", cnae.id);
        }}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
        <FormMaskedInput
          autoFocus
          label="CPF/CNPJ"
          mask={["000.000.000-00", "00.000.000/0000-00"]}
          name="cnpj"
          placeholder="Informe o CNPJ"
        />
        <FormMaskedInput
          label="Telefone"
          mask={["(00) 0000-0000", "(00) 0 0000-0000"]}
          name="phone"
          placeholder="Informe o telefone"
        />
        <FormInput
          label="Razão Social"
          name="companyLegalName"
          placeholder="Informe a razão social"
        />
        <FormInput
          label="Nome Comercial"
          name="commercialName"
          placeholder="Informe o nome comercial"
        />
        <FormMaskedInput
          label="CNAE principal"
          mask="0000-0/00"
          name="companyMainCnae"
          placeholder="Informe o CNAE principal"
        >
          <InputRightElement>
            <IconButton
              onClick={() => setPickingCnae(true)}
              color="primary"
              aria-label="Buscar CNAE"
              icon={<SearchIcon />}
              colorScheme="gray"
            />
          </InputRightElement>
        </FormMaskedInput>
        <FormInput
          label="Natureza jurídica"
          name="companyLegalNature"
          placeholder="Informe a natureza jurídica"
        >
          <InputRightElement>
            <IconButton
              onClick={() => setPickingLegalNature(true)}
              color="primary"
              aria-label="Buscar Natureza Jurídica"
              icon={<SearchIcon />}
              colorScheme="gray"
            />
          </InputRightElement>
        </FormInput>
        <FormSelectInput
          label="Tipo da empresa"
          name="companyType"
          placeholder="Informe o tipo da empresa"
          options={Object.entries(CompanyTypeConfig).map(([key, value]) => ({
            label: value.label,
            value: key,
          }))}
        />
        <FormInput
          label="Data de criação da empresa"
          name="companyCreatedDate"
          type="date"
        />

        <FormCurrencyInput label="Faturamento médio" name="averageRevenue" />
      </SimpleGrid>
    </Stack>
  );
};

export default AccountDetailsForm;

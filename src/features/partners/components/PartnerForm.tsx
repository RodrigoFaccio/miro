import AddressEmbedForm from "@/features/address/components/AddressEmbedForm";
import FormFooterActions from "@/features/common/components/form/FormFooterActions";
import FormInput from "@/features/common/components/form/FormInput";
import FormMaskedInput from "@/features/common/components/form/FormMaskedInput";
import FormSelectInput from "@/features/common/components/form/FormSelectInput";
import { PartnerRoleConfig } from "@/features/partners/constants";
import PartnerFormSchema, {
  PartnerFormValues,
} from "@/features/partners/schemas/PartnerFormSchema";
import { PartnerRole } from "@/features/partners/types";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

const defaultValues = {
  name: "",
  email: "",
  mother_name: "",
  role: PartnerRole.ADMIN,
  document: "",
  phone: "",
  birth_date: "",
  address: {
    zipcode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  },
};

type PartnerFormProps = {
  onClose: () => void;
  onSubmit: (values: PartnerFormValues) => void;
};

const PartnerForm: React.FC<PartnerFormProps> = ({ onSubmit, onClose }) => {
  const form = useForm<PartnerFormValues>({
    resolver: yupResolver(PartnerFormSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const addressError = form.formState.errors?.address;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          return form.handleSubmit(onSubmit)(e);
        }}
      >
        <Tabs colorScheme="primary">
          <TabList>
            <Tab>Dados pessoais</Tab>
            <Tab color={addressError ? "red.300" : undefined}>
              Endereço
              {addressError && <InfoIcon ml={2} color="red.300" />}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={1}>
              <Stack spacing={2}>
                <FormInput
                  label="Nome completo"
                  name="name"
                  placeholder="Nome completo"
                />
                <FormInput
                  label="E-mail"
                  name="email"
                  placeholder="E-mail"
                  type="email"
                />
                <FormInput
                  label="Nome da mãe"
                  name="mother_name"
                  placeholder="Nome da mãe"
                />
                <SimpleGrid columns={[1, 2]} gap={3}>
                  <FormMaskedInput
                    label="Documento"
                    mask={["000.000.000-00", "00.000.000/0000-00"]}
                    name="document"
                    placeholder="000.000.000-00"
                  />

                  <FormSelectInput
                    name="role"
                    label="Tipo"
                    options={Object.values(PartnerRoleConfig)}
                  />
                </SimpleGrid>
                <SimpleGrid columns={[1, 2]} gap={3}>
                  <FormMaskedInput
                    label="Telefone"
                    mask={["(00) 0000-0000", "(00) 0 0000-0000"]}
                    name="phone"
                    placeholder="(00) 0000-0000"
                  />

                  <FormInput
                    label="Data de nascimento"
                    name="birth_date"
                    placeholder="Data de nascimento"
                    type="date"
                  />
                </SimpleGrid>
              </Stack>
            </TabPanel>
            <TabPanel px={1}>
              <AddressEmbedForm />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Box mb={3}>
          <FormFooterActions onCancel={onClose} />
        </Box>
      </form>
    </FormProvider>
  );
};

export default PartnerForm;

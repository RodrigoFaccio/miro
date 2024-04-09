import AccountDocumentPicker from "@/features/account/components/AccountDocumentPicker";
import { DocumentTypesConfig } from "@/features/account/constants";
import {
  AccountDocumentsFormValues,
  DocumentFormValues,
} from "@/features/account/schemas/AccountDocumentsFormSchema";
import TableBuilder from "@/features/common/components/table/TableBuilder";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const helper = createColumnHelper<DocumentFormValues>();

type Props = {
  index: number;
};

const AccountPartnerDocuments: React.FC<Props> = ({ index }) => {
  const form = useFormContext<AccountDocumentsFormValues>();

  const [picking, setPicking] = useState(false);

  const documents = useFieldArray({
    control: form.control,
    name: `partners.${index}.documents`,
  });

  return (
    <Stack gap={2}>
      <HStack justify="flex-end">
        <LightMode>
          <Button
            onClick={() => setPicking(true)}
            isDisabled={picking}
            color="primary"
            size="sm"
            leftIcon={<AddIcon />}
          >
            Adicionar documento
          </Button>
        </LightMode>
      </HStack>

      <TableBuilder
        columns={
          [
            helper.accessor("type", {
              header: "Nome",
              cell: ({ row }) => (
                <Tag colorScheme="gray">
                  <TagLabel>
                    {row.original.type in DocumentTypesConfig
                      ? DocumentTypesConfig[row.original.type].label
                      : row.original.type}
                  </TagLabel>
                </Tag>
              ),
            }),
            helper.accessor("id", {
              header: "",
              cell: ({ row }) => (
                <HStack justify="flex-end">
                  <IconButton
                    aria-label="Remover documento"
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => {
                      documents.remove(row.index);
                      form.trigger(`partners.${index}.documents`);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </HStack>
              ),
            }),
          ] as ColumnDef<DocumentFormValues>[]
        }
        data={documents.fields as DocumentFormValues[]}
        enableRowSelection={false}
        enableColumnFilters={false}
        enableSorting={false}
      />

      {form.formState.errors.partners?.[index]?.documents && (
        <Text color="red.500" fontSize="sm">
          {form.formState.errors.partners?.[index]?.documents?.message}
        </Text>
      )}

      <AccountDocumentPicker
        isOpen={picking}
        onClose={() => setPicking(false)}
        onSubmit={(document) => {
          documents.append(document);
          form.trigger(`partners.${index}.documents`);
          setPicking(false);
        }}
      />
    </Stack>
  );
};

export default AccountPartnerDocuments;

import { AccountFormValues } from "@/features/account/schemas/AccountFormSchema";
import TableBuilder from "@/features/common/components/table/TableBuilder";
import ListItem from "@/features/common/components/widgets/ListItem";
import PartnersRoleTag from "@/features/partners/components/PartnersRoleTag";
import CreatePartnerModal from "@/features/partners/modals/CreatePartnersModal";
import { Partner } from "@/features/partners/types";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const helper = createColumnHelper<Partner>();

const AccountPartnersForm = () => {
  const form = useFormContext<AccountFormValues>();

  const [open, setOpen] = useState(false);

  const partners = useFieldArray({
    control: form.control,
    name: "partners",
  });

  return (
    <Stack gap={2}>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        disabled={open}
        sx={{ alignSelf: "flex-end" }}
        color="primary"
        size="sm"
        leftIcon={<AddIcon />}
      >
        Adicionar sócio
      </Button>

      <TableBuilder
        columns={
          [
            helper.accessor("name", {
              header: "Nome",
              cell: ({ row }) => (
                <ListItem
                  avatar={row.original.name}
                  primary={row.original.name}
                  secondary={row.original.document}
                />
              ),
            }),
            helper.accessor("role", {
              header: "Cargo",
              cell: ({ getValue }) => <PartnersRoleTag role={getValue()} />,
            }),
            helper.accessor("id", {
              header: "",
              cell: ({ row }) => (
                <HStack justify="flex-end">
                  <IconButton
                    aria-label="Excluir"
                    colorScheme="red"
                    variant="ghost"
                    size="sm"
                    onClick={() => partners.remove(row.index)}
                    rounded="full"
                  >
                    <DeleteIcon />
                  </IconButton>
                </HStack>
              ),
            }),
          ] as ColumnDef<Partner>[]
        }
        enableColumnFilters={false}
        enableFilters={false}
        enableRowSelection={false}
        data={partners.fields as unknown as Partner[]}
      />

      <CreatePartnerModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(partner) => {
          partners.append(partner);
          setOpen(false);
        }}
      />

      {form.formState.errors.partners && (
        <Text color="red.500" fontSize="xs" role="alert">
          {form.formState.errors.partners.message?.toString()}
        </Text>
      )}
    </Stack>
  );
};

export default AccountPartnersForm;

import TableBuilder from "@/features/common/components/table/TableBuilder";
import WithConfirmation from "@/features/common/components/wrappers/WithConfirmation";
import { PixKeyTypeConfig } from "@/features/financial/constants";
import { deletePixKey, getPixKeys } from "@/features/financial/services";
import { PixKey } from "@/features/financial/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const helper = createColumnHelper<PixKey>();

const PixKeysTable: React.FC = () => {
  const toast = useToast();

  const {
    data: records,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["pix-keys"],
    queryFn: () => getPixKeys(),
    initialData: {
      results: [],
      count: 0,
    },
  });

  const {
    mutateAsync: remove,
    isPending: removing,
    variables,
  } = useMutation({
    mutationFn: deletePixKey,
    onSuccess: () => {
      refetch();
      toast({
        title: "Sucesso",
        description: "Chave PIX removida com sucesso",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao remover chave PIX",
        status: "error",
      });
    },
  });

  return (
    <>
      <TableBuilder
        data={records.results}
        columns={
          [
            helper.accessor("key", {
              header: "Chave",
            }),
            helper.accessor("keyType", {
              header: "Tipo",
              cell: (row) => {
                if (row.getValue() in PixKeyTypeConfig) {
                  return PixKeyTypeConfig[row.getValue()].label;
                }
                return row.getValue();
              },
            }),
            helper.accessor("key", {
              cell: ({ row }) => (
                <WithConfirmation onConfirm={() => remove(row.original.key)}>
                  <IconButton
                    aria-label="Remover chave"
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    isLoading={removing && variables === row.original.key}
                  >
                    <DeleteIcon />
                  </IconButton>
                </WithConfirmation>
              ),
              header: "",
            }),
          ] as ColumnDef<PixKey>[]
        }
        enableRowSelection={false}
        enableFilters={false}
        enableGlobalFilter={false}
        fetching={isFetching}
      />
    </>
  );
};

export default PixKeysTable;

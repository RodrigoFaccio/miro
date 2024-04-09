import TableBuilder from "@/features/common/components/table/TableBuilder";
import { getCompanyCNAEs } from "@/features/companies/services";
import { Cnae } from "@/features/companies/types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  PaginationState,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

const helper = createColumnHelper<Cnae>();

type Props = {
  open: boolean;
  onClose: () => void;
  onCnaeSelected: (cnae: Cnae) => void;
};

const CompanyCnaePicker: React.FC<Props> = ({
  open,
  onClose,
  onCnaeSelected,
}) => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: cnaes, isLoading } = useQuery({
    queryKey: ["cnaes", search],
    queryFn: () =>
      getCompanyCNAEs({
        search,
      }),
    initialData: {
      rows: [],
      count: 0,
    },
  });

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="xl"
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Selecione o CNAE principal da empresa</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <Stack gap={5}>
            <Alert status="info" rounded="md">
              <AlertIcon />
              <AlertDescription>
                Utilize o campo de busca para encontrar o <strong>CNAE</strong>{" "}
                desejado e clique para selecionar.
              </AlertDescription>
            </Alert>
            <TableBuilder
              columns={[
                helper.accessor("id", { header: "ID" }),
                helper.accessor("description", { header: "Descrição" }),
              ]}
              data={cnaes.rows}
              fetching={isLoading}
              onRowClick={(row) => {
                onCnaeSelected(row);
                onClose();
              }}
              manualFiltering
              manualPagination={false}
              initialState={{
                pagination,
              }}
              state={{
                pagination,
                globalFilter: search,
              }}
              pageCount={Math.ceil(cnaes.count / pagination.pageSize)}
              onGlobalFilterChange={setSearch}
              onPaginationChange={setPagination}
              pageable
              enableColumnFilters={false}
              enableRowSelection={false}
              enableGlobalFilter
              getPaginationRowModel={getPaginationRowModel()}
            />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CompanyCnaePicker;

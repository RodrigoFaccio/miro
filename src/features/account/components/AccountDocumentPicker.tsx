import { DocumentTypesConfig } from "@/features/account/constants";
import {
  DocumentFormValues,
  DocumentSchema,
} from "@/features/account/schemas/AccountDocumentsFormSchema";
import { DocumentTypes } from "@/features/account/types";
import FilePreview from "@/features/common/components/file/FilePreview";
import FormSelectInput from "@/features/common/components/form/FormSelectInput";
import FormSingleFileInput from "@/features/common/components/form/FormSingleFileInput";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: DocumentFormValues) => void;
};

const AccountDocumentPicker: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const form = useForm<DocumentFormValues>({
    resolver: yupResolver(DocumentSchema),
    defaultValues: {
      type: DocumentTypes.ARTICLES_OF_ASSOCIATION,
      file: undefined,
    },
  });

  const file = useWatch({
    control: form.control,
    name: "file",
  });

  useEffect(() => {
    form.reset();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Selecione um documento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack gap={3}>
                <FormSelectInput
                  name="type"
                  label="Tipo de documento"
                  options={Object.entries(DocumentTypesConfig).map(
                    ([value, { label }]) => ({
                      value,
                      label,
                    })
                  )}
                />
                {file ? (
                  <FilePreview
                    file={file}
                    bg="transparent"
                    p={1}
                    onDelete={() => {
                      form.setValue("file", null as unknown as File);
                    }}
                  />
                ) : (
                  <>
                    <FormSingleFileInput
                      size="md"
                      name="file"
                      label="Arquivo"
                      accept={{
                        "image/*": ["image/png", "image/jpeg", "image/jpg"],
                        "application/pdf": ["application/pdf"],
                      }}
                    />
                  </>
                )}
              </Stack>
            </ModalBody>

            <ModalFooter gap={2}>
              <Button colorScheme="gray" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="primary"
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
              >
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AccountDocumentPicker;

import FilePreview from "@/features/common/components/file/FilePreview";
import { FileFormField } from "@/features/common/types/form";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Accept, useDropzone } from "react-dropzone";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { BsUpload } from "react-icons/bs";

type FormMultipleFileUploadProps = {
  name: string;
  label?: string;
  accept: Accept;
  preview?: boolean;
};

const FormMultipleFileUpload = ({
  name,
  label,
  accept,
  preview = true,
}: FormMultipleFileUploadProps) => {
  const { control, setValue } = useFormContext();

  const files = useWatch({
    control,
    name,
  });

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    accept,
    multiple: true,
    onDrop: (acceptedFiles: FileFormField[]) => {
      setValue(name, files.concat(acceptedFiles), {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  const bg = useColorModeValue("gray.50", "gray.800");

  const border = useColorModeValue("gray.400", "gray.600");

  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { invalid, error } }) => (
        <FormControl isInvalid={invalid} boxSizing="border-box">
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Flex
            p={6}
            border="1px dashed"
            borderColor={isDragActive || isFocused ? "primary.400" : border}
            _hover={{
              borderColor: "primary.400",
            }}
            borderRadius="md"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            minH={40}
            bg={bg}
            {...getRootProps()}
            maxW="100%"
          >
            <input {...getInputProps()} />
            <VStack gap={3}>
              <Icon as={BsUpload} boxSize={8} color="gray.500" />
              <Text fontWeight="light" fontSize="xs" color="gray.500">
                Arraste e solte arquivos aqui ou clique para selecionar
              </Text>
            </VStack>
          </Flex>
          {preview && (
            <Stack gap={2} mt={2}>
              {files.map((file: FileFormField, index: number) => (
                <FilePreview
                  file={file}
                  onDelete={() => {
                    setValue(
                      name,
                      files.filter((f: FileFormField) => f !== file),
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    );
                  }}
                  onNameChange={(filename: string) => {
                    if (file instanceof File) {
                      const renamed = new File([file], filename, {
                        type: file.type,
                      });
                      setValue(`${name}[${index}]`, renamed, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }
                  }}
                  key={index}
                  bg={"transparent"}
                  p={2}
                />
              ))}
            </Stack>
          )}
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormMultipleFileUpload;

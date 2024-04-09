import { WarningIcon } from "@chakra-ui/icons";
import { Button, Icon, Input, InputProps } from "@chakra-ui/react";
import { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { MdAttachFile } from "react-icons/md";

type FormSingleFileInputProps = Omit<InputProps, "accept"> & {
  name: string;
  accept: Accept;
  label: string;
};

const FormSingleFileInput: React.FC<FormSingleFileInputProps> = ({
  name,
  accept,
  label,
  ...props
}) => {
  const { setValue, formState } = useFormContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    if (!acceptedFiles.length) {
      return;
    }

    setValue(name, props.multiple ? acceptedFiles : acceptedFiles.pop(), {
      shouldValidate: true,
    });
  }, []);

  const { getInputProps, inputRef } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <>
      <Input
        type="file"
        {...getInputProps()}
        size="md"
        multiple={false}
        {...props}
      />
      <Button
        variant="outline"
        colorScheme={formState.errors[name] ? "red" : "primary"}
        size="sm"
        onClick={() => inputRef.current?.click()}
        rightIcon={
          formState.errors[name] && <Icon as={WarningIcon} color="red.500" />
        }
        leftIcon={<Icon as={MdAttachFile} />}
      >
        {label}
      </Button>
    </>
  );
};

export default FormSingleFileInput;

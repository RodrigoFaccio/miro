import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type FormSecretInputProps = {
  name: string;
  label: string;
} & InputProps;

const FormSecretInput: React.FC<FormSecretInputProps> = ({
  name,
  label,
  ...props
}) => {
  const { control } = useFormContext();

  const [show, { toggle }] = useBoolean(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              id={name}
              {...field}
              {...props}
            />
            <InputRightElement>
              <IconButton
                aria-label={show ? "hide" : "show"}
                size={props.size || "md"}
                icon={show ? <IoMdEyeOff /> : <IoMdEye />}
                onClick={toggle}
                colorScheme="gray"
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormSecretInput;

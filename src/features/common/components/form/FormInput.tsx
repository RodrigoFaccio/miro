import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  label: string;
  children?: React.ReactNode;
} & InputProps;

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type,
  children,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup>
            <Input type={type} id={name} {...field} {...props} />
            {children}
          </InputGroup>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormInput;

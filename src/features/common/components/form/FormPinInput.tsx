import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
  PinInputProps,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

type FormPinInputProps = {
  name: string;
  label: string;
  digits?: number;
} & Partial<PinInputProps>;

const FormPinInput: React.FC<FormPinInputProps> = ({
  name,
  label,
  digits = 4,
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
          <HStack>
            <PinInput id={name} {...field} {...props}>
              {[...Array(digits)].map((_, index) => (
                <PinInputField key={index} onBlur={field.onBlur} />
              ))}
            </PinInput>
          </HStack>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormPinInput;

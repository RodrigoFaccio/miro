import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { CurrencyInput } from "react-currency-mask";
import { Controller, useFormContext } from "react-hook-form";

type FormCurrencyInputProps = {
  name: string;
  label: string;
  hideSymbol?: boolean;
} & InputProps;

const FormCurrencyInput: React.FC<
  PropsWithChildren<FormCurrencyInputProps>
> = ({ name, label, hideSymbol = false, children, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup size={props.size}>
            <CurrencyInput
              value={field.value || "0.00"}
              onChangeValue={(_, value) => {
                field.onChange(value || 0);
              }}
              InputElement={<Input {...field} {...props} />}
              hideSymbol={hideSymbol}
            />
            {children}
          </InputGroup>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormCurrencyInput;

import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

type FormCheckboxProps = {
  name: string;
  label: string;
} & CheckboxProps;

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <Checkbox id={name} {...props} isChecked={value} onChange={onChange}>
            {label}
          </Checkbox>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormCheckbox;

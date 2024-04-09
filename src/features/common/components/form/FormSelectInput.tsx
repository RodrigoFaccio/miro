import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

type OptionList = Array<Option>;

type FormSelectInputProps = {
  name: string;
  label: string;
} & React.ComponentProps<typeof Select>;

const FormSelectInput: React.FC<FormSelectInputProps> = ({
  name,
  label,
  options,
  isMulti,
  ...props
}) => {
  const ref = useRef(null);

  const { control } = useFormContext();

  const getFieldValue = (options: OptionList, value: string | string[]) => {
    if (!isMulti) {
      return options.find((option) => option.value === value);
    }
    return options.filter((option) => value?.includes(option.value));
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Select
            ref={ref}
            selectedOptionStyle="check"
            colorScheme="primary"
            options={options}
            isMulti={isMulti}
            value={getFieldValue(options as OptionList, field.value)}
            closeMenuOnSelect={!isMulti}
            defaultValue={getFieldValue(options as OptionList, field.value)}
            onChange={(value: unknown) => {
              if (!value) {
                return field.onChange(isMulti ? [] : null);
              }
              const selectedValue = isMulti
                ? (value as OptionList).map((option) => option.value)
                : (value as Option).value;
              return field.onChange(selectedValue);
            }}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            {...props}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormSelectInput;

import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

type FormRadioGroupProps = {
  name: string;
  label?: string;
  options: (RadioProps & {
    label: string;
  })[];
  orientation?: "horizontal" | "vertical";
} & Omit<RadioGroupProps, "children">;

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  options,
  orientation = "horizontal",
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <RadioGroup {...field} colorScheme="primary" {...props}>
            <Flex
              gap={3}
              direction={orientation === "horizontal" ? "row" : "column"}
            >
              {options.map((option) => (
                <Radio key={option.value} {...option}>
                  {option.label}
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormRadioGroup;

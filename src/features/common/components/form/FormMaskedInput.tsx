import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
} from "@chakra-ui/react";
import { type FactoryOpts } from "imask";
import { PropsWithChildren } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useIMask } from "react-imask";

type FormMaskedInputProps = PropsWithChildren<
  {
    name: string;
    mask: FactoryOpts["mask"];
    label: string | React.ReactNode;
  } & InputProps
>;

const FormMaskedInput: React.FC<FormMaskedInputProps> = ({
  name,
  label,
  children,
  mask,
  ...props
}) => {
  const { control, setValue } = useFormContext();

  const { ref } = useIMask(
    {
      mask: mask as never,
    },
    {
      onAccept: (value) => {
        setValue(name, value);
      },
    }
  );

  return (
    <Controller
      control={control}
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup>
            <Input {...field} {...props} ref={ref} />
            {children}
          </InputGroup>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormMaskedInput;

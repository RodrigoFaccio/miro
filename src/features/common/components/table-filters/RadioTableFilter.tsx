import { Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FiltersColumn } from "@tanstack/react-table";

type Props<T> = FiltersColumn<T> & {
  clearable?: boolean;
  options: {
    label: string;
    value: string;
    render?: (value: string) => React.ReactNode;
  }[];
};

const RadioTableFilter = <T,>({
  clearable = true,
  options,
  setFilterValue,
  getFilterValue,
}: Props<T>) => {
  return (
    <RadioGroup
      size="sm"
      value={(getFilterValue() || "") as string}
      defaultValue=""
      onChange={setFilterValue}
      colorScheme="primary"
    >
      <Stack>
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.render ? option.render(option.value) : option.label}
          </Radio>
        ))}
        {!!getFilterValue() && clearable && (
          <Button
            size="xs"
            onClick={() => setFilterValue("")}
            variant="ghost"
            colorScheme="red"
          >
            Clear
          </Button>
        )}
      </Stack>
    </RadioGroup>
  );
};

export default RadioTableFilter;

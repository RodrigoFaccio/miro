import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { FiltersColumn } from "@tanstack/react-table";

type Props<T> = FiltersColumn<T> & {
  options: {
    label: string;
    value: string;
    render?: (value: string) => React.ReactNode;
  }[];
};

const CheckboxTableFilter = <T,>({
  options,
  setFilterValue,
  getFilterValue,
}: Props<T>) => {
  return (
    <CheckboxGroup
      colorScheme="primary"
      size="sm"
      value={(getFilterValue() as string[]) || []}
      onChange={(value) => {
        setFilterValue(value.length > 0 ? value : null);
      }}
    >
      <Stack>
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            {option.render ? option.render(option.value) : option.label}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};

export default CheckboxTableFilter;

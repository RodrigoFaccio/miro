import { SearchIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type DebouncedSearchProps = {
  onChange: (value: string) => void;
} & InputProps;

const DebouncedSearch = ({
  defaultValue,
  onChange,
  ...props
}: DebouncedSearchProps) => {
  const [value, setValue] = useState(defaultValue ?? "");

  const debounced = useDebouncedCallback((debouncedValue: string) => {
    onChange(debouncedValue);
  }, 500);

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  return (
    <FormControl size={props.size ?? "md"} w={320} maxW="full">
      <InputGroup>
        <Input
          id="search"
          placeholder="Pesquisar..."
          variant="filled"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            debounced(e.target.value);
          }}
          {...props}
        />
        <InputLeftElement display="flex" alignItems="center" h="full">
          <SearchIcon color={useColorModeValue("gray.300", "gray.500")} />
        </InputLeftElement>
      </InputGroup>
    </FormControl>
  );
};

export default DebouncedSearch;

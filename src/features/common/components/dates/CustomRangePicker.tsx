import { useColorModeValue, useToken } from "@chakra-ui/react";
import {
  RangeDatepicker,
  RangeDatepickerProps,
} from "chakra-dayzed-datepicker";
import React from "react";

const CustomRangePicker: React.FC<RangeDatepickerProps> = ({ ...props }) => {
  const [primary400] = useToken("colors", ["primary.400"]);

  return (
    <RangeDatepicker
      configs={{
        monthNames: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        dayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dateFormat: "dd/MM/yyyy",
      }}
      propsConfigs={{
        inputProps: {
          bg: useColorModeValue("white", "gray.900"),
          cursor: "pointer",
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            _hover: {
              bg: useColorModeValue("primary.500", "primary.300"),
              color: useColorModeValue("white", "gray.900"),
            },
          },
          selectedBtnProps: {
            bg: useColorModeValue("primary.500", "primary.300"),
            color: useColorModeValue("white", "gray.900"),
          },
          isInRangeBtnProps: {
            bg: useColorModeValue("primary.100", primary400 + "40"),
            color: useColorModeValue("gray.900", "white"),
          },
        },
      }}
      {...props}
    />
  );
};

export default CustomRangePicker;

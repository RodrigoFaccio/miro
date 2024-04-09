import { CalendarIcon } from "@chakra-ui/icons";
import {
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import { RangeCalendarPanel } from "chakra-dayzed-datepicker";
import { Select, chakraComponents } from "chakra-react-select";
import moment from "moment";
import { useMemo } from "react";

export enum Period {
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST_7_DAYS = "last_7_days",
  LAST_30_DAYS = "last_30_days",
  ALL_TIME = "all_time",
  CUSTOM = "custom",
}

export const PeriodConfig = {
  [Period.TODAY]: {
    label: "Hoje",
    value: Period.TODAY,
  },
  [Period.YESTERDAY]: {
    label: "Ontem",
    value: Period.YESTERDAY,
  },
  [Period.LAST_7_DAYS]: {
    label: "Últimos 7 dias",
    value: Period.LAST_7_DAYS,
  },
  [Period.LAST_30_DAYS]: {
    label: "Últimos 30 dias",
    value: Period.LAST_30_DAYS,
  },
  [Period.ALL_TIME]: {
    label: "Sempre",
    value: Period.ALL_TIME,
  },
  [Period.CUSTOM]: {
    label: "Personalizado",
    value: Period.CUSTOM,
  },
};

const periods = Array.from(Object.values(PeriodConfig)) as {
  label: string;
  value: Period;
}[];

const today = moment().toDate();

const yesterday = moment().subtract(1, "day").toDate();

const last7Days = moment().subtract(7, "day").toDate();

const last30Days = moment().subtract(30, "day").toDate();

const DatesMap: Record<Exclude<Period, Period.CUSTOM>, PeriodData> = {
  [Period.TODAY]: {
    period: Period.TODAY,
    startDate: today,
    endDate: today,
  },
  [Period.YESTERDAY]: {
    period: Period.YESTERDAY,
    startDate: yesterday,
    endDate: yesterday,
  },
  [Period.LAST_7_DAYS]: {
    period: Period.LAST_7_DAYS,
    startDate: last7Days,
    endDate: today,
  },
  [Period.LAST_30_DAYS]: {
    period: Period.LAST_30_DAYS,
    startDate: last30Days,
    endDate: today,
  },
  [Period.ALL_TIME]: {
    period: Period.ALL_TIME,
    startDate: null,
    endDate: null,
  },
} as const;

export type PeriodData = {
  period: Period;
  startDate: Date | null;
  endDate: Date | null;
};

type Props = {
  value: PeriodData;
  onChange: (value: PeriodData) => void;
};

const PeriodInput: React.FC<Props> = ({
  value: { period, startDate, endDate },
  onChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === Period.CUSTOM) {
      onChange({
        period: newPeriod,
        startDate,
        endDate,
      });
      return;
    }
    onChange(DatesMap[newPeriod]);
  };

  const customLabel = useMemo(() => {
    if (!startDate || !endDate) {
      return "Personalizado";
    }
    if (startDate === endDate) {
      return moment(startDate).format("DD/MM/yyy");
    }
    return `${moment(startDate).format("DD/MM/YY")} - ${moment(endDate).format(
      "DD/MM/YY"
    )}`;
  }, [startDate, endDate]);

  return (
    <>
      <Select
        value={periods.find((periodOption) => periodOption.value === period)}
        options={periods}
        onChange={(option: (typeof periods)[number] | null) => {
          if (!option) {
            return;
          }
          handlePeriodChange(option.value);
        }}
        components={{
          Option: ({ children, ...props }) => {
            const { value } = props.data;

            if (value !== Period.CUSTOM) {
              return (
                <chakraComponents.Option {...props}>
                  {children}
                </chakraComponents.Option>
              );
            }

            return (
              <chakraComponents.Option {...props}>
                <HStack
                  justifyContent="space-between"
                  width="full"
                  alignItems="center"
                  onClick={() => {
                    onOpen();
                  }}
                >
                  <Text>{customLabel}</Text>
                  <Icon as={CalendarIcon} />
                </HStack>
              </chakraComponents.Option>
            );
          },
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecione o período</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack justifyContent="center">
              <RangeCalendarPanel
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
                  firstDayOfWeek: 0,
                }}
                propsConfigs={{
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
                      bg: useColorModeValue(
                        "primary.100",
                        useToken("colors", ["primary.400"]) + "40"
                      ),
                      color: useColorModeValue("gray.900", "white"),
                    },
                  },
                }}
                selected={[
                  ...(startDate ? [startDate] : []),
                  ...(endDate ? [endDate] : []),
                ]}
                dayzedHookProps={{
                  showOutsideDays: false,
                  onDateSelected: ({ date }) => {
                    if (!startDate) {
                      onChange({
                        period: Period.CUSTOM,
                        startDate: date,
                        endDate: null,
                      });
                      return;
                    }
                    if (!endDate) {
                      onChange({
                        period: Period.CUSTOM,
                        startDate: date < startDate ? date : startDate,
                        endDate: date > startDate ? date : startDate,
                      });
                      onClose();
                      return;
                    }
                    onChange({
                      period: Period.CUSTOM,
                      startDate: date,
                      endDate: null,
                    });
                  },
                  selected: [
                    ...(startDate ? [startDate] : []),
                    ...(endDate ? [endDate] : []),
                  ],
                  monthsToDisplay: 2,
                }}
              />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PeriodInput;

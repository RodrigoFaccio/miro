import PeriodInput, {
  Period,
  PeriodData,
} from "@/features/common/components/dates/PeriodInput";
import { FiltersColumn } from "@tanstack/react-table";

type Props<T> = FiltersColumn<T>;

const DateRangeTableFilter = <T,>({
  setFilterValue,
  getFilterValue,
}: Props<T>) => {
  const value = getFilterValue() as PeriodData | null;

  const { period, startDate, endDate } = value || {
    period: Period.ALL_TIME,
    startDate: null,
    endDate: null,
  };

  return (
    <PeriodInput
      value={{
        period,
        startDate,
        endDate,
      }}
      onChange={setFilterValue}
    />
  );
};

export default DateRangeTableFilter;

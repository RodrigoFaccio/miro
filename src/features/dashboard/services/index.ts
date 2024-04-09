import { AuthenticatedHttp } from "@/features/common/http/axios";
import { SalesData } from "@/features/dashboard/types";
import { format } from "date-fns";

export const getDashboardData = ({
  startDate,
  endDate,
}: {
  startDate?: Date | null;
  endDate?: Date | null;
},user?: number): Promise<SalesData> => {
  console.log("getDashboardData", startDate, endDate);
  const newStart = startDate ? format(startDate, "yyyy-MM-dd") : null;
  const newEnd = endDate ? format(endDate, "yyyy-MM-dd") : null;
  return AuthenticatedHttp.get("/dashboard", {
    params: {
      startDate: newStart,
      endDate: newEnd,
      user:user
    },
  }).then((response) => response.data as SalesData);
};

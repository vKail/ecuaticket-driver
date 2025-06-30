import { useQuery } from "@tanstack/react-query";
import { RouteSheetApi } from "../api/route-sheet.api";
import { RouteSheet } from "../types/route-sheet.interface";

const routeSheetApi = RouteSheetApi.getInstance();

export const useRouteSheets = (date: string) => {
  return useQuery({
    queryKey: ["route-sheets", date],
    queryFn: () => routeSheetApi.getRouteSheetsByDriver(date),
    select: (response): RouteSheet[] => response.data,
    enabled: !!date,
  });
}; 
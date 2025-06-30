import { RouteSheet } from "@/features/route-sheets/types/route-sheet.interface";
import { RouteSheetCard } from "./route-sheet-card";

interface RouteSheetListProps {
  routeSheets: RouteSheet[];
}

export const RouteSheetList = ({ routeSheets }: RouteSheetListProps) => {
  if (routeSheets.length === 0) {
    return <p>No hay hojas de ruta para la fecha seleccionada.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {routeSheets.map((routeSheet) => (
        <RouteSheetCard key={routeSheet.id} routeSheet={routeSheet} />
      ))}
    </div>
  );
}; 
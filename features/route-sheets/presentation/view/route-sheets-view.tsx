"use client";

import { useState } from "react";
import { useRouteSheets } from "@/features/route-sheets/hooks/use-route-sheets";
import { RouteSheetList } from "../components/route-sheet-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RouteSheetsView = () => {
  // This helper function correctly formats a Date object to a 'YYYY-MM-DD' string
  // in the user's local timezone, avoiding UTC conversion issues.
  const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(() =>
    getLocalDateString(new Date())
  );

  // Initialize queryDate to today's date to fetch data on load.
  const [queryDate, setQueryDate] = useState(() => {
    const initialDateString = getLocalDateString(new Date());
    // Create a Date object at midnight LOCAL time.
    const localDate = new Date(`${initialDateString}T00:00:00`);
    // Convert to ISO string for the API. The date part will now be correct.
    return localDate.toISOString();
  });

  const {
    data: routeSheets,
    isLoading,
    isError,
  } = useRouteSheets(queryDate);

  const handleSearch = () => {
    if (selectedDate) {
      // Create Date object for midnight *local* time to avoid timezone shift
      const localDate = new Date(`${selectedDate}T00:00:00`);
      setQueryDate(localDate.toISOString());
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Hojas de Ruta</h1>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="w-full sm:w-auto">
          <Label htmlFor="date-picker">Selecciona una fecha</Label>
          <Input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedDate(e.target.value)
            }
            className="w-full"
          />
        </div>
        <Button onClick={handleSearch} className="w-full sm:w-auto mt-4 sm:mt-0">
          Buscar
        </Button>
      </div>

      {isLoading && <p className="text-center">Cargando...</p>}
      {isError && (
        <p className="text-center text-red-500">
          Error al cargar las hojas de ruta.
        </p>
      )}
      {routeSheets && <RouteSheetList routeSheets={routeSheets} />}
    </div>
  );
}; 
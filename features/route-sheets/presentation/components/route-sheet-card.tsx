import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RouteSheet } from "@/features/route-sheets/types/route-sheet.interface";
import { BusSeatLayout } from "./bus-seat-layout";
import { Users, Armchair } from "lucide-react";

interface RouteSheetCardProps {
  routeSheet: RouteSheet;
}

export const RouteSheetCard = ({ routeSheet }: RouteSheetCardProps) => {
  const { bus, frequency } = routeSheet;
  const totalSeats = bus.physicalSeats.length;
  const takenSeats = bus.physicalSeats.filter((seat) => seat.isTaken).length;
  const availableSeats = totalSeats - takenSeats;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:border-primary transition-colors flex flex-col justify-between h-full">
          <div>
            <CardHeader>
              <CardTitle className="text-lg">
                {frequency.origin.name} - {frequency.destination.name}
              </CardTitle>
              <CardDescription>Salida: {frequency.time}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 text-sm">
                <p>
                  <span className="font-semibold">Bus:</span>{" "}
                  {bus.internalNumber} - {bus.licensePlate}
                </p>
                <p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs self-start ${
                      routeSheet.status === "GENERATED"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {routeSheet.status}
                  </span>
                </p>
              </div>
            </CardContent>
          </div>
          <CardFooter className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>
                {takenSeats} / {totalSeats} Ocupados
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Armchair className="h-4 w-4" />
              <span>{availableSeats} Libres</span>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-auto max-w-[95vw] sm:max-w-sm md:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalle del Viaje y Asientos</DialogTitle>
        </DialogHeader>
        <BusSeatLayout seats={bus.physicalSeats} />
      </DialogContent>
    </Dialog>
  );
}; 
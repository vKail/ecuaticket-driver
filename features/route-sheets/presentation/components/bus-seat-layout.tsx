import { PhysicalSeat } from "../../types/route-sheet.interface";
import { Armchair, Accessibility } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusSeatLayoutProps {
  seats: PhysicalSeat[];
}

const Seat = ({ seat }: { seat: PhysicalSeat }) => {
  const seatTypeIcon =
    seat.seatTypeId === 2 ? (
      <Accessibility className="h-4 w-4" />
    ) : (
      <Armchair className="h-4 w-4" />
    );

  const seatColorClasses = seat.isTaken
    ? "bg-red-400 border-red-600 text-white cursor-not-allowed"
    : "bg-green-100 border-green-400 text-green-900";

  const seatTooltip = seat.isTaken
    ? `Asiento ${seat.seatNumber} (Ocupado)`
    : `Asiento ${seat.seatNumber} (Libre)`;

  return (
    <div
      title={seatTooltip}
      className={cn(
        "flex flex-col items-center justify-center rounded-md border-2 font-semibold w-11 h-11 sm:w-12 sm:h-12",
        seatColorClasses
      )}
    >
      {seatTypeIcon}
      <span className="text-xs">{seat.seatNumber}</span>
    </div>
  );
};

export const BusSeatLayout = ({ seats }: BusSeatLayoutProps) => {
  if (seats.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Este bus no tiene asientos registrados.
      </p>
    );
  }

  // Group seats by floor
  const floors = seats.reduce((acc, seat) => {
    const floor = seat.floor || 1;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(seat);
    return acc;
  }, {} as Record<number, PhysicalSeat[]>);

  return (
    <div className="p-1 sm:p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Distribución de Asientos
      </h3>
      {Object.keys(floors)
        .sort()
        .map((floorNumber) => {
          const floorSeats = floors[parseInt(floorNumber)];
          const maxRow = Math.max(...floorSeats.map((s) => s.row));
          const maxCol = Math.max(...floorSeats.map((s) => s.column));

          // Create a grid representation
          const grid: (PhysicalSeat | null)[][] = Array(maxRow + 1)
            .fill(0)
            .map(() => Array(maxCol + 1).fill(null));
          floorSeats.forEach((seat) => {
            grid[seat.row][seat.column] = seat;
          });

          return (
            <div key={floorNumber} className="mb-6">
              {Object.keys(floors).length > 1 && (
                <h4 className="text-md font-bold mb-3 text-center border-b pb-2">
                  Piso {floorNumber}
                </h4>
              )}
              <div className="flex justify-center">
                <div
                  className="inline-grid gap-1 sm:gap-2 p-2 sm:p-4 rounded-lg bg-gray-200/70 border-2 border-gray-300"
                  style={{ gridTemplateColumns: `repeat(${maxCol}, auto)` }}
                >
                  {grid.slice(1).map((row, rowIndex) =>
                    row
                      .slice(1)
                      .map((seat, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="flex items-center justify-center"
                        >
                          {seat ? (
                            <Seat seat={seat} />
                          ) : (
                            <div className="w-11 h-11 sm:w-12 sm:h-12" />
                          )}
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      <div className="flex justify-center flex-wrap gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 border-green-400 bg-green-100"></div>
          <span className="text-sm">Libre</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 border-red-600 bg-red-400"></div>
          <span className="text-sm">Ocupado</span>
        </div>
        <div className="flex items-center gap-2">
          <Armchair className="h-5 w-5" />
          <span className="text-sm">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <Accessibility className="h-5 w-5" />
          <span className="text-sm">Preferencial</span>
        </div>
      </div>
    </div>
  );
}; 
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowLeft, RotateCcw } from "lucide-react";

interface QrValidationResultProps {
  isValid: boolean;
  accessCode: string;
  onReset: () => void;
  onRetry: () => void;
}

export const QrValidationResult: React.FC<QrValidationResultProps> = ({
  isValid,
  accessCode,
  onReset,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6">
      {/* Header con logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <span className="text-white text-sm font-bold">ET</span>
        </div>
        <span className="text-lg font-semibold text-primary">EcuaTicket</span>
      </div>

      {/* Resultado */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isValid
            ? "¡Perfecto! El código QR es válido."
            : "El código QR es inválido, prueba otra vez!"}
        </h2>

        {/* Icono de resultado */}
        <div className="flex justify-center mb-6">
          {isValid ? (
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          ) : (
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">Código escaneado:</p>
          <p className="text-sm font-mono bg-white p-2 rounded border break-all">
            {accessCode}
          </p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col gap-3 w-full">
        {isValid ? (
          <Button
            onClick={onReset}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        ) : (
          <Button
            onClick={onRetry}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        )}

        <Button
          onClick={onReset}
          variant="outline"
          className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-3"
          size="lg"
        >
          Escanear otro código
        </Button>
      </div>
    </div>
  );
};

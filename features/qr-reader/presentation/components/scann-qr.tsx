"use client";

import { Button } from "@/components/ui/button";
import { QrValidationResult } from "./qr-validation-result";
import { Camera, CameraOff } from "lucide-react";
import { useQrScannerHtml5 } from "../../hooks/use-qr-scaner";
// import "../../styles/qr-reader.css";

interface QrScannerHtml5Props {
  onScanResult?: (isValid: boolean, accessCode?: string) => void;
}

export const QrScannerHtml5: React.FC<QrScannerHtml5Props> = ({
  onScanResult,
}) => {
  const {
    scanning,
    error,
    hasResult,
    isValid,
    accessCode,
    isLoading,
    elementId,
    startScanning,
    stopScanning,
    resetScanner,
    retryScanning,
  } = useQrScannerHtml5({ onScanResult });

  if (hasResult) {
    return (
      <QrValidationResult
        isValid={isValid}
        accessCode={accessCode}
        onReset={resetScanner}
        onRetry={retryScanning}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary">Validador QR</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 w-full">
          <p className="text-red-700 text-sm text-center">{error}</p>
        </div>
      )}

      <p className="text-center text-gray-600 mb-6">
        {scanning
          ? "Apunta la cámara hacia el código QR para escanearlo"
          : "Presiona el botón para comenzar a escanear códigos QR"}
      </p>

      {scanning && (
        <div className="w-full mb-6 relative">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-[300px]">
            <div
              id={elementId}
              className="w-full"
              style={{ minHeight: "300px" }}
            ></div>

            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">
                    Validando código QR...
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <div
                className={`w-2 h-2 rounded-full ${
                  scanning ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></div>
              {scanning ? "Escaneando..." : "Inactivo"}
            </div>
            {process.env.NODE_ENV === "development" && scanning && (
              <div className="mt-1 text-xs text-blue-500">
                Debug: Escáner HTML5 activo - Detector de alta precisión
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-4 w-full">
        {!scanning ? (
          <Button
            onClick={startScanning}
            className="flex-1 bg-primary hover:bg-primary/90 text-white py-3"
            size="lg"
          >
            <Camera className="w-4 h-4 mr-2" />
            Iniciar Escáner
          </Button>
        ) : (
          <Button
            onClick={stopScanning}
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-white py-3"
            size="lg"
          >
            <CameraOff className="w-4 h-4 mr-2" />
            Detener Escáner
          </Button>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Escáner de alta precisión - Funciona mejor con buena iluminación
        </p>
      </div>
    </div>
  );
};

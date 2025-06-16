import { useState, useRef, useCallback, useEffect } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useValidateQr } from "./use-validate-qr";

interface ValidationResult {
  isValid: boolean;
  accessCode: string;
  isLoading: boolean;
}

interface UseQrScannerHtml5Props {
  onScanResult?: (isValid: boolean, accessCode?: string) => void;
}

export const useQrScannerHtml5 = ({
  onScanResult,
}: UseQrScannerHtml5Props = {}) => {
  const [scanning, setScanning] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const isProcessingRef = useRef(false);
  const elementId = "qr-reader";

  const { onSubmit } = useValidateQr();

  const handleScanSuccess = async (decodedText: string, decodedResult: any) => {
    if (validationResult?.isLoading || isProcessingRef.current) return;

    console.log("QR Code detectado:", decodedText);
    isProcessingRef.current = true;

    setValidationResult({
      isValid: false,
      accessCode: decodedText,
      isLoading: true,
    });

    try {
      const isValid = await onSubmit({ accessCode: decodedText });

      setValidationResult({
        isValid,
        accessCode: decodedText,
        isLoading: false,
      });

      onScanResult?.(isValid, decodedText);
      await stopScanning();
    } catch (error) {
      console.error("Error validating QR:", error);
      setValidationResult({
        isValid: false,
        accessCode: decodedText,
        isLoading: false,
      });
      onScanResult?.(false, decodedText);
      await stopScanning();
    }
  };

  const handleScanError = (errorMessage: string) => {
    if (!errorMessage.includes("No QR code found")) {
      console.log("Error scanning:", errorMessage);
    }
  };

  const startScanning = useCallback(async () => {
    console.log("Iniciando escáner HTML5...");
    setScanning(true);
    setValidationResult(null);
    setError(null);
    isProcessingRef.current = false;

    setTimeout(async () => {
      try {
        const element = document.getElementById(elementId);
        if (!element) {
          throw new Error(`HTML Element with id=${elementId} not found`);
        }

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          disableFlip: false,
          videoConstraints: {
            facingMode: "environment",
          },
        };

        scannerRef.current = new Html5QrcodeScanner(elementId, config, false);

        scannerRef.current.render(handleScanSuccess, handleScanError);

        console.log("Escáner inicializado correctamente");
      } catch (err) {
        console.error("Error al inicializar escáner:", err);
        setError(
          "Error al inicializar el escáner. Verifica los permisos de cámara."
        );
        setScanning(false);
      }
    }, 100);
  }, []);

  const stopScanning = useCallback(async () => {
    console.log("Deteniendo escáner...");
    setScanning(false);
    isProcessingRef.current = false;

    try {
      if (scannerRef.current) {
        await scannerRef.current.clear();
        scannerRef.current = null;
      }

      if (html5QrcodeRef.current) {
        await html5QrcodeRef.current.stop();
        html5QrcodeRef.current = null;
      }
    } catch (err) {
      console.error("Error deteniendo escáner:", err);
    }
  }, []);

  const resetScanner = useCallback(async () => {
    console.log("Reseteando escáner...");
    await stopScanning();
    setValidationResult(null);
    setError(null);
    isProcessingRef.current = false;
  }, [stopScanning]);

  const retryScanning = useCallback(async () => {
    await resetScanner();
    setTimeout(() => {
      startScanning();
    }, 1000);
  }, [resetScanner, startScanning]);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
      if (html5QrcodeRef.current) {
        html5QrcodeRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return {
    scanning,
    validationResult,
    error,
    elementId,
    startScanning,
    stopScanning,
    resetScanner,
    retryScanning,
    isLoading: validationResult?.isLoading || false,
    hasResult: validationResult && !validationResult.isLoading,
    isValid: validationResult?.isValid || false,
    accessCode: validationResult?.accessCode || "",
  };
};

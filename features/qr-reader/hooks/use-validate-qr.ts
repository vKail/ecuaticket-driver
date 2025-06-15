import { QrReaderApi } from "../api/qr-reader.api";
import { QrReaderValidate } from "../types/qr-reader.interface";

export const useValidateQr = () => {
  const onSubmit = async (accessCode: QrReaderValidate): Promise<boolean> => {
    try {
      const isValid = await QrReaderApi.getInstance().validate(accessCode);
      return isValid;
    } catch (error) {
      console.error("Error validating QR code:", error);
      return false;
    }
  };

  return { onSubmit };
};

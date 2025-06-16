import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { QrReaderValidate } from "../types/qr-reader.interface";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

interface QrReaderProps {
  validate: (accessCode: QrReaderValidate) => Promise<boolean>;
}

export class QrReaderApi implements QrReaderProps {
  readonly httpClient: HttpHandler;
  static instance: QrReaderApi;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  async validate(accessCode: QrReaderValidate): Promise<boolean> {
    const { success } = await this.httpClient.post(
      API_ROUTES.QR_READER.VALIDATE,
      accessCode
    );
    return success;
  }

  static getInstance(): QrReaderApi {
    if (!QrReaderApi.instance) {
      QrReaderApi.instance = new QrReaderApi();
    }
    return QrReaderApi.instance;
  }
}

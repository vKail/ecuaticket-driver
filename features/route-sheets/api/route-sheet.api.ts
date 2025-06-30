import { HttpHandler, HttpResponse } from "@/core/interfaces/HttpHandler";
import { RouteSheetsApiResponse } from "../types/route-sheet.interface";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

// Temporary interface to align with the actual AxiosClient implementation
// without modifying shared files.
interface LenientHttpHandler extends HttpHandler {
  get<T>(url: string, config?: any): Promise<T>;
}

interface RouteSheetProps {
  getRouteSheetsByDriver(date: string): Promise<RouteSheetsApiResponse>;
}

export class RouteSheetApi implements RouteSheetProps {
  private static instance: RouteSheetApi;
  private readonly httpHandler: LenientHttpHandler;

  private constructor() {
    this.httpHandler = AxiosClient.getInstance() as LenientHttpHandler;
  }

  public static getInstance(): RouteSheetApi {
    if (!RouteSheetApi.instance) {
      RouteSheetApi.instance = new RouteSheetApi();
    }
    return RouteSheetApi.instance;
  }

  public async getRouteSheetsByDriver(
    date: string
  ): Promise<RouteSheetsApiResponse> {
    const response = await this.httpHandler.get<RouteSheetsApiResponse>(
      `${API_ROUTES.ROUTE_SHEETS.GET_BY_DRIVER}?date=${date}`
    );
    return response;
  }
} 
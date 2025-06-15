import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { LoginRequest } from "../types/auth-login-schema";
import { LoginResponse } from "../types/login.interface";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

export class AuthApiClient {
  private httpClient: HttpHandler;
  private static instance: AuthApiClient;

  private constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  public async login(user: LoginRequest): Promise<LoginResponse> {
    const { data } = await this.httpClient.post<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      user
    );
    return data;
  }

  public static getInstance(): AuthApiClient {
    if (!AuthApiClient.instance) {
      AuthApiClient.instance = new AuthApiClient();
    }
    return AuthApiClient.instance;
  }
}

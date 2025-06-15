import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HTTP_STATUS_CODE } from "@/core/constants/HttpStatus";
import { HttpHandler, HttpResponse } from "@/core/interfaces/HttpHandler";
import { getToken } from "@/core/utils/TokenUtils";
import { toast } from "sonner";

export class AxiosClient implements HttpHandler {
  private static instance: AxiosClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token.replaceAll('"', "")}`;
      }
      return config;
    });
    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (response.data && typeof response.data.success === "boolean") {
          const { success, message } = response.data;

          if (
            message &&
            Array.isArray(message.content) &&
            message.content.length > 0
          ) {
            if (success && !["get"].includes(response.config.method || "")) {
              toast.success(message.content[0], {
                duration: 2000,
                position: "top-right",
                style: {
                  background: "#4caf50",
                  color: "#fff",
                },
              });
            } else if (!success && message.displayable) {
              toast.error(message.content[0], {
                duration: 2000,
                position: "top-right",
                style: {
                  background: "#f44336",
                  color: "#fff",
                },
              });
              return Promise.reject({ response: { data: response.data } });
            }
          }
        }

        return response;
      },
      (error) => {
        if (error.response) {
          let errorMessage = "Error desconocido";

          if (error.response.data && error.response.data.message) {
            if (
              Array.isArray(error.response.data.message.content) &&
              error.response.data.message.content.length > 0
            ) {
              errorMessage = error.response.data.message.content[0];
            } else if (typeof error.response.data.message === "string") {
              errorMessage = error.response.data.message;
            }
          } else if (
            error.response.data &&
            error.response.data.status &&
            error.response.data.status.message
          ) {
            errorMessage = error.response.data.status.message;
          }

          toast.error(errorMessage, {
            duration: 2000,
            position: "top-right",
            style: {
              background: "#f44336",
              color: "#fff",
            },
          });

          if (error.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
            if (typeof window !== "undefined") {
              document.dispatchEvent(new CustomEvent("unauthorized"));
            }
          }

          if (error.response.status === HTTP_STATUS_CODE.FORBIDDEN) {
            if (typeof window !== "undefined") {
              window.location.href = "/dashboard";
            }
          }
        } else {
          toast.error(
            "Error de conexión. Por favor, verifica tu conexión a internet.",
            {
              duration: 2000,
              position: "top-right",
              style: {
                background: "#f44336",
                color: "#fff",
              },
            }
          );
        }

        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }
    return AxiosClient.instance;
  }

  public async get<T>(url: string, config: AxiosRequestConfig): Promise<T> {
    const promise = this.axiosInstance.get<T>(url, config);
    const response: AxiosResponse<T> = await promise;
    return response.data;
  }

  public async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const promise = this.axiosInstance.post<HttpResponse<T>>(url, data, config);
    const response: AxiosResponse<HttpResponse<T>> = await promise;
    return response.data;
  }

  public async put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const promise = this.axiosInstance.put<HttpResponse<T>>(url, data, config);
    const response: AxiosResponse<HttpResponse<T>> = await promise;
    return response.data;
  }

  public async delete<T>(
    url: string,
    config: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const promise = this.axiosInstance.delete<HttpResponse<T>>(url, config);
    const response: AxiosResponse<HttpResponse<T>> = await promise;
    return response.data;
  }

  public async patch<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const promise = this.axiosInstance.patch<HttpResponse<T>>(
      url,
      data,
      config
    );
    const response: AxiosResponse<HttpResponse<T>> = await promise;
    return response.data;
  }
}

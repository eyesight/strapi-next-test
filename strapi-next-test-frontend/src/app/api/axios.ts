import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosHttpClient {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_REACT_APP_AUTH_TOKEN,
      },
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  private handleResponse({ data }: AxiosResponse) {
    return data;
  }

  private handleError(error: any) {
    // You can add more error processing logic here
    return Promise.reject(error);
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    return this.instance.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    return this.instance.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    return this.instance.put<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    return this.instance.delete<T>(url, config);
  }

  // You can add more HTTP methods (PATCH, OPTIONS, etc.) as needed.
}

export default AxiosHttpClient;

export interface HttpResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

export interface HttpAdapter {
  get<T = unknown>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
  post<T = unknown>(url: string, body?: unknown, config?: RequestInit): Promise<HttpResponse<T>>;
  put<T = unknown>(url: string, body?: unknown, config?: RequestInit): Promise<HttpResponse<T>>;
  delete<T = unknown>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
}

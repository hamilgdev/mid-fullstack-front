import type { HttpAdapter, HttpResponse } from "@/interfaces/http-adapter.interface";

export class FetchHttpAdapter implements HttpAdapter {
  private baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string, config: RequestInit = {}): Promise<HttpResponse<T>> {
    const response = await fetch(this.baseUrl + url, {
      ...config,
      method: 'GET',
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(url: string, body?: unknown, config: RequestInit = {}): Promise<HttpResponse<T>> {
    const response = await fetch(this.baseUrl + url, {
      ...config,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : null,
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(url: string, body?: unknown, config: RequestInit = {}): Promise<HttpResponse<T>> {
    const response = await fetch(this.baseUrl + url, {
      ...config,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : null,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(url: string, body?: unknown, config: RequestInit = {}): Promise<HttpResponse<T>> {
    const response = await fetch(this.baseUrl + url, {
      ...config,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : null,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string, config: RequestInit = {}): Promise<HttpResponse<T>> {
    const response = await fetch(this.baseUrl + url, {
      ...config,
      method: 'DELETE',
    });
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<HttpResponse<T>> {
    const data = (await response.json().catch(() => null)) as T;
    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  }
}

import { getToken } from "./cookies";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

class APIError extends Error {
  public readonly statusCode: number;
  public readonly errors?: object[];

  constructor(statusCode: number, message: string, errors?: object[]) {
    super(message);

    Object.setPrototypeOf(this, APIError.prototype);

    this.statusCode = statusCode || 500;
    this.message = message || "Something went wrong. Please try again.";
    this.errors = errors || undefined;

    Error.captureStackTrace(this, this.constructor);
  }
}

export type ClientError = InstanceType<typeof APIError>;

const fetcher = async <R>(url: string, init: RequestInit = {}): Promise<R> => {
  const token = await getToken();

  console.log(`${API_URL}${url}`);

  const response = await fetch(`${API_URL}${url}`, {
    ...init,
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ClientError;
    throw new APIError(error.statusCode, error.message, error.errors);
  }

  const data = (await response.json()) as R;

  return data;
};

const client = {
  get: <T>(url: string, options: RequestInit = {}) => fetcher<T>(url, options),
  post: <T, R>(url: string, data: T, options: RequestInit = {}) =>
    fetcher<R>(url, { method: "POST", body: JSON.stringify(data), ...options }),
  put: <T, R>(url: string, data: T, options: RequestInit = {}) =>
    fetcher<R>(url, { method: "PUT", body: JSON.stringify(data), ...options }),
  delete: <T>(url: string, options: RequestInit = {}) =>
    fetcher<T>(url, { method: "DELETE", ...options }),
};

export default client;

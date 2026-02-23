import { HTTP_ERROR_MESSAGES } from "shared/constances/error.constants";

export interface RejectedDataType {
  readonly title: string;
  readonly message?: string;
  readonly status?: number;
}

export type ErrorNumber =
  | "400"
  | "401"
  | "402"
  | "403"
  | "404"
  | "408"
  | "409"
  | "410"
  | "413"
  | "422"
  | "429"
  | "500"
  | "501"
  | "502"
  | "503"
  | "504"
  | "505";


export const isValidHttpStatus = (status: number): status is number & keyof typeof HTTP_ERROR_MESSAGES => {
  return Object.keys(HTTP_ERROR_MESSAGES).includes(String(status));
};

export const getHttpErrorMessage = (status: number): RejectedDataType | null => {
  const statusKey = String(status) as ErrorNumber;
  
  if (statusKey in HTTP_ERROR_MESSAGES) {
    return {
      ...HTTP_ERROR_MESSAGES[statusKey],
      status
    };
  }
  
  return null;
};

export interface ErrorInfo {
  title: string;
  message: string;
  status?: number;
  statusText?: string;
  timestamp: number;
  source: "route" | "api" | "app" | "unknown";
}

export interface ErrorWithStatus {
  status: number;
  message?: string;
}

export interface ErrorWithMessage {
  message: string;
}

export const isErrorWithStatus = (error: unknown): error is ErrorWithStatus => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as ErrorWithStatus).status === "number"
  );
};

export const isErrorWithMessage = (
  error: unknown,
): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ErrorWithMessage).message === "string"
  );
};

export const isRejectedDataType = (error: unknown): error is RejectedDataType => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'title' in error &&
    typeof (error as RejectedDataType).title === 'string'
  );
};
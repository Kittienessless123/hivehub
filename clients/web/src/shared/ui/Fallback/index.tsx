import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import styled from "styled-components";
import { Text } from "../Text";
import ErrorImage from "../../assets/RedErrorIcon.svg";
import { centerContent } from "shared/lib/styled/centerContent";
import {
  type RejectedDataType,
  type ErrorInfo,
  isErrorWithStatus,
  isErrorWithMessage,
  isValidHttpStatus,
  getHttpErrorMessage,
  isRejectedDataType,
} from "shared/types/error.types";

interface FallbackProps {
  status?: number;
  message?: string;
  customTitle?: string;
  showHomeLink?: boolean;
  error?: RejectedDataType | Error | string | null;
  onRetry?: () => void;
}

function getErrorMessage(error: unknown, props?: FallbackProps): ErrorInfo {
  const timestamp = Date.now();

  // 1. Если переданы пропсы с сообщением
  if (props?.message) {
    return {
      title: props.customTitle || "Ошибка",
      message: props.message,
      status: props.status,
      source: "app",
      timestamp,
    };
  }

  // 2. Если передан error пропс типа RejectedDataType
  if (props?.error && isRejectedDataType(props.error)) {
    return {
      title: props.customTitle || props.error.title || "Ошибка запроса",
      message:
        props.error.message ||
        props.error.title ||
        "Произошла ошибка при выполнении запроса",
      status: props.error.status,
      source: "api",
      timestamp,
    };
  }

  // 3. Если передан error пропс типа Error
  if (props?.error && props.error instanceof Error) {
    return {
      title: props.customTitle || "Ошибка приложения",
      message: props.error.message,
      source: "app",
      timestamp,
    };
  }

  // 4. Если передан error пропс типа string
  if (props?.error && typeof props.error === "string") {
    return {
      title: props.customTitle || "Ошибка",
      message: props.error,
      source: "app",
      timestamp,
    };
  }

  // 5. Обработка ошибок маршрута
  if (isRouteErrorResponse(error)) {
    // Используем хелпер для получения сообщения по статусу
    const httpError = isValidHttpStatus(error.status)
      ? getHttpErrorMessage(error.status)
      : null;

    return {
      title: httpError?.title || error.statusText || "Ошибка маршрута",
      message:
        httpError?.message ||
        (typeof error.data === "object" && error.data && "message" in error.data
          ? String(error.data.message)
          : "Произошла ошибка при загрузке страницы"),
      status: error.status,
      statusText: error.statusText,
      source: "route",
      timestamp,
    };
  }

  // 6. Обработка RejectedDataType
  if (isRejectedDataType(error)) {
    const httpError =
      error.status && isValidHttpStatus(error.status)
        ? getHttpErrorMessage(error.status)
        : null;

    return {
      title: httpError?.title || error.title || "Ошибка запроса",
      message:
        error.message ||
        httpError?.message ||
        "Произошла ошибка при выполнении запроса",
      status: error.status,
      source: "api",
      timestamp,
    };
  }

  // 7. Обработка ошибок с HTTP статусом
  if (isErrorWithStatus(error)) {
    const httpError = isValidHttpStatus(error.status)
      ? getHttpErrorMessage(error.status)
      : null;

    return {
      title: httpError?.title || `Ошибка ${error.status}`,
      message: httpError?.message || error.message || "Произошла ошибка",
      status: error.status,
      source: "api",
      timestamp,
    };
  }

  // 8. Обработка стандартных Error объектов
  if (error instanceof Error) {
    return {
      title: "Ошибка приложения",
      message: error.message || "Произошла ошибка в приложении",
      source: "app",
      timestamp,
    };
  }

  // 9. Обработка ошибок с message
  if (isErrorWithMessage(error)) {
    return {
      title: "Ошибка",
      message: error.message,
      source: "unknown",
      timestamp,
    };
  }

  // 10. Обработка строковых ошибок
  if (typeof error === "string") {
    return {
      title: "Ошибка",
      message: error,
      source: "unknown",
      timestamp,
    };
  }

  // 11. Если ничего не подошло
  return {
    title: "Что-то пошло не так",
    message: "Произошла неизвестная ошибка",
    source: "unknown",
    timestamp,
  };
}

const FallbackContainer = styled.div`
  width: 100vw;
  height: 100vh;
  ${centerContent}
  flex-direction: column;
  background-color: ${({ theme }) => theme.components.background.primary};

  img {
    max-height: 180px;
    margin-bottom: ${({ theme }) => theme.spacing.l};
  }

  .fallback__title {
    margin-bottom: ${({ theme }) => theme.spacing.s};
    color: ${({ theme }) => theme.components.text.primary};
  }

  .fallback__describe {
    margin-bottom: ${({ theme }) => theme.spacing.m};
    color: ${({ theme }) => theme.components.text.secondary};
    font-size: 18px;

    span {
      margin-left: ${({ theme }) => theme.spacing.xs};
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.s}`};
      background-color: ${({ theme }) => theme.components.background.tertiary};
      border-radius: ${({ theme }) => theme.borderRadius.s};
      font-weight: 500;
    }
  }

  .fallback__status {
    margin-bottom: ${({ theme }) => theme.spacing.m};

    span {
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.m}`};
      background-color: ${({ theme }) => theme.colors.danger}20;
      color: ${({ theme }) => theme.colors.danger};
      border-radius: ${({ theme }) => theme.borderRadius.l};
      font-weight: 600;
      font-size: 14px;
    }
  }

  .fallback__link {
    color: ${({ theme }) => theme.components.text.link};
    padding: ${({ theme }) => theme.spacing.m};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    transition: all 0.2s ease;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;

    &:hover {
      color: ${({ theme }) => theme.components.text.linkHover};
      background-color: ${({ theme }) => theme.components.state.hover};
    }

    &:active {
      transform: translateY(1px);
    }
  }

  .fallback__actions {
    display: flex;
    gap: ${({ theme }) => theme.spacing.m};
    margin-top: ${({ theme }) => theme.spacing.m};
  }
`;

export function Fallback(props?: FallbackProps) {
  const routeError = useRouteError();
  const error = routeError || props?.error;

  const errorInfo = getErrorMessage(error, props);

  return (
    <FallbackContainer role="alert">
      <img src={ErrorImage} alt="Error icon" />

      <Text className="fallback__title" size="32px" weight="600">
        {errorInfo.title}
      </Text>

      {errorInfo.status && (
        <div className="fallback__status">
          <span>
            Статус: {errorInfo.status}
            {errorInfo.statusText && ` (${errorInfo.statusText})`}
          </span>
        </div>
      )}

      <div className="fallback__describe">
        {errorInfo.message}
        {errorInfo.source && (
          <span style={{ marginLeft: "8px", opacity: 0.7, fontSize: "14px" }}>
            [
            {errorInfo.source === "route"
              ? "Маршрут"
              : errorInfo.source === "api"
                ? "API"
                : errorInfo.source === "app"
                  ? "Приложение"
                  : "Неизвестно"}
            ]
          </span>
        )}
      </div>

      <div className="fallback__actions">
        {props?.onRetry && (
          <button onClick={props.onRetry} className="fallback__link">
            ⟳ Попробовать снова
          </button>
        )}

        {props?.showHomeLink !== false && (
          <Link to="/" className="fallback__link">
            ← Вернуться на главную
          </Link>
        )}
      </div>
    </FallbackContainer>
  );
}

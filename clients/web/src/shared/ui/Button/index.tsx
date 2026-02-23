import React from "react";
import styled, { css } from "styled-components";
import { borderRadius } from "shared/lib/styled/borderRadius";
import { centerContent } from "shared/lib/styled/centerContent";
import { Loader } from "shared/ui/Loader"; 

type ButtonType = "primary" | "secondary" | "ghost";

type ButtonProps = {
  $type?: ButtonType;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  children? :React.ReactNode;
};

type ButtonPickedProps = Omit<
  ButtonProps,
  "icon" | "href" | "onClick" | "text" | "loading"
>;

const IconButtonWrapper = styled.button<ButtonPickedProps>`
  ${centerContent}
  ${borderRadius.round}
  
  background-color: ${({ theme, $type, disabled }) => {
    if (disabled) return theme.components.button.disabled;

    switch ($type) {
      case "primary":
        return theme.components.button.primary;
      case "secondary":
        return theme.components.button.secondary;
      case "ghost":
        return theme.components.button.ghost;
      default:
        return theme.components.button.primary;
    }
  }};

  color: ${({ theme, $type, disabled }) => {
    if (disabled) return theme.components.text.disabled;

    switch ($type) {
      case "primary":
        return theme.components.text.primary;
      case "secondary":
        return theme.components.text.secondary;
      case "ghost":
        return theme.components.text.link;
      default:
        return theme.components.text.primary;
    }
  }};

  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        filter: brightness(0.95);
      `}
  }
`;

const ButtonComponents = styled.button<ButtonPickedProps & { $hasIcon?: boolean; $hasText?: boolean }>`
  background-color: ${({ theme, $type, disabled }) => {
    if (disabled) return theme.components.button.disabled;

    switch ($type) {
      case "primary":
        return theme.components.button.primary;
      case "secondary":
        return theme.components.button.secondary;
      case "ghost":
        return theme.components.button.ghost;
      default:
        return theme.components.button.primary;
    }
  }};

  color: ${({ theme, $type, disabled }) => {
    if (disabled) return theme.components.text.disabled;

    switch ($type) {
      case "primary":
        return theme.components.text.primary;
      case "secondary":
        return theme.components.text.secondary;
      case "ghost":
        return theme.components.text.link;
      default:
        return theme.components.text.primary;
    }
  }};

  padding: ${({ theme }) => theme.spacing.m}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        filter: brightness(0.95);
      `}
  }
`;

export const Button = (props: ButtonProps) => {
  const { $type, icon, onClick, text, href, disabled = false, loading = false, children, ...rest } = props;

  // Если есть href - рендерим ссылку
  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        <ButtonComponents
          as="span"
          disabled={disabled}
          $type={$type}
          {...rest}
        >
          {loading && <Loader />}
          {!loading && icon}
          {!loading && text && <span>{text}</span>}
        </ButtonComponents>
      </a>
    );
  }

  // Если только иконка (без текста) - круглая кнопка
  if (!text && icon) {
    return (
      <IconButtonWrapper
        onClick={onClick}
        disabled={disabled || loading}
        $type={$type}
        {...rest}
      >
        {loading ? <Loader /> : icon}
      </IconButtonWrapper>
    );
  }

  // Обычная кнопка с текстом и опциональной иконкой
  return (
    <ButtonComponents
      onClick={onClick}
      disabled={disabled || loading}
      $type={$type}
      $hasIcon={!!icon}
      $hasText={!!text}
      {...rest}
    >
      {loading && <Loader />}
      {!loading && icon}
      {!loading && text && <span>{text}</span>}{children}
    </ButtonComponents>
  );
};
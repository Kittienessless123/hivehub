import React, {forwardRef } from "react";
import styled, { css, type DefaultTheme } from "styled-components";
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
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
};

type ButtonStyleProps = {
  $type?: ButtonType;
  disabled?: boolean;
  $hasIcon?: boolean;
  $hasText?: boolean;
  $isIconOnly?: boolean;
};

type ThemedProps = ButtonStyleProps & { theme: DefaultTheme };

// Утилиты для получения цветов на основе типа и состояния
const getBackgroundColor = (props: ThemedProps): string => {
  const { theme, $type, disabled } = props;
  if (disabled) return theme.components.button.disabled;
  
  switch ($type) {
    case "primary": return theme.components.button.primary;
    case "secondary": return theme.components.button.secondary;
    case "ghost": return theme.components.button.ghost;
    default: return theme.components.button.primary;
  }
};

const getTextColor = (props: ThemedProps): string => {
  const { theme, $type, disabled } = props;
  if (disabled) return theme.components.text.disabled;
  
  switch ($type) {
    case "primary": return theme.components.text.inverse;
    case "secondary": return theme.components.text.primary;
    case "ghost": return theme.components.text.link;
    default: return theme.components.text.inverse;
  }
};

// Общие стили для кнопок
const buttonBaseStyles = css<ButtonStyleProps>`
  background-color: ${getBackgroundColor};
  color: ${getTextColor};
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
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

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Стили для обычной кнопки (с текстом)
const RegularButton = styled.button<ButtonStyleProps>`
  ${buttonBaseStyles}
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  gap: 8px;
  ${borderRadius.m};

  white-space: nowrap;
  overflow: hidden;

`;

// Стили для иконочной кнопки (без текста)
const StyledIconButton = styled.button<ButtonStyleProps>`
  ${buttonBaseStyles}
  ${centerContent}
  width: 40px;
  height: 40px;
  padding: 0;
  ${borderRadius.round};
`;

// Компонент содержимого кнопки для переиспользования
const ButtonContent: React.FC<{ loading?: boolean; icon?: React.ReactNode; text?: React.ReactNode }> = 
  ({ loading, icon, text }) => (
    <>
      {loading && <Loader />}
      {!loading && icon}
      {!loading && text && <span>{text}</span>}
    </>
  );

// Используем forwardRef для проброса ref
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { 
    $type, 
    icon, 
    onClick,
    text,
    children,
    href, 
    disabled = false, 
    loading = false,
    className,
    type = "button",
    "aria-label": ariaLabel,
    ...rest 
  } = props;

  const isIconOnly = !text && !!icon && !children;
  const commonProps = {
    disabled: disabled || loading,
    $type,
    className,
    "aria-label": ariaLabel || (typeof text === 'string' ? text : undefined),
    ...rest
  };

  const buttonContent = <ButtonContent loading={loading} icon={icon} text={text} />;

  // Если есть href - рендерим ссылку
  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        <RegularButton as="span" {...commonProps}>
          {buttonContent}{children}
        </RegularButton>
      </a>
    );
  }

  // Выбираем соответствующий компонент в зависимости от наличия текста
  if (isIconOnly) {
    return (
      <StyledIconButton
        ref={ref}
        type={type}
        onClick={onClick}
        {...commonProps}
      >
        {buttonContent}
        {children}
      </StyledIconButton>
    );
  }

  return (
    <RegularButton
      ref={ref}
      type={type}
      onClick={onClick}
      {...commonProps}
    >
      {buttonContent}
      {children}
    </RegularButton>
  );
});

Button.displayName = "Button";
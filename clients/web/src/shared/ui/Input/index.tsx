import { type InputHTMLAttributes, useState, useRef, forwardRef } from "react";
import { EyeClose } from "shared/assets/EyeClose";
import { EyeIcon } from "shared/assets/EyeIcon";
import { VALIDATION_RULES } from "shared/constances/validation.constants";
import type { ValidationRules } from "shared/types/validation.types";
import styled, { css } from "styled-components";


interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  id: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  validation?: ValidationRules;
  error?: string;
  success?: boolean;
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onValidate?: (isValid: boolean) => void;
}

const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'fit-content'};
  gap: ${({ theme }) => theme.spacing.xs};
`;

const InputContainer = styled.div<{ 
  $size: string; 
  $hasError?: boolean;
  $hasSuccess?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  background: ${({ theme }) => theme.components.background.primary};
  border: 1px solid ${({ theme, $hasError, $hasSuccess }) => 
    $hasError ? theme.components.border.error :
    $hasSuccess ? theme.colors.success :
    theme.components.border.default
  };
  transition: all 0.2s ease;
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
  
  ${({ $size, theme }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.s};
          min-height: 32px;
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.m} ${theme.spacing.l};
          min-height: 48px;
        `;
      default: 
        return css`
          padding: ${theme.spacing.s} ${theme.spacing.m};
          min-height: 40px;
        `;
    }
  }}
  
  &:focus-within {
    border-color: ${({ theme, $hasError }) => 
      $hasError ? theme.components.border.error : theme.components.border.focus
    };
    box-shadow: 0 0 0 2px ${({ theme, $hasError }) => 
      $hasError ? theme.colors.danger + '20' : theme.colors.primary + '20'
    };
  }
  
  &:hover:not(:focus-within) {
    border-color: ${({ theme, $hasError, $disabled }) => 
      !$disabled && ($hasError ? theme.components.border.error : theme.components.border.light)
    };
  }
`;

const IconWrapper = styled.span<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.components.text.secondary};
  font-size: 1.2em;
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  
  svg {
    width: 1.2em;
    height: 1.2em;
  }
  
  &:hover {
    color: ${({ $clickable, theme }) => $clickable ? theme.components.text.primary : 'inherit'};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.components.text.primary};
  font-size: inherit;
  line-height: 1.5;
  outline: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.components.text.disabled};
    opacity: 0.7;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const Label = styled.label<{ $required?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.components.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.xs};
  
  ${({ $required, theme }) => $required && css`
    &::after {
      content: ' *';
      color: ${theme.colors.danger};
      font-weight: bold;
    }
  `}
`;

const HelperText = styled.span<{ $error?: boolean; $success?: boolean }>`
  font-size: 12px;
  margin-left: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, $error, $success }) => 
    $error ? theme.colors.danger :
    $success ? theme.colors.success :
    theme.components.text.secondary
  };
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  id,
  icon,
  iconPosition = 'left',
  validation,
  error: externalError,
  success = false,
  helperText,
  size = 'medium',
  fullWidth = false,
  disabled = false,
  required = false,
  type = 'text',
  value,
  defaultValue,
  onChange,
  onBlur,
  onValidate,
  className,
  placeholder,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');
  const [internalError, setInternalError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const combinedRef = (node: HTMLInputElement) => {
    inputRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const validateInput = (val: string): string | null => {
    if (!validation) return null;
    
    // Required validation
    if (validation.required && (!val || val.trim() === '')) {
      return validation.required.message;
    }
    
    // Skip other validations if value is empty and not required
    if (!val || val.trim() === '') return null;
    
    // Email validation
    if (validation.email && type === 'email') {
      const rule = validation.email.pattern || VALIDATION_RULES.email.pattern;
      if (!rule.test(val)) {
        return validation.email.message || VALIDATION_RULES.email.message;
      }
    }
    
    // Password validation
    if (validation.password && type === 'password') {
      const rule = validation.password.pattern || VALIDATION_RULES.password.pattern;
      if (!rule.test(val)) {
        return validation.password.message || VALIDATION_RULES.password.message;
      }
    }
    
    // Min length validation
    if (validation.minLength && val.length < validation.minLength.min) {
      return validation.minLength.message;
    }
    
    // Max length validation
    if (validation.maxLength && val.length > validation.maxLength.max) {
      return validation.maxLength.message;
    }
    
    // Custom validation
    if (validation.custom?.validate) {
      if (!validation.custom.validate(val)) {
        return validation.custom.message;
      }
    }
    
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(e);
    
    if (touched) {
      const errorMsg = validateInput(newValue);
      setInternalError(errorMsg);
      onValidate?.(!errorMsg);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const errorMsg = validateInput(internalValue as string);
    setInternalError(errorMsg);
    onValidate?.(!errorMsg);
    onBlur?.(e);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const passwordIcon = type === 'password' && (
    <IconWrapper 
      $clickable 
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
    >
      {showPassword ? <EyeIcon></EyeIcon> : <EyeClose></EyeClose>}
    </IconWrapper>
  );

  const displayError = externalError || internalError;
  const displaySuccess = success && !displayError;

  return (
    <InputWrapper $fullWidth={fullWidth} className={className}>
      <Label htmlFor={id} $required={required}>
        {label}
      </Label>
      
      <InputContainer 
        $size={size}
        $hasError={!!displayError}
        $hasSuccess={displaySuccess}
        $disabled={disabled}
      >
        {icon && iconPosition === 'left' && (
          <IconWrapper aria-hidden="true">
            {icon}
          </IconWrapper>
        )}
        
        <StyledInput
          id={id}
          ref={combinedRef}
          type={inputType}
          value={value !== undefined ? value : internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          aria-invalid={!!displayError}
          aria-describedby={
            displayError ? `${id}-error` :
            helperText ? `${id}-helper` :
            undefined
          }
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <IconWrapper aria-hidden="true">
            {icon}
          </IconWrapper>
        )}
        
        {type === 'password' && passwordIcon}
      </InputContainer>
      
      {(displayError || helperText) && (
        <HelperText 
          id={displayError ? `${id}-error` : `${id}-helper`}
          $error={!!displayError}
          $success={displaySuccess}
          role={displayError ? 'alert' : undefined}
        >
          {displayError || helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
});

Input.displayName = 'Input';
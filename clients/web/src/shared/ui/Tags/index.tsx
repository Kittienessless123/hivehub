import React from "react";
import styled, { css, type DefaultTheme } from "styled-components";
import { centerContent } from "shared/lib/styled/centerContent";
import { borderRadius } from "shared/lib/styled/borderRadius";
import { transition } from "shared/lib/styled/transition";

type TagType = "close" | "delete";
type TagVariant = "filled" | "outlined" | "borderless";
type TagStatus = "processed" | "completed" | "failed" | "default";

interface TagsProps {
  key?: string | number;
  label: string;
  onAdd?: () => void;
  onClose?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  draggable?: boolean;
  type?: TagType;
  variant?: TagVariant;
  status?: TagStatus;
  addable?: boolean;
  clickable?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
}

const getStatusColors = (status: TagStatus, theme: DefaultTheme) => {
  switch (status) {
    case "completed":
      return {
        background: theme.colors.success + '20',
        color: theme.colors.success,
        border: theme.colors.success,
      };
    case "failed":
      return {
        background: theme.colors.danger + '20',
        color: theme.colors.danger,
        border: theme.colors.danger,
      };
    case "processed":
      return {
        background: theme.colors.info + '20',
        color: theme.colors.info,
        border: theme.colors.info,
      };
    default:
      return {
        background: theme.components.background.secondary,
        color: theme.components.text.primary,
        border: theme.components.border.default,
      };
  }
};

const getVariantStyles = (variant: TagVariant, colors: ReturnType<typeof getStatusColors>) => {
  switch (variant) {
    case "outlined":
      return css`
        background-color: transparent;
        border: 1px solid ${colors.border};
        color: ${colors.color};
      `;
    case "borderless":
      return css`
        background-color: transparent;
        border: none;
        color: ${colors.color};
        
        &:hover {
          background-color: ${colors.background};
        }
      `;
    default:
      return css`
        background-color: ${colors.background};
        border: 1px solid transparent;
        color: ${colors.color};
      `;
  }
};

const getSizeStyles = (size: string) => {
  switch (size) {
    case "small":
      return css`
        padding: 4px 8px;
        font-size: 12px;
        height: 24px;
      `;
    case "large":
      return css`
        padding: 8px 16px;
        font-size: 18px;
        height: 40px;
      `;
    default:
      return css`
        padding: 6px 12px;
        font-size: 14px;
        height: 32px;
      `;
  }
};

const TagsWrapper = styled.div<{ $addable?: boolean }>`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  background-color: ${({ theme, $addable }) => 
    $addable ? (theme as DefaultTheme).components.background.secondary : 'transparent'};
  border-radius: ${({ theme }) => (theme as DefaultTheme).borderRadius.m};
  padding: ${({ $addable }) => $addable ? '8px' : '0'};
  ${centerContent}
`;

const TagItem = styled.div<{
  $clickable?: boolean;
  $disabled?: boolean;
  $variant: TagVariant;
  $status: TagStatus;
  $size: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  ${borderRadius.s}
  ${transition}
  width: fit-content;
  cursor: ${({ $clickable, $disabled }) => 
    $clickable && !$disabled ? 'pointer' : $disabled ? 'not-allowed' : 'default'};
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  white-space: nowrap;
  
  ${({ $size }) => getSizeStyles($size)}
  ${({ $status, $variant, theme }) => {
    const colors = getStatusColors($status, theme as DefaultTheme);
    return getVariantStyles($variant, colors);
  }}

  &:hover {
    ${({ $clickable, $disabled, $status, $variant, theme }) => {
      if (!$clickable || $disabled) return '';
      
      const colors = getStatusColors($status, theme as DefaultTheme);
      if ($variant === 'borderless') {
        return css`
          background-color: ${colors.background};
        `;
      }
      return css`
        filter: brightness(0.95);
      `;
    }}
  }

  &:active {
    ${({ $clickable, $disabled }) => 
      $clickable && !$disabled ? 'transform: translateY(1px);' : ''}
  }
`;

const TagLabel = styled.span`
  line-height: 1;
`;

const TagIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  
  svg {
    width: 1em;
    height: 1em;
  }
`;

const CloseButton = styled.button<{ $type: TagType; $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 2px;
  margin: -2px 0;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 0.6};
  color: currentColor;
  font-size: 1.2em;
  line-height: 1;
  ${transition}

  &:hover {
    opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
    transform: ${({ $disabled }) => $disabled ? 'none' : 'scale(1.1)'};
  }

  &:active {
    transform: ${({ $disabled }) => $disabled ? 'none' : 'scale(0.95)'};
  }

  ${({ $type, theme }) => $type === 'delete' && css`
    color: ${(theme as DefaultTheme).colors.danger};
    
    &:hover {
      color: ${(theme as DefaultTheme).colors.danger};
    }
  `}
`;

const AddableTag: React.FC<{ onAdd?: () => void; disabled?: boolean }> = ({ 
  onAdd, 
  disabled 
}) => (
  <TagItem
    $clickable={!disabled}
    $disabled={disabled}
    $variant="outlined"
    $status="default"
    $size="medium"
    onClick={disabled ? undefined : onAdd}
  >
    <TagIcon>+</TagIcon>
    <TagLabel>Добавить</TagLabel>
  </TagItem>
);

export const Tags: React.FC<TagsProps> = ({
  key,
  label,
  onAdd,
  onClose,
  onDelete,
  onClick,
  draggable = false,
  type = "close",
  variant = "filled",
  status = "default",
  addable = false,
  clickable = false,
  icon,
  disabled = false,
  className,
  size = "medium",
}) => {
  if (addable) {
    return (
      <TagsWrapper $addable>
        <AddableTag onAdd={onAdd} disabled={disabled} />
      </TagsWrapper>
    );
  }

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    if (type === "close" && onClose) {
      onClose();
    } else if (type === "delete" && onDelete) {
      onDelete();
    }
  };

  const actionIcon = type === "delete" ? "✕" : "✕";

  return (
    <TagsWrapper>
      <TagItem
        key={key}
        $clickable={clickable || !!onClick}
        $disabled={disabled}
        $variant={variant}
        $status={status}
        $size={size}
        onClick={disabled ? undefined : onClick}
        draggable={draggable}
        className={className}
      >
        {icon && <TagIcon>{icon}</TagIcon>}
        <TagLabel>{label}</TagLabel>
        {(onClose || onDelete) && (
          <CloseButton
            $type={type}
            $disabled={disabled}
            onClick={handleAction}
            aria-label={type === "close" ? "Закрыть" : "Удалить"}
          >
            {actionIcon}
          </CloseButton>
        )}
      </TagItem>
    </TagsWrapper>
  );
};

export const TagGroup: React.FC<{
  tags: Array<Omit<TagsProps, 'key'> & { key: string | number }>;
  onTagClose?: (key: string | number) => void;
  onTagDelete?: (key: string | number) => void;
  onTagClick?: (key: string | number) => void;
  addable?: boolean;
  onAdd?: () => void;
}> = ({
  tags,
  onTagClose,
  onTagDelete,
  onTagClick,
  addable = false,
  onAdd,
}) => (
  <TagsWrapper $addable={addable}>
    {tags.map((tag) => {
      const { key, ...tagProps } = tag;
      
      return (
        <Tags
          key={key} 
          {...tagProps}
          onClose={onTagClose ? () => onTagClose(key) : undefined}
          onDelete={onTagDelete ? () => onTagDelete(key) : undefined}
          onClick={onTagClick ? () => onTagClick(key) : undefined}
        />
      );
    })}
    {addable && <AddableTag onAdd={onAdd} />}
  </TagsWrapper>
);


/* 
   <Tags label="React" />
      <Tags label="TypeScript" status="completed" />
      <Tags label="Failed Task" status="failed" />
      <Tags label="Processing" status="processed" />

       <div style={{ display: 'flex', gap: '8px' }}>
        <Tags label="Filled" variant="filled" />
        <Tags label="Outlined" variant="outlined" />
        <Tags label="Borderless" variant="borderless" />
      </div>
      
      <h3>С разными статусами:</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Tags label="Completed" status="completed" />
        <Tags label="Failed" status="failed" />
        <Tags label="Processed" status="processed" />
      </div>

        <Tags 
        label="Click me" 
        clickable 
        onClick={handleClick} 
      />
      
      <h3>Тег с закрытием:</h3>
      <Tags 
        label="Close me" 
        type="close" 
        onClose={handleClose} 
      />
      
      <h3>Тег с удалением:</h3>
      <Tags 
        label="Delete me" 
        type="delete" 
        onDelete={handleDelete} 
      />
      
      <h3>Тег с иконкой и действиями:</h3>
      <Tags 
        label="Settings" 
        icon={<span>⚙️</span>}
        clickable
        onClick={() => console.log('Settings clicked')}
        onClose={() => console.log('Settings closed')}
      />

      */
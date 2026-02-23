import { type InputHTMLAttributes, useState, useRef, useEffect } from "react";
import { Button } from "shared/ui/Button/IconButton";
import { CloseIcon } from "shared/assets/CloseIcon";
import { EditIcon } from "shared/assets/EditIcon";
import { CheckIcon } from "shared/assets/CheckIcon";
import styled, { css } from "styled-components";
import { ScreenReaderText } from "./ScreenReaderText.tsx";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onSave?: (value: string) => Promise<void>;
  id: string;
}

// Стилизованные компоненты
const TextfieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s};
  border-radius: ${({ theme }) => theme.borderRadius.l};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.m};
  background: ${({ theme }) => theme.components.background.primary};
  color: ${({ theme }) => theme.components.text.primary};
  border: 1px solid ${({ theme }) => theme.components.border.default};
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: ${({ theme }) => theme.components.border.focus};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

const TextfieldHeader = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  margin-right: ${({ theme }) => theme.spacing.xl};
  background-color: transparent;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.components.text.secondary};
  cursor: pointer;
  user-select: none;
  
  &:hover {
    color: ${({ theme }) => theme.components.text.primary};
  }
`;

const Input = styled.input<{ $editMode: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  font-size: 16px;
  margin: ${({ theme }) => theme.spacing.xs};
  border: none;
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.components.text.primary};
  
  &:focus {
    outline: none;
  }
  
  ${({ $editMode, theme }) => !$editMode && css`
    cursor: default;
    opacity: 0.8;
    background-color: ${theme.components.background.secondary};
    border-radius: ${theme.borderRadius.m};
  `}
  
  &::placeholder {
    color: ${({ theme }) => theme.components.text.disabled};
    opacity: 0.7;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-right: ${({ theme }) => theme.spacing.m};
`;

// Стилизованная кнопка с тултипом
const StyledActionButton = styled(Button)`
  position: relative;
  
  &:focus::after {
    content: attr(aria-label);
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.components.background.tertiary};
    color: ${({ theme }) => theme.components.text.primary};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.s}`};
    border-radius: ${({ theme }) => theme.borderRadius.s};
    font-size: 12px;
    white-space: nowrap;
    border: 1px solid ${({ theme }) => theme.components.border.default};
    box-shadow: ${({ theme }) => theme.shadows.s};
    z-index: 1000;
    pointer-events: none;
  }
`;

export function EditableInput({ id, onSave, label, ...props }: TextFieldProps) {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);

  const closeEditMode = () => {
    setEditMode(false);
    editBtnRef.current?.focus();
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const onEditHandler = async () => {
    const currentValue = inputRef.current?.value || "";
    
    try {
      await onSave?.(currentValue);
      closeEditMode();
    } catch (error) {
      console.error("Failed to save:", error);
      // Здесь можно добавить уведомление об ошибке
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && editMode) {
      onEditHandler();
    } else if (e.key === "Escape" && editMode) {
      closeEditMode();
    }
  };

  useEffect(() => {
    if (!editMode) return;
    inputRef.current?.focus();
  }, [editMode]);

  const labelId = `label-${id}`;
  const cancelScreenReaderId = `cancel-screen-reader-text-${id}`;
  const editScreenReaderId = `edit-screen-reader-text-${id}`;

  return (
    <TextfieldWrapper>
      <TextfieldHeader>
        <Label id={labelId} htmlFor={id}>
          {label}
        </Label>
      </TextfieldHeader>
      
      <Input
        id={id}
        {...props}
        $editMode={editMode}
        readOnly={!editMode}
        ref={inputRef}
        aria-labelledby={labelId}
        onKeyDown={handleKeyDown}
      />

      {editMode && (
        <ActionsContainer>
          <ScreenReaderText id={cancelScreenReaderId}>
            Cancel editing
          </ScreenReaderText>

          <StyledActionButton
            icon={<CloseIcon />}
            onClick={closeEditMode}
            aria-label="Cancel"
            text=""
            type="button"
          />
        </ActionsContainer>
      )}
      
      <StyledActionButton
        text={editMode ? "Save" : "Edit"}
        icon={editMode ? <CheckIcon /> : <EditIcon />}
        onClick={editMode ? onEditHandler : openEditMode}
        ref={editBtnRef}
        aria-label={editMode ? "Save changes" : "Edit"}
        type="button"
      />
      
      <ScreenReaderText id={editScreenReaderId}>
        {editMode ? "Save changes" : "Edit"}
      </ScreenReaderText>
    </TextfieldWrapper>
  );
}
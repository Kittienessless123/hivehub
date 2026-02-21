import React from 'react';
import styled from 'styled-components';
import { rowBetween, centerVertical } from 'shared/lib/styled/flex';
import { borderRadius } from 'shared/lib/styled/borderRadius';
import { transition } from 'shared/lib/styled/transition';
import { CalendarIcon } from 'shared/assets/CalendarIcon';

const InputContainer = styled.div<{ $isOpen: boolean }>`
  ${rowBetween}
  ${centerVertical}
  width: 320px;
  height: 60px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.components.background.secondary};
  ${borderRadius.m}
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  gap: 12px;
  cursor: pointer;
  ${transition}
  border: 2px solid ${({ theme, $isOpen }) => 
    $isOpen ? theme.components.border.focus : 'transparent'};
  
  &:hover {
    border-color: ${({ theme }) => theme.components.border.focus};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  color: ${({ theme }) => theme.components.text.primary};
  background-color: ${({ theme }) => theme.components.background.primary};
  border: 2px solid ${({ theme }) => theme.components.border.default};
  ${borderRadius.s}
  font-size: 14px;
  ${transition}
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.components.text.disabled};
  }

  &:hover {
    border-color: ${({ theme }) => theme.components.border.focus};
  }

  &:focus {
    border-color: ${({ theme }) => theme.components.border.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.components.state.selected};
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  ${transition}
  color: ${({ theme }) => theme.components.text.secondary};
  
  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.components.text.primary};
  }
`;

interface DateInputProps {
  value: Date;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  placeholder?: string;
  isOpen: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({ 
  value, 
  onClick, 
  placeholder, 
  isOpen 
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.');
  };

  return (
    <InputContainer onClick={onClick} $isOpen={isOpen}>
      <StyledInput 
        type="text"
        value={formatDate(value)}
        placeholder={placeholder}
        readOnly
      />
      <IconWrapper>
        <CalendarIcon />
      </IconWrapper>
    </InputContainer>
  );
};
import React from 'react';
import styled, { css } from 'styled-components';
import { centerAll } from 'shared/lib/styled/flex';
import { borderRadius } from 'shared/lib/styled/borderRadius';
import { transition } from 'shared/lib/styled/transition';

interface CellButtonProps {
  $isCurrentMonth: boolean;
  $isSelected: boolean;
}

const CellButton = styled.button<CellButtonProps>`
  aspect-ratio: 1;
  width: 100%;
  border: none;
  background: transparent;
  ${borderRadius.s}
  font-size: 14px;
  cursor: pointer;
  ${centerAll}
  ${transition}
  color: ${({ theme, $isCurrentMonth }) => 
    $isCurrentMonth ? theme.components.text.primary : theme.components.text.disabled};
  font-weight: ${({ $isSelected }) => $isSelected ? 500 : 400};

  ${({ $isSelected, theme }) => $isSelected && css`
    background: ${theme.components.background.inverted};
    color: ${theme.components.text.inverse};
    box-shadow: 0 2px 8px ${theme.components.state.selected};
  `}

  &:hover:not(:disabled) {
    background: ${({ theme, $isSelected }) => 
      $isSelected ? theme.components.background.inverted : theme.components.state.hover};
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  onSelect: (date: Date) => void;
}

export const DayCell: React.FC<DayCellProps> = ({ 
  date, 
  isCurrentMonth, 
  isSelected, 
  onSelect 
}) => {
  const handleClick = () => {
    // eslint-disable-next-line no-constant-condition
    if (isCurrentMonth || true) { // Можно разрешить выбор дат из других месяцев
      onSelect(date);
    }
  };

  return (
    <CellButton
      $isCurrentMonth={isCurrentMonth}
      $isSelected={isSelected}
      onClick={handleClick}
      disabled={false}
    >
      {date.getDate()}
    </CellButton>
  );
};
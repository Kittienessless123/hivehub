import React from 'react';
import styled from 'styled-components';
import { rowBetween, centerVertical } from 'shared/lib/styled/flex';
import { borderRadius } from 'shared/lib/styled/borderRadius';
import { transition } from 'shared/lib/styled/transition';
import { ArrowLeftIcon } from 'shared/assets/ArrowLeftIcon';
import { ArrowRightIcon } from 'shared/assets/ArrowRightIcon';

const Header = styled.div`
  ${rowBetween}
  ${centerVertical}
  width: 100%;
  background-color: ${({ theme }) => theme.components.background.primary};
`;

const MonthYear = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.components.text.primary};
`;

const NavigationButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  ${borderRadius.round}
  cursor: pointer;
  ${centerVertical}
  justify-content: center;
  ${transition}
  color: ${({ theme }) => theme.components.text.secondary};

  &:hover {
    background: ${({ theme }) => theme.components.state.hover};
    color: ${({ theme }) => theme.components.text.primary};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth 
}) => {
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      month: 'short', 
      year: 'numeric' 
    }).replace(' ', ' ');
  };

  return (
    <Header>
      <NavigationButton onClick={onPrevMonth}>
        <ArrowLeftIcon />
      </NavigationButton>
      <MonthYear>{formatMonthYear(currentMonth)}</MonthYear>
      <NavigationButton onClick={onNextMonth}>
        <ArrowRightIcon />
      </NavigationButton>
    </Header>
  );
};
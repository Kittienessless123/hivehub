import React, { useState } from 'react';
import styled from 'styled-components';
import { CalendarHeader } from './CalendarHeader';
import { WeekDays } from './WeekDays';
import { CalendarGrid } from './CalendarGrid';
import { TodayButton } from '../TodayButton/TodayButton';

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.components.border.light};
  margin: 12px 0;
`;

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    onDateSelect(today);
  };

  return (
    <>
      <CalendarHeader 
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <Divider />
      <WeekDays />
      <CalendarGrid 
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />
      <Divider />
      <TodayButton onClick={handleToday} />
    </>
  );
};
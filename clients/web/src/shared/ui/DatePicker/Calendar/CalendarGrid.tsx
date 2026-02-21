import React from 'react';
import styled from 'styled-components';
import { DayCell } from './DayCell';

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentMonth, 
  selectedDate, 
  onDateSelect 
}) => {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Преобразуем в понедельник-первый (0 = понедельник)
  };

  const getDaysInPrevMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const daysInPrevMonth = getDaysInPrevMonth(currentMonth);
    
    const days = [];
    
    // Дни предыдущего месяца
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, day);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Дни следующего месяца (чтобы заполнить 6 рядов по 7 дней = 42)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  const days = generateDays();

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <DaysGrid>
      {days.map(({ date, isCurrentMonth }, index) => (
        <DayCell
          key={index}
          date={date}
          isCurrentMonth={isCurrentMonth}
          isSelected={isSelectedDate(date)}
          onSelect={onDateSelect}
        />
      ))}
    </DaysGrid>
  );
};
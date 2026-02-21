import React from 'react';
import styled from 'styled-components';
import { centerAll } from 'shared/lib/styled/flex';

const WeekDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
`;

const WeekDay = styled.div`
  ${centerAll}
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.components.text.secondary};
  padding: 8px 0;
`;

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const WeekDays: React.FC = () => {
  return (
    <WeekDaysGrid>
      {weekDays.map((day) => (
        <WeekDay key={day}>{day}</WeekDay>
      ))}
    </WeekDaysGrid>
  );
};
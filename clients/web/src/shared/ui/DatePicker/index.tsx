import React, { useState } from 'react';
import styled from 'styled-components';
import { DateInput } from './Input/DateInput';
import { PopupContainer } from './Popup/PopupContainer';
import { Calendar } from './Calendar/Calendar';
import { shadows } from 'shared/lib/styled/shadows';
import { borderRadius } from 'shared/lib/styled/borderRadius';
import { spacing } from 'shared/lib/styled/spacing';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
}

const PickerWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CalendarWrapper = styled.div`
  width: 340px;
  background: ${({ theme }) => theme.components.background.primary};
  ${borderRadius.m}
  ${shadows.medium}
  padding: 16px;
  display: flex;
  flex-direction: column;
  ${spacing.vertical.xs}
`;

export const DatePicker: React.FC<DatePickerProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Select date' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <PickerWrapper>
      <DateInput
        value={selectedDate}
        onClick={handleInputClick}
        placeholder={placeholder}
        isOpen={isOpen}
      />
      
      {isOpen && anchorEl && (
        <PopupContainer anchor={anchorEl} onClose={handleClose}>
          <CalendarWrapper>
            <Calendar 
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </CalendarWrapper>
        </PopupContainer>
      )}
    </PickerWrapper>
  );
};
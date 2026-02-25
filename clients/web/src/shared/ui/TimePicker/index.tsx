import styled from "styled-components";
import { useState } from "react";
import { PopupContainer } from "../DatePicker/Popup/PopupContainer";
import { TimeInput } from "./TimeInput";
import { TimeSelect } from "./TimeSelect";

interface TimePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
}

const PickerWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TimeWrapper = styled.div`
  width: 340px;
  background: ${({ theme }) => theme.components.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  box-shadow: ${({ theme }) => theme.shadows.l};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TimePicker: React.FC<TimePickerProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Select time' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date>(value || new Date());
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setIsOpen(!isOpen);
  };

  const handleTimeSelect = (hours: number, minutes: number, seconds: number) => {
    const newDate = new Date(selectedTime);
    newDate.setHours(hours, minutes, seconds);
    setSelectedTime(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <PickerWrapper>
      <TimeInput
        time={selectedTime}
        onClick={handleInputClick}
        $isOpen={isOpen}
        placeholder={placeholder}
      />
      
      {isOpen && anchorEl && (
        <PopupContainer anchor={anchorEl} onClose={handleClose}>
          <TimeWrapper>
            <TimeSelect
              onSelect={handleTimeSelect}
              onClose={handleClose}
              initialHours={selectedTime.getHours()}
              initialMinutes={selectedTime.getMinutes()}
              initialSeconds={selectedTime.getSeconds()}
            />
          </TimeWrapper>
        </PopupContainer>
      )}
    </PickerWrapper>
  );
};

export default TimePicker;
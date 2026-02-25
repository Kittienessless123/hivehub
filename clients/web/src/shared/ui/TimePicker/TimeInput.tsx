import { TimeIcon } from "shared/assets/TimeIcon";
import styled from "styled-components";

interface TimeInputProps {
  time: Date;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  $isOpen: boolean;
  placeholder?: string;
}

const InputContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  height: 60px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.components.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  box-shadow: ${({ theme }) => theme.shadows.s};
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid
    ${({ theme, $isOpen }) =>
      $isOpen ? theme.components.border.focus : "transparent"};

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
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;

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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.components.text.secondary};

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.components.text.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const TimeInput: React.FC<TimeInputProps> = ({
  time,
  onClick,
  $isOpen = false,
  placeholder = "Select time",
}) => {
  const formatTimeForDisplay = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <InputContainer onClick={onClick} $isOpen={$isOpen}>
      <StyledInput
        type="text"
        value={formatTimeForDisplay(time)}
        placeholder={placeholder}
        readOnly
      />
      <IconWrapper>
        <TimeIcon />
      </IconWrapper>
    </InputContainer>
  );
};

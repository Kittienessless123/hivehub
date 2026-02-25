import { useState } from "react";
import styled from "styled-components";

interface TimeSelectProps {
  onSelect?: (hours: number, minutes: number, seconds: number) => void;
  onClose?: () => void;
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}

const TimeSelectContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.components.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.m};
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Column = styled.div`
  flex: 1;
  text-align: center;
`;

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.components.text.secondary};
  margin-bottom: 8px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const List = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.components.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.s};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.components.background.secondary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.components.border.default};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.components.border.focus};
    }
  }
`;

const Item = styled.div<{ $selected: boolean }>`
  padding: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  transition: all 0.2s;
  background: ${({ $selected, theme }) =>
    $selected ? theme.components.state.selected : "transparent"};
  color: ${({ $selected, theme }) =>
    $selected ? theme.components.text.inverse : theme.components.text.primary};
  font-weight: ${({ $selected }) => ($selected ? "500" : "normal")};

  &:hover {
    background: ${({ $selected, theme }) =>
      $selected
        ? theme.components.state.selected
        : theme.components.state.hover};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const Button = styled.button<{ $variant: "primary" | "secondary" }>`
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? `
    background: ${theme.components.button.primary};
    color: white;
    
    &:hover {
      background: ${theme.components.button.primary}dd;
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.s};
    }
  `
      : `
    background: ${theme.components.button.secondary};
    color: ${theme.components.text.primary};
    
    &:hover {
      background: ${theme.components.button.secondary}dd;
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.s};
    }
  `}

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const TimeSelect: React.FC<TimeSelectProps> = ({
  onSelect,
  onClose,
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  const hoursArray = Array.from({ length: 24 }, (_, i) => i);
  const minutesArray = Array.from({ length: 60 }, (_, i) => i);
  const secondsArray = Array.from({ length: 60 }, (_, i) => i);

  const handleNow = () => {
    const now = new Date();
    setHours(now.getHours());
    setMinutes(now.getMinutes());
    setSeconds(now.getSeconds());
  };

  const handleOk = () => {
    onSelect?.(hours, minutes, seconds);
    onClose?.();
  };

  return (
    <TimeSelectContainer>
      <ColumnsContainer>
        <Column>
          <Label>HH</Label>
          <List>
            {hoursArray.map((h) => (
              <Item key={h} $selected={h === hours} onClick={() => setHours(h)}>
                {h.toString().padStart(2, "0")}
              </Item>
            ))}
          </List>
        </Column>
        <Column>
          <Label>MM</Label>
          <List>
            {minutesArray.map((m) => (
              <Item
                key={m}
                $selected={m === minutes}
                onClick={() => setMinutes(m)}
              >
                {m.toString().padStart(2, "0")}
              </Item>
            ))}
          </List>
        </Column>
        <Column>
          <Label>SS</Label>
          <List>
            {secondsArray.map((s) => (
              <Item
                key={s}
                $selected={s === seconds}
                onClick={() => setSeconds(s)}
              >
                {s.toString().padStart(2, "0")}
              </Item>
            ))}
          </List>
        </Column>
      </ColumnsContainer>

      <ActionsContainer>
        <Button $variant="secondary" onClick={handleNow}>
          Now
        </Button>
        <Button $variant="primary" onClick={handleOk}>
          OK
        </Button>
      </ActionsContainer>
    </TimeSelectContainer>
  );
};

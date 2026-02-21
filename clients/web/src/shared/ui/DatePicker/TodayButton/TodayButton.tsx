import React from 'react';
import styled from 'styled-components';
import { centerAll } from 'shared/lib/styled/flex';
import { borderRadius } from 'shared/lib/styled/borderRadius';
import { transition } from 'shared/lib/styled/transition';

const Button = styled.button`
  height: 40px;
  width: 100%;
  ${centerAll}
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.components.text.link};
  background: transparent;
  border: none;
  ${borderRadius.s}
  cursor: pointer;
  ${transition}
  margin-top: 8px;

  &:hover {
    background: ${({ theme }) => theme.components.state.hover};
    color: ${({ theme }) => theme.components.text.linkHover};
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface TodayButtonProps {
  onClick: () => void;
}

export const TodayButton: React.FC<TodayButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      Today
    </Button>
  );
};
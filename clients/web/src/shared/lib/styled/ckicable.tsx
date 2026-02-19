import { css } from "styled-components";

export const clickable = css`
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const clickableCard = css`
  ${clickable}
  border-radius: 12px;
  padding: 16px;
  background: white;
  border: 1px solid #eaeaea;
`;

export const clickableIcon = css`
  ${clickable}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

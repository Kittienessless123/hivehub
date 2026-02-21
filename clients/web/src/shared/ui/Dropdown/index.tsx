import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { type Option } from "../../types/Option.ts";
import { ArrowDownIcon } from "shared/assets/ArrowDownIcon.tsx";
import { transition } from "shared/lib/styled/transition";
import { borderRadius } from "shared/lib/styled/borderRadius";
import { shadows } from "shared/lib/styled/shadows";
import { centerVertical, rowBetween } from "shared/lib/styled/flex";

interface SelectProps {
  placeholder?: string;
  options: Option[];
  selected: Option | null;
  onChange: (selection: Option) => void;
}

interface SelectButtonProps {
  $isOpen: boolean;
}

const SelectWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const SelectButton = styled.div<SelectButtonProps>`
  ${rowBetween}
  ${centerVertical}
  background-color: ${({ theme }) => theme.components.background.primary};
  color: ${({ theme }) => theme.components.text.primary};
  padding: 10px 16px;
  border: 2px solid
    ${({ theme, $isOpen }) =>
      $isOpen
        ? theme.components.border.focus
        : theme.components.border.default};
  width: 12rem;
  cursor: pointer;
  ${borderRadius.m}
  ${transition}
  margin: 5px;
  gap: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.components.border.focus};
    background-color: ${({ theme }) => theme.components.state.hover};
  }

  &:active {
    transform: scale(0.98);
  }

  & span {
    font-size: 14px;
    font-weight: 400;
  }

  & svg {
    fill: ${({ theme }) => theme.components.text.secondary};
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
    transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  }
`;

const Placeholder = styled.span<{ $isSelected: boolean }>`
  color: ${({ theme, $isSelected }) =>
    $isSelected
      ? theme.components.text.primary
      : theme.components.text.disabled};
`;

const OptionsList = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
  margin-top: 4px;
  ${shadows.medium}
  ${borderRadius.m}
  overflow: hidden;
  background-color: ${({ theme }) => theme.components.background.primary};
  border: 1px solid ${({ theme }) => theme.components.border.default};
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const OptionItem = styled.div`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.components.background.primary};
  color: ${({ theme }) => theme.components.text.primary};
  font-size: 14px;
  cursor: pointer;
  ${transition}
  border-bottom: 1px solid ${({ theme }) => theme.components.border.light};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.components.state.hover};
    color: ${({ theme }) => theme.components.text.linkHover};
    padding-left: 20px;
  }

  &:active {
    background-color: ${({ theme }) => theme.components.state.active};
  }
`;

export const Select: React.FC<SelectProps> = ({
  placeholder = "Select option",
  selected,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectButton
        $isOpen={isOpen}
        onClick={handleToggle}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Placeholder $isSelected={!!selected}>
          {selected ? selected.label : placeholder}
        </Placeholder>
        <ArrowDownIcon />
      </SelectButton>

      {isOpen && (
        <OptionsList role="listbox">
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selected?.value === option.value}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectWrapper>
  );
};

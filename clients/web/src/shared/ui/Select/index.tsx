import React, { useState } from "react";
import styled from "styled-components";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  FloatingFocusManager,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";
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
  z-index: 1000;
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

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [
      offset(4),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <>
      <SelectButton
        ref={refs.setReference}
        $isOpen={isOpen}
        {...getReferenceProps()}
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
        <FloatingFocusManager context={context} modal={false}>
          <OptionsList
            // eslint-disable-next-line react-hooks/refs
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            role="listbox"
          >
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
        </FloatingFocusManager>
      )}
    </>
  );
};
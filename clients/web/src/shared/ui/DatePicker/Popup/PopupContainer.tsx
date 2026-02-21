import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  type Placement,
} from '@floating-ui/react';
import { shadows } from 'shared/lib/styled/shadows';
import { borderRadius } from 'shared/lib/styled/borderRadius';

const Popup = styled.div<{ $strategy: 'absolute' | 'fixed' }>`
  position: ${({ $strategy }) => $strategy};
  z-index: 1000;
  ${shadows.medium}
  ${borderRadius.m}
  overflow: hidden;
  background: ${({ theme }) => theme.components.background.primary};
  min-width: max-content;
  
  /* Анимация появления */
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
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

interface PopupContainerProps {
  anchor: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
  placement?: Placement;
  offsetAmount?: number;
}

export const PopupContainer: React.FC<PopupContainerProps> = ({ 
  anchor, 
  onClose, 
  children,
  placement = 'bottom-start',
  offsetAmount = 8,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const { x, y, strategy, refs } = useFloating({
    elements: {
      reference: anchor,
    },
    placement,
    middleware: [
      offset(offsetAmount),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 8,
      }),
      shift({ padding: 8 }),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            overflowY: 'auto',
          });
        },
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleScroll = () => {
      // Принудительно обновляем позицию при скролле
      if (refs.floating.current) {
        refs.floating.current.style.visibility = 'hidden';
        requestAnimationFrame(() => {
          if (refs.floating.current) {
            refs.floating.current.style.visibility = 'visible';
          }
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [onClose, refs.floating]);

  // Устанавливаем ref для floating элемента
  const setFloatingRef = (node: HTMLDivElement | null) => {
    popupRef.current = node;
    refs.setFloating(node);
  };

  return (
    <Popup
      ref={setFloatingRef}
      $strategy={strategy}
      style={{
        left: x ?? 0,
        top: y ?? 0,
      }}
    >
      {children}
    </Popup>
  );
};
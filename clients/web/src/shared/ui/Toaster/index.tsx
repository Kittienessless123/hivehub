import { CloseIcon } from "shared/assets/CloseIcon";
import styled ,  {type DefaultTheme } from "styled-components";
import { useEffect, useState, useRef } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
} from "@floating-ui/react";

type ToasterPosition =
  | "leftTop"
  | "rightTop"
  | "centerTop"
  | "rightBottom"
  | "leftBottom"
  | "center";
type ToasterStyled = "filled" | "outlined";
type ToasterInfoType = "success" | "warning" | "info" | "error";
type ToasterContainerType = "notification" | "toast";

interface ToasterStyledProps {
  $position?: ToasterPosition;
  $style?: ToasterStyled;
  $type?: ToasterInfoType;
  $toasterType: ToasterContainerType;
  $isOpen?: boolean;
}

type ToasterItemProps = {
  isOpen: boolean;
  onClose: () => void;
  timing?: number;
  icon?: React.ReactNode;
  text?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  $toasterType: ToasterContainerType;
  $style?: ToasterStyled;
  $type?: ToasterInfoType;
  $position?: ToasterPosition;
};

// Функция для получения цветов в зависимости от типа и темы
const getTypeColors = (type: ToasterInfoType = 'info', theme: DefaultTheme) => {
  const colorMap = {
    success: theme.colors.success,
    warning: theme.colors.warning,
    info: theme.colors.info,
    error: theme.colors.danger,
  };

  const bgColorMap = {
    success: theme.colors.success + '20', // 20 = 12% прозрачности
    warning: theme.colors.warning + '20',
    info: theme.colors.info + '20',
    error: theme.colors.danger + '20',
  };

  return {
    bg: bgColorMap[type],
    border: colorMap[type],
    text: type === 'info' ? theme.colors.info : 
          type === 'success' ? theme.colors.success :
          type === 'warning' ? theme.colors.warning : 
          theme.colors.danger,
    icon: colorMap[type],
  };
};

const getPositionCoordinates = (position: ToasterPosition = 'center') => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  const positions = {
    leftTop: { x: 20, y: 20 },
    rightTop: { x: viewportWidth - 20, y: 20 },
    centerTop: { x: viewportWidth / 2, y: 20 },
    leftBottom: { x: 20, y: viewportHeight - 20 },
    rightBottom: { x: viewportWidth - 20, y: viewportHeight - 20 },
    center: { x: viewportWidth / 2, y: viewportHeight / 2 },
  };
  
  return positions[position] || positions.center;
};

const ToasterContainer = styled.div<ToasterStyledProps>`
  position: fixed;
  z-index: 1000;
  
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => {
    if ($isOpen) return 'scale(1) translateY(0)';
    return 'scale(0.9) translateY(-20px)';
  }};
  
  transition: all 0.3s ease-in-out;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};
  max-width: ${({ $toasterType }) => 
    $toasterType === 'notification' ? '400px' : '300px'};
  width: max-content;
  min-width: ${({ $toasterType }) => 
    $toasterType === 'notification' ? '320px' : '200px'};
`;

const ToastStyled = styled.div<ToasterStyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.m};
  
  ${({ theme, $style, $type = 'info' }) => {
    const colors = getTypeColors($type, theme);
    
    if ($style === 'outlined') {
      return `
        background: ${theme.colors.white};
        border: 2px solid ${colors.border};
        color: ${colors.text};
        box-shadow: ${theme.shadows.soft.m};
      `;
    }
    
    return `
      background: ${colors.bg};
      border: 1px solid ${colors.border}40;
      color: ${colors.text};
      box-shadow: ${theme.shadows.glow[$type] || theme.shadows.soft.m};
    `;
  }}
`;

const NotificationStyled = styled.div<ToasterStyledProps>`
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.l};
  
  ${({ theme, $style, $type = 'info' }) => {
    const colors = getTypeColors($type, theme);
    
    if ($style === 'outlined') {
      return `
        background: ${theme.isLight ? theme.colors.white : theme.colors.gray900};
        border: 2px solid ${colors.border};
        box-shadow: ${theme.shadows.custom.card};
      `;
    }
    
    return `
      background: ${colors.bg};
      border: 1px solid ${colors.border}40;
      box-shadow: ${theme.shadows.custom.card};
    `;
  }}
`;

const Header = styled.div<{ $type?: ToasterInfoType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  
  span {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme, $type = 'info' }) => {
      const colors = getTypeColors($type, theme);
      return colors.text;
    }};
  }
  
  svg {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    
    path {
      fill: ${({ theme, $type = 'info' }) => {
        const colors = getTypeColors($type, theme);
        return colors.text;
      }};
    }
    
    &:hover {
      opacity: 1;
    }
  }
`;

const Body = styled.div<{ $type?: ToasterInfoType }>`
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme, $type = 'info' }) => {
    const colors = getTypeColors($type, theme);
    return colors.text;
  }};
  opacity: 0.9;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button<{ $type?: ToasterInfoType }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ theme, $type = 'info' }) => {
    const colors = getTypeColors($type, theme);
    
    return `
      border: 1px solid ${colors.border};
      background: transparent;
      color: ${colors.text};
      
      &:hover {
        background: ${colors.border}20;
        transform: translateY(-1px);
      }
    `;
  }}
`;

export const Toaster = (props: ToasterItemProps) => {
  const {
    $position = 'center',
    timing,
    icon = <CloseIcon />,
    isOpen = false,
    text,
    title,
    description,
    children,
    $style = 'filled',
    $type = 'info',
    $toasterType,
    onClose,
  } = props;

  const arrowRef = useRef(null);
  
  const coordinates = getPositionCoordinates($position);
  
  const { refs } = useFloating({
    open: isOpen,
    onOpenChange: () => {},
    placement: 'bottom',
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (isOpen && refs.floating.current) {
      Object.assign(refs.floating.current.style, {
        left: `${coordinates.x}px`,
        top: `${coordinates.y}px`,
        transform: 'translate(-50%, -50%)',
      });
    }
  }, [isOpen, coordinates, refs.floating]);

  useEffect(() => {
    if (isOpen && timing) {
      const timer = setTimeout(() => {
        onClose();
      }, timing);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, timing, onClose]);

  const containerProps = {
    ref: refs.setFloating,
    $style,
    $type,
    $toasterType,
    $position,
    $isOpen: isOpen,
    'data-toaster-type': $toasterType,
    'data-is-open': isOpen,
  };

  if ($toasterType === 'toast' && text) {
    return (
      <ToasterContainer {...containerProps}>
        <ToastStyled 
          $style={$style} 
          $type={$type} 
          $toasterType={$toasterType}
          data-toaster-type={$toasterType}
          data-style={$style}
          data-type={$type}
        >
          <span>{text}</span>
          <span onClick={onClose} style={{ cursor: 'pointer' }}>
            {icon}
          </span>
        </ToastStyled>
      </ToasterContainer>
    );
  }

  if ($toasterType === 'notification') {
    return (
      <ToasterContainer {...containerProps}>
        <NotificationStyled 
          $style={$style} 
          $type={$type}
          $toasterType={$toasterType}
          data-toaster-type={$toasterType}
          data-style={$style}
          data-type={$type}
        >
          <Header $type={$type}>
            <span>{title || 'Уведомление'}</span>
            <span onClick={onClose}>{icon}</span>
          </Header>
          <Body $type={$type}>
            {description || children}
          </Body>
          <Footer>
            <CloseButton $type={$type} onClick={onClose}>
              Закрыть
            </CloseButton>
          </Footer>
        </NotificationStyled>
      </ToasterContainer>
    );
  }

  return null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState<Partial<ToasterItemProps>>({});

  const open = (toasterProps: Partial<ToasterItemProps> & { $toasterType: ToasterContainerType }) => {
    setProps(toasterProps);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    props,
    open,
    close,
    ToasterComponent: props.$toasterType ? (
      <Toaster 
        isOpen={isOpen}
        onClose={close}
        {...props}
        $toasterType={props.$toasterType}
      />
    ) : null
  };
};



/*
const MyComponent = () => {
  const { open, close, ToasterComponent } = useToaster();

  const showSuccessToast = () => {
    open({
      $toasterType: 'toast',
      $type: 'success',
      text: 'Операция выполнена успешно!',
      timing: 3000, // Закроется через 3 секунды
    });
  };

  return (
    <div>
      <button onClick={showSuccessToast}>
        Показать успешный тост
      </button>
      
      {ToasterComponent}
    </div>
  );
};

import { useToaster } from 'shared/ui/Toaster';

const NotificationExample = () => {
  const { open, close, ToasterComponent } = useToaster();

  const showInfoNotification = () => {
    open({
      $toasterType: 'notification',
      $type: 'info',
      title: 'Обновление системы',
      description: 'Завтра в 03:00 будет проводиться техническое обслуживание. Ожидайте небольшие перерывы в работе.',
      $style: 'outlined', // Контурный стиль
      $position: 'rightTop', // Позиция
    });
  };

  return (
    <div>
      <button onClick={showInfoNotification}>
        Показать уведомление
      </button>
      
      {ToasterComponent}
    </div>
  );
};

*/
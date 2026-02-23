import React, { useState } from "react";
import { borderRadius } from "shared/lib/styled/borderRadius";
import { flex } from "shared/lib/styled/flex";
import styled, { css } from "styled-components";

type TabPosition = "top" | "bottom" | "left" | "right";
type TabAlignment = "start" | "center" | "end" | "stretch";

interface TabItemProps {
  key: string | number;
  icon?: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItemProps[];
  activeKey?: string | number;
  defaultActiveKey?: string | number;
  position?: TabPosition;
  alignment?: TabAlignment;
  onChange?: (key: string | number) => void;
  className?: string;
  tabsWidth?: string;
  contentWidth?: string;
}

interface TabButtonProps {
  $active: boolean;
  $position: TabPosition;
  $alignment: TabAlignment;
}

const getPositionStyles = (position: TabPosition) => {
  switch (position) {
    case "left":
      return css`
        flex-direction: row;
        
        ${TabButtonsContainer} {
          flex-direction: column;
          border-right: 2px solid ${({ theme }) => theme.components.border.light};
          padding-right: 16px;
          min-width: 200px;
        }
        
        ${TabButton} {
          justify-content: flex-start;
          border-radius: ${({ theme }) => theme.borderRadius.m};
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          width: 100%;
          
          &::after {
            right: -2px;
            left: auto;
            top: 0;
            bottom: 0;
            width: 2px;
            height: auto;
          }
        }
      `;
      
    case "right":
      return css`
        flex-direction: row-reverse;
        
        ${TabButtonsContainer} {
          flex-direction: column;
          border-left: 2px solid ${({ theme }) => theme.components.border.light};
          padding-left: 16px;
          min-width: 200px;
        }
        
        ${TabButton} {
          justify-content: flex-start;
          border-radius: ${({ theme }) => theme.borderRadius.m};
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          width: 100%;
          
          &::after {
            left: -2px;
            top: 0;
            bottom: 0;
            width: 2px;
            height: auto;
          }
        }
      `;
      
    case "bottom":
      return css`
        flex-direction: column-reverse;
        
        ${TabButtonsContainer} {
          border-top: 2px solid ${({ theme }) => theme.components.border.light};
          padding-top: 16px;
        }
        
        ${TabButton} {
          &::after {
            top: -2px;
            bottom: auto;
          }
        }
      `;
      
    default: 
      return css`
        flex-direction: column;
        
        ${TabButtonsContainer} {
          border-bottom: 2px solid ${({ theme }) => theme.components.border.light};
          padding-bottom: 16px;
        }
      `;
  }
};

const getAlignmentStyles = (alignment: TabAlignment) => {
  switch (alignment) {
    case "center":
      return css`
        ${TabButtonsContainer} {
          justify-content: center;
        }
      `;
    case "end":
      return css`
        ${TabButtonsContainer} {
          justify-content: flex-end;
        }
      `;
    case "stretch":
      return css`
        ${TabButtonsContainer} {
          & > * {
            flex: 1;
          }
        }
      `;
    default: 
      return css`
        ${TabButtonsContainer} {
          justify-content: flex-start;
        }
      `;
  }
};

export const TabsWrapper = styled.div<{
  $position: TabPosition;
  $alignment: TabAlignment;
}>`
  display: flex;
  width: 100%;
  ${props => getPositionStyles(props.$position)}
  ${props => getAlignmentStyles(props.$alignment)}
`;

export const TabButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  ${flex}
`;

export const TabButton = styled.button<TabButtonProps>`
  background-color: ${({ theme, $active }) => 
    $active ? theme.components.state.selected : 'transparent'};
  color: ${({ theme, $active }) => 
    $active ? theme.components.text.link : theme.components.text.secondary};
  padding: 12px 24px;
  border: none;
  ${borderRadius.m}
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: "";
    position: absolute;
    background-color: ${({ theme, $active }) => 
      $active ? theme.components.border.focus : 'transparent'};
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.components.state.hover};
    color: ${({ theme }) => theme.components.text.link};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const TabContent = styled.div<{ $active: boolean }>`
  display: ${({ $active }) => $active ? 'block' : 'none'};
  width: 100%;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const TabContainer = styled.div<{ $position: TabPosition }>`
  flex: 1;
  background-color: ${({ theme }) => theme.components.background.primary};
  ${borderRadius.m}
  padding: 24px;
  min-height: 200px;
  box-shadow: ${({ theme }) => theme.shadows.soft?.m || 'none'};
  
  ${({ $position }) => {
    switch ($position) {
      case "left":
        return css`
          border-top-left-radius: 0;
        `;
      case "right":
        return css`
          border-top-right-radius: 0;
        `;
      case "bottom":
        return css`
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `;
      default: 
        return css`
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        `;
    }
  }}
`;

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  position = "top",
  alignment = "start",
  onChange,
  className,
  tabsWidth,
  contentWidth,
}) => {
  const [uncontrolledActiveKey, setUncontrolledActiveKey] = useState<string | number>(
    defaultActiveKey || (items.length > 0 ? items[0].key : '')
  );

  const isControlled = controlledActiveKey !== undefined;
  const activeKey = isControlled ? controlledActiveKey : uncontrolledActiveKey;

  const handleTabClick = (key: string | number) => {
    if (!isControlled) {
      setUncontrolledActiveKey(key);
    }
    onChange?.(key);
  };

  return (
    <TabsWrapper 
      $position={position} 
      $alignment={alignment}
      className={className}
      style={{
        ...(tabsWidth ? { width: tabsWidth } : {}),
      }}
    >
      <TabButtonsContainer>
        {items.map((item) => (
          <TabButton
            key={item.key}
            $active={activeKey === item.key}
            $position={position}
            $alignment={alignment}
            onClick={() => handleTabClick(item.key)}
            role="tab"
            aria-selected={activeKey === item.key}
          >
            {item.icon && <span className="tab-icon">{item.icon}</span>}
            {item.label}
          </TabButton>
        ))}
      </TabButtonsContainer>

      <TabContainer 
        $position={position}
        style={{
          ...(contentWidth ? { maxWidth: contentWidth } : {}),
        }}
      >
        {items.map((item) => (
          <TabContent key={item.key} $active={activeKey === item.key}>
            {item.content}
          </TabContent>
        ))}
      </TabContainer>
    </TabsWrapper>
  );
};

// Пример использования:
/*
const MyTabs = () => {
  const tabs = [
    {
      key: 'profile',
      label: 'Профиль',
      icon: <UserIcon />,
      content: <div>Информация профиля</div>,
    },
    {
      key: 'settings',
      label: 'Настройки',
      icon: <SettingsIcon />,
      content: <div>Настройки аккаунта</div>,
    },
  ];

  return (
    <>
       Табы сверху (по умолчанию) 
      <Tabs items={tabs} />
      
     Табы слева 
      <Tabs 
        items={tabs} 
        position="left" 
        alignment="stretch"
        tabsWidth="600px"
      />
      
      Табы справа с выравниванием по центру 
      <Tabs 
        items={tabs} 
        position="right" 
        alignment="center"
      />
      
    Табы снизу 
      <Tabs 
        items={tabs} 
        position="bottom" 
        alignment="end"
      />
    </>
  );
};
*/
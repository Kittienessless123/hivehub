import * as React from 'react';
import styled from 'styled-components';
import { HiMoon } from 'react-icons/hi';
import { FaSun } from 'react-icons/fa';

// Типы для пропсов
interface SwitcherProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  icons?: {
    checked: React.ReactNode;
    unchecked: React.ReactNode;
  };
  className?: string;
}

// Компонент свитчера
export const Switcher: React.FC<SwitcherProps> = ({
  checked,
  onChange,
  icons,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <Container className={className}>
      <label htmlFor="switcher" className="switch">
        <input
          id="switcher"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <Icons className="slider round">
          {icons && (
            <>
              <span className="icon-checked" style={{ opacity: checked ? 1 : 0 }}>
                {icons.checked}
              </span>
              <span className="icon-unchecked" style={{ opacity: checked ? 0 : 1 }}>
                {icons.unchecked}
              </span>
            </>
          )}
        </Icons>
      </label>
    </Container>
  );
};

// Компонент для переключения темы (использует Switcher)
interface ThemeTogglerProps {
  themeToggler: () => void;
  currentTheme: 'light' | 'dark';
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  themeToggler,
  currentTheme,
}) => {
  return (
    <Switcher
      checked={currentTheme === 'light'}
      onChange={themeToggler}
      icons={{
        unchecked: <HiMoon />,
        checked: <FaSun />,
      }}
    />
  );
};

// Стили
const Container = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 1.5rem;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors?.bg || '#ccc'};
    -webkit-transition: 0.2s;
    transition: 0.2s;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors?.font || '#000'};
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 7px;
    bottom: 5px;
    background-color: ${({ theme }) => theme.background || '#fff'};
    -webkit-transition: 0.2s;
    transition: 0.2s;
    z-index: 10;
  }

  input:checked + .slider {
    background-color: ${({ theme }) => theme.background || '#f0f0f0'};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(35px);
    -ms-transform: translateX(35px);
    transform: translateX(35px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

const Icons = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none; /* Чтобы иконки не мешали кликам */

  .icon-checked,
  .icon-unchecked {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    transition: opacity 0.2s;
  }

  .icon-checked {
    justify-content: flex-end;
    padding-right: 8px;
    
    svg {
      margin-right: 6px;
    }
  }

  .icon-unchecked {
    justify-content: flex-start;
    padding-left: 8px;
    
    svg {
      margin-left: 6px;
    }
  }

  svg {
    color: ${({ theme }) => theme.text || '#000'};
    z-index: 11;
    width: 14px;
    height: 14px;
  }
`;

// Для обратной совместимости экспортируем и старый компонент
export const TogglerButton = ({ themeToggler }: ThemeTogglerProps) => {
  const currentTheme = window.localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
  
  return (
    <ThemeToggler
      themeToggler={themeToggler}
      currentTheme={currentTheme}
    />
  );
};

export default Switcher;
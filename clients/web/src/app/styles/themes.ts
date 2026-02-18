import {ThemeEnum, type ITheme } from './styled.ts';

export const lightTheme: ITheme = {
  type: ThemeEnum.light,
  name: 'Светлая',
  
  colors: {
    primary: '#1976d2',
    secondary: '#9c27b0',
    success: '#2e7d32',
    danger: '#d32f2f',
    warning: '#ed6c02',
    info: '#0288d1',
    
    white: '#ffffff',
    black: '#000000',
    gray50: '#fafafa',
    gray100: '#f5f5f5',
    gray200: '#eeeeee',
    gray300: '#e0e0e0',
    gray400: '#bdbdbd',
    gray500: '#9e9e9e',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
  },
  
  components: {
    button: {
      primary: '#1976d2',
      secondary: '#9c27b0',
      ghost: 'transparent',
      disabled: '#e0e0e0',
    },
    
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      tertiary: '#eeeeee',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#9e9e9e',
      inverse: '#ffffff',
      link: '#1976d2',
      linkHover: '#1565c0',
    },
    
    border: {
      default: '#e0e0e0',
      light: '#f5f5f5',
      focus: '#1976d2',
      error: '#d32f2f',
    },
    
    state: {
      hover: 'rgba(0, 0, 0, 0.04)',
      active: 'rgba(0, 0, 0, 0.1)',
      selected: 'rgba(25, 118, 210, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.12)',
    },
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
    secondary: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
    success: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
  },
  
  spacing: {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    xs: '2px',
    s: '4px',
    m: '8px',
    l: '12px',
    xl: '16px',
    round: '50%',
  },
  
  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0,0,0,0.05)',
    s: '0 2px 4px rgba(0,0,0,0.1)',
    m: '0 4px 8px rgba(0,0,0,0.1)',
    l: '0 8px 16px rgba(0,0,0,0.1)',
    xl: '0 12px 24px rgba(0,0,0,0.1)',
  },
  
  isDark: false,
  isLight: true,
};

export const darkTheme: ITheme = {
  type: ThemeEnum.dark,
  name: 'Темная',
  
  colors: {
    primary: '#90caf9',      // более светлый синий для темной темы
    secondary: '#ce93d8',    // светлый фиолетовый
    success: '#81c784',      // светлый зеленый
    danger: '#f48fb1',       // светлый розовый/красный
    warning: '#ffb74d',      // оранжевый
    info: '#80deea',         // голубой
    
    white: '#ffffff',
    black: '#000000',
    gray50: '#1e1e1e',       // самые темные оттенки
    gray100: '#2d2d2d',
    gray200: '#3d3d3d',
    gray300: '#4d4d4d',
    gray400: '#5d5d5d',
    gray500: '#6d6d6d',
    gray600: '#7d7d7d',
    gray700: '#8d8d8d',
    gray800: '#9d9d9d',
    gray900: '#adadad',
  },
  
  components: {
    button: {
      primary: '#90caf9',
      secondary: '#ce93d8',
      ghost: 'transparent',
      disabled: '#3d3d3d',
    },
    
    background: {
      primary: '#121212',      // основной фон
      secondary: '#1e1e1e',    // чуть светлее (карточки)
      tertiary: '#2d2d2d',     // еще светлее (элементы)
      overlay: 'rgba(0, 0, 0, 0.8)', // затемнение для модалок
    },
    
    text: {
      primary: '#ffffff',       // белый текст
      secondary: '#b0b0b0',     // серый для второстепенного
      disabled: '#5d5d5d',      // совсем бледный
      inverse: '#121212',        // текст на светлых элементах
      link: '#90caf9',
      linkHover: '#bbdefb',
    },
    
    border: {
      default: '#3d3d3d',
      light: '#2d2d2d',
      focus: '#90caf9',
      error: '#f48fb1',
    },
    
    state: {
      hover: 'rgba(255, 255, 255, 0.08)',  // белый оверлей
      active: 'rgba(255, 255, 255, 0.12)',
      selected: 'rgba(144, 202, 249, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.08)',
    },
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #90caf9 0%, #ce93d8 100%)',
    secondary: 'linear-gradient(135deg, #2d2d2d 0%, #1e1e1e 100%)',
    success: 'linear-gradient(135deg, #81c784 0%, #a5d6a7 100%)',
  },
  
  spacing: {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    xs: '2px',
    s: '4px',
    m: '8px',
    l: '12px',
    xl: '16px',
    round: '50%',
  },
  
  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0,0,0,0.5)',
    s: '0 2px 4px rgba(0,0,0,0.5)',
    m: '0 4px 8px rgba(0,0,0,0.5)',
    l: '0 8px 16px rgba(0,0,0,0.5)',
    xl: '0 12px 24px rgba(0,0,0,0.5)',
  },
  
  isDark: true,
  isLight: false,
};
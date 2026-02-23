export interface IColorPalette {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  
  white: string;
  black: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
}

export interface IComponentColors {
  button: {
    primary: string;
    secondary: string;
    ghost: string;
    disabled: string;
   

  };
  
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    overlay: string;
    blur: string;        
    inverted: string;    
  };
  
  text: {
    primary: string;    
    secondary: string;   
    disabled: string;     
    inverse: string;     
    link: string;         
    linkHover: string;     
  };
  
  border: {
    default: string;
    light: string;
    focus: string;       
    error: string;
    ghost: string;        
    dashed: string;       
  };
  
  state: {
    hover: string;        
    active: string;       
    selected: string;     
    disabled: string;     
  };
}

export interface ISpacing {
  xs: string;  // 4px
  s: string;   // 8px
  m: string;   // 16px
  l: string;   // 24px
  xl: string;  // 32px
  xxl: string; // 48px
}
export interface IGradients {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
}

export interface IBorderRadius {
  xs: string;  // 2px
  s: string;   // 4px
  m: string;   // 8px
  l: string;   // 12px
  xl: string;  // 16px
  round: string; 
}


export interface IShadows {
  none: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  
  soft: {
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
  };
  
  hard: {
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
  };
  
  inset: {
    s: string;
    m: string;
    l: string;
  };
  
  glow: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
  };
  
  layer: {
    1: string;
    2: string;
    3: string;
  };
  
  custom: {
    card: string;
    dropdown: string;
    modal: string;
    tooltip: string;
  };
}
export enum ThemeEnum {
  light = "light",
  dark = "dark",
}

export interface ITheme {
  type: ThemeEnum;
  name?: string;
  
  colors: IColorPalette;
  components: IComponentColors;
  gradients: IGradients;
  
  spacing: ISpacing;
  borderRadius: IBorderRadius;
  shadows: IShadows;
  
  isDark: boolean;
  isLight: boolean;
  
  getColor?: (path: string) => string;
  getSpacing?: (size: keyof ISpacing) => string;
}
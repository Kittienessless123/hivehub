import { ThemeEnum, type ITheme } from "./styled.ts";

export const lightTheme: ITheme = {
  type: ThemeEnum.light,
  name: "Light",

  colors: {
    primary: "#1976d2",
    secondary: "#9c27b0",
    success: "#2e7d32",
    danger: "#d32f2f",
    error: "#d32f2f",
    warning: "#ed6c02",
    info: "#0288d1",

    white: "#ffffff",
    black: "#000000",
    gray50: "#fafafa",
    gray100: "#f5f5f5",
    gray200: "#eeeeee",
    gray300: "#e0e0e0",
    gray400: "#bdbdbd",
    gray500: "#9e9e9e",
    gray600: "#757575",
    gray700: "#616161",
    gray800: "#424242",
    gray900: "#212121",
  },

  components: {
    button: {
      primary: "#1976d2",
      secondary: "#9c27b0",
      ghost: "transparent",
      disabled: "#e0e0e0",
    },

    background: {
      primary: "#ffffff",
      secondary: "#f5f5f5",
      tertiary: "#eeeeee",
      overlay: "rgba(0, 0, 0, 0.5)",
      blur: "rgba(255, 255, 255, 0.8)", 
      inverted: "#212121", 
    },

    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#9e9e9e",
      inverse: "#ffffff",
      link: "#1976d2",
      linkHover: "#1565c0",
    },

    border: {
      default: "#e0e0e0",
      light: "#f5f5f5",
      focus: "#1976d2",
      error: "#d32f2f",
      ghost: "rgba(0, 0, 0, 0.12)", 
      dashed: "#9e9e9e", 
    },

    state: {
      hover: "rgba(0, 0, 0, 0.04)",
      active: "rgba(0, 0, 0, 0.1)",
      selected: "rgba(25, 118, 210, 0.08)",
      disabled: "rgba(0, 0, 0, 0.12)",
    },
  },

  gradients: {
    primary: "linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)",
    secondary: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
    success: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
    danger: "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
    warning: "linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)",
    info: "linear-gradient(135deg, #0288d1 0%, #03a9f4 100%)",
  },

  spacing: {
    xs: "4px",
    s: "8px",
    m: "16px",
    l: "24px",
    xl: "32px",
    xxl: "48px",
  },

  borderRadius: {
    xs: "2px",
    s: "4px",
    m: "8px",
    l: "12px",
    xl: "16px",
    round: "50%",
  },

  shadows: {
    none: "none",
    xs: "0 1px 2px rgba(0,0,0,0.05)",
    s: "0 2px 4px rgba(0,0,0,0.1)",
    m: "0 4px 8px rgba(0,0,0,0.1)",
    l: "0 8px 16px rgba(0,0,0,0.1)",
    xl: "0 12px 24px rgba(0,0,0,0.1)",
    xxl: "0 20px 32px rgba(0,0,0,0.15)",

    soft: {
      xs: "0 2px 8px rgba(0,0,0,0.02)",
      s: "0 4px 12px rgba(0,0,0,0.03)",
      m: "0 8px 20px rgba(0,0,0,0.04)",
      l: "0 12px 28px rgba(0,0,0,0.05)",
      xl: "0 20px 36px rgba(0,0,0,0.06)",
    },

    hard: {
      xs: "0 1px 3px rgba(0,0,0,0.2)",
      s: "0 2px 4px rgba(0,0,0,0.25)",
      m: "0 4px 6px rgba(0,0,0,0.3)",
      l: "0 6px 8px rgba(0,0,0,0.35)",
      xl: "0 8px 12px rgba(0,0,0,0.4)",
    },

    inset: {
      s: "inset 0 1px 2px rgba(0,0,0,0.1)",
      m: "inset 0 2px 4px rgba(0,0,0,0.1)",
      l: "inset 0 4px 8px rgba(0,0,0,0.1)",
    },

    glow: {
      primary: "0 4px 12px rgba(25, 118, 210, 0.3)",
      secondary: "0 4px 12px rgba(156, 39, 176, 0.3)",
      success: "0 4px 12px rgba(46, 125, 50, 0.3)",
      danger: "0 4px 12px rgba(211, 47, 47, 0.3)",
      error: "0 4px 12px rgba(211, 47, 47, 0.3)",
      warning: "0 4px 12px rgba(237, 108, 2, 0.3)",
      info: "0 4px 12px rgba(2, 136, 209, 0.3)",
    },

    layer: {
      1: "0 1px 2px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.05)",
      2: "0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05)",
      3: "0 4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05)",
    },

    custom: {
      card: "0 2px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)",
      dropdown: "0 8px 16px rgba(0,0,0,0.1), 0 12px 24px rgba(0,0,0,0.1)",
      modal: "0 20px 40px rgba(0,0,0,0.2)",
      tooltip: "0 4px 8px rgba(0,0,0,0.2)",
    },
  },
  isDark: false,
  isLight: true,
};

export const darkTheme: ITheme = {
  type: ThemeEnum.dark,
  name: "Dark",

  colors: {
    primary: "#90caf9",
    secondary: "#ce93d8",
    success: "#81c784",
    danger: "#f48fb1",
    warning: "#ffb74d",
    info: "#80deea",
    error: "#d32f2f",

    white: "#ffffff",
    black: "#000000",
    gray50: "#1e1e1e",
    gray100: "#2d2d2d",
    gray200: "#3d3d3d",
    gray300: "#4d4d4d",
    gray400: "#5d5d5d",
    gray500: "#6d6d6d",
    gray600: "#7d7d7d",
    gray700: "#8d8d8d",
    gray800: "#9d9d9d",
    gray900: "#adadad",
  },

  components: {
    button: {
      primary: "#90caf9",
      secondary: "#ce93d8",
      ghost: "transparent",
      disabled: "#3d3d3d",
    },

    background: {
      primary: "#121212",
      secondary: "#1e1e1e",
      tertiary: "#2d2d2d",
      overlay: "rgba(0, 0, 0, 0.8)",
      blur: "rgba(18, 18, 18, 0.8)",
      inverted: "#ffffff",
    },

    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
      disabled: "#5d5d5d",
      inverse: "#121212",
      link: "#90caf9",
      linkHover: "#bbdefb",
    },

    border: {
      default: "#3d3d3d",
      light: "#2d2d2d",
      focus: "#90caf9",
      error: "#f48fb1",
      ghost: "rgba(255, 255, 255, 0.12)",
      dashed: "#6d6d6d",
    },

    state: {
      hover: "rgba(255, 255, 255, 0.08)",
      active: "rgba(255, 255, 255, 0.12)",
      selected: "rgba(144, 202, 249, 0.16)",
      disabled: "rgba(255, 255, 255, 0.08)",
    },
  },

  gradients: {
    primary: "linear-gradient(135deg, #90caf9 0%, #ce93d8 100%)",
    secondary: "linear-gradient(135deg, #2d2d2d 0%, #1e1e1e 100%)",
    success: "linear-gradient(135deg, #81c784 0%, #a5d6a7 100%)",
    danger: "linear-gradient(135deg, #f48fb1 0%, #f06292 100%)",
    warning: "linear-gradient(135deg, #ffb74d 0%, #ff9800 100%)",
    info: "linear-gradient(135deg, #80deea 0%, #4dd0e1 100%)",
  },

  spacing: {
    xs: "4px",
    s: "8px",
    m: "16px",
    l: "24px",
    xl: "32px",
    xxl: "48px",
  },

  borderRadius: {
    xs: "2px",
    s: "4px",
    m: "8px",
    l: "12px",
    xl: "16px",
    round: "50%",
  },

  shadows: {
    none: "none",
    xs: "0 1px 2px rgba(0,0,0,0.5)",
    s: "0 2px 4px rgba(0,0,0,0.5)",
    m: "0 4px 8px rgba(0,0,0,0.5)",
    l: "0 8px 16px rgba(0,0,0,0.5)",
    xl: "0 12px 24px rgba(0,0,0,0.5)",
    xxl: "0 20px 32px rgba(0,0,0,0.6)",

    soft: {
      xs: "0 2px 8px rgba(255,255,255,0.02)",
      s: "0 4px 12px rgba(255,255,255,0.03)",
      m: "0 8px 20px rgba(255,255,255,0.04)",
      l: "0 12px 28px rgba(255,255,255,0.05)",
      xl: "0 20px 36px rgba(255,255,255,0.06)",
    },

    hard: {
      xs: "0 1px 3px rgba(0,0,0,0.7)",
      s: "0 2px 4px rgba(0,0,0,0.75)",
      m: "0 4px 6px rgba(0,0,0,0.8)",
      l: "0 6px 8px rgba(0,0,0,0.85)",
      xl: "0 8px 12px rgba(0,0,0,0.9)",
    },

    inset: {
      s: "inset 0 1px 2px rgba(255,255,255,0.1)",
      m: "inset 0 2px 4px rgba(255,255,255,0.1)",
      l: "inset 0 4px 8px rgba(255,255,255,0.1)",
    },

    glow: {
      primary: "0 4px 12px rgba(144, 202, 249, 0.3)",
      secondary: "0 4px 12px rgba(206, 147, 216, 0.3)",
      success: "0 4px 12px rgba(129, 199, 132, 0.3)",
      danger: "0 4px 12px rgba(244, 143, 177, 0.3)",
      error: "0 4px 12px rgba(244, 143, 177, 0.3)",
      warning: "0 4px 12px rgba(255, 183, 77, 0.3)",
      info: "0 4px 12px rgba(128, 222, 234, 0.3)",
    },

    layer: {
      1: "0 1px 2px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.3)",
      2: "0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.3)",
      3: "0 4px 8px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.3)",
    },

    custom: {
      card: "0 2px 8px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.4)",
      dropdown: "0 8px 16px rgba(0,0,0,0.5), 0 12px 24px rgba(0,0,0,0.5)",
      modal: "0 20px 40px rgba(0,0,0,0.7)",
      tooltip: "0 4px 8px rgba(0,0,0,0.6)",
    },
  },
  isDark: true,
  isLight: false,
};

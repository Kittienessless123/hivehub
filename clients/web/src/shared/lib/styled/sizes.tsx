import { css } from 'styled-components'

// ============= ШИРИНА =============
export const fullWidth = css`
  width: 100%;
`

export const fullWidthViewport = css`
  width: 100vw;
`

export const halfWidth = css`
  width: 50%;
`

export const autoWidth = css`
  width: auto;
`

export const minWidth = (value: string | number) => css`
  min-width: ${typeof value === 'number' ? `${value}px` : value};
`

export const maxWidth = (value: string | number) => css`
  max-width: ${typeof value === 'number' ? `${value}px` : value};
`

// ============= ВЫСОТА =============
export const fullHeight = css`
  height: 100%;
`

export const fullHeightViewport = css`
  height: 100vh;
`

export const halfHeight = css`
  height: 50%;
`

export const autoHeight = css`
  height: auto;
`

export const minHeight = (value: string | number) => css`
  min-height: ${typeof value === 'number' ? `${value}px` : value};
`

export const maxHeight = (value: string | number) => css`
  max-height: ${typeof value === 'number' ? `${value}px` : value};
`

// ============= ПОЛНЫЙ ЭКРАН =============
export const fullScreen = css`
  width: 100vw;
  height: 100vh;
`

export const fullScreenMin = css`
  min-width: 100vw;
  min-height: 100vh;
`

// ============= КВАДРАТ И КРУГ =============
export const square = (size: string | number) => css`
  width: ${typeof size === 'number' ? `${size}px` : size};
  height: ${typeof size === 'number' ? `${size}px` : size};
`

export const circle = (size: string | number) => css`
  width: ${typeof size === 'number' ? `${size}px` : size};
  height: ${typeof size === 'number' ? `${size}px` : size};
  border-radius: 50%;
`

// ============= ОГРАНИЧЕНИЯ =============
export const fitContent = css`
  width: fit-content;
  height: fit-content;
`

export const maxContent = css`
  width: max-content;
  height: max-content;
`

export const minContent = css`
  width: min-content;
  height: min-content;
`
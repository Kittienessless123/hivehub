import { css } from 'styled-components'

// ============= ГРАДИЕНТЫ =============
export const gradient = (start: string, end: string, direction: string = 'to bottom') => css`
  background: linear-gradient(${direction}, ${start}, ${end});
`

export const gradientHorizontal = (start: string, end: string) => css`
  background: linear-gradient(to right, ${start}, ${end});
`

export const gradientVertical = (start: string, end: string) => css`
  background: linear-gradient(to bottom, ${start}, ${end});
`

export const gradientRadial = (start: string, end: string) => css`
  background: radial-gradient(circle, ${start}, ${end});
`

// ============= РАЗМЫТИЕ =============
export const blur = (value: string | number = '4px') => css`
  filter: blur(${typeof value === 'number' ? `${value}px` : value});
`

export const backdropBlur = (value: string | number = '4px') => css`
  backdrop-filter: blur(${typeof value === 'number' ? `${value}px` : value});
`

// ============= ПРОЗРАЧНОСТЬ =============
export const opacity = (value: number) => css`
  opacity: ${value};
`

export const semiOpaque = css`
  opacity: 0.8;
`

export const semiTransparent = css`
  opacity: 0.5;
`

export const transparent = css`
  opacity: 0;
`

// ============= ТЕНИ =============
export const textShadow = (x: string, y: string, blur: string, color: string) => css`
  text-shadow: ${x} ${y} ${blur} ${color};
`

export const insetShadow = (x: string, y: string, blur: string, color: string) => css`
  box-shadow: inset ${x} ${y} ${blur} ${color};
`

// ============= ДЕКОРАТИВНЫЕ ЛИНИИ =============
export const divider = css`
  border: none;
  border-top: 1px solid #eaeaea;
`

export const dividerVertical = css`
  border: none;
  border-left: 1px solid #eaeaea;
  height: 100%;
`
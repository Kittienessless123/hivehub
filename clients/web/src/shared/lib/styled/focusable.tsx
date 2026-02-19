import { css } from 'styled-components'

// ============= БАЗОВЫЙ FOCUS =============
export const focusOutline = css`
  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`

export const focusGlow = css`
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`

export const focusRing = css`
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px #007bff;
  }
`

export const focusUnderline = css`
  &:focus-visible {
    outline: none;
    border-bottom: 2px solid #007bff;
  }
`

export const focusBackground = css`
  &:focus-visible {
    outline: none;
    background-color: rgba(0, 123, 255, 0.1);
  }
`

// ============= NO FOCUS =============
export const noFocusOutline = css`
  &:focus {
    outline: none;
  }
`

// ============= CUSTOM FOCUS =============
export const focusCustom = (color: string = '#007bff', width: string = '2px') => css`
  &:focus-visible {
    outline: ${width} solid ${color};
    outline-offset: 2px;
  }
`

export const focusWithin = css`
  &:focus-within {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`

// ============= FOCUS VISIBLE ONLY =============
export const focusVisibleOnly = css`
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

// ============= REMOVE FOCUS FOR MOUSE =============
export const noMouseFocus = css`
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

// ============= FOCUS + HOVER =============
export const focusAndHover = css`
  &:hover,
  &:focus-visible {
    opacity: 0.8;
    outline: none;
  }
`
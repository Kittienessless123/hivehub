import { css } from 'styled-components'

// ============= СКРЫТИЕ/ПОКАЗ =============
export const hidden = css`
  display: none;
`

export const visible = css`
  display: block;
`

export const invisible = css`
  visibility: hidden;
`

export const visibleVisible = css`
  visibility: visible;
`

// ============= ДЛЯ СКРИНРИДЕРОВ =============
export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const notSrOnly = css`
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
`

// ============= ПРИ ПЕЧАТИ =============
export const noPrint = css`
  @media print {
    display: none;
  }
`

export const onlyPrint = css`
  @media not print {
    display: none;
  }
`

// ============= ПО СОСТОЯНИЮ =============
export const hiddenIfEmpty = css`
  &:empty {
    display: none;
  }
`

export const showOnHover = css`
  opacity: 0;
  
  &:hover {
    opacity: 1;
  }
`

// ============= АДАПТИВНОЕ СКРЫТИЕ =============
export const hiddenOnMobile = css`
  @media (max-width: 768px) {
    display: none;
  }
`

export const hiddenOnDesktop = css`
  @media (min-width: 769px) {
    display: none;
  }
`
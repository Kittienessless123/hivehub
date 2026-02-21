import { css } from 'styled-components'

export type BreakpointSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
type BreakpointDirection = 'min-width' | 'max-width' | 'min-height' | 'max-height'

const breakpointValues: Record<BreakpointSize, number> = {
  xs: 480,
  s: 768,
  m: 1024,
  l: 1280,
  xl: 1440,
  xxl: 1920,
}

export const breakpoint = (
  size: BreakpointSize, 
  direction: BreakpointDirection = 'min-width'
) => {
  const value = breakpointValues[size]
  
  return (...args: Parameters<typeof css>) => css`
    @media (${direction}: ${value}px) {
      ${css(...args)}
    }
  `
}

export const media = {
  min: {
    xs: (...args: Parameters<typeof css>) => css`
      @media (min-width: ${breakpointValues.xs}px) {
        ${css(...args)}
      }
    `,
    s: (...args: Parameters<typeof css>) => css`
      @media (min-width: ${breakpointValues.s}px) {
        ${css(...args)}
      }
    `,
    m: (...args: Parameters<typeof css>) => css`
      @media (min-width: ${breakpointValues.m}px) {
        ${css(...args)}
      }
    `,
    l: (...args: Parameters<typeof css>) => css`
      @media (min-width: ${breakpointValues.l}px) {
        ${css(...args)}
      }
    `,
    xl: (...args: Parameters<typeof css>) => css`
      @media (min-width: ${breakpointValues.xl}px) {
        ${css(...args)}
      }
    `,
    xxl: (...args: Parameters<typeof css>) => css`
      @media (min-width: ${breakpointValues.xxl}px) {
        ${css(...args)}
      }
    `,
  },
  
  max: {
    xs: (...args: Parameters<typeof css>) => css`
      @media (max-width: ${breakpointValues.xs}px) {
        ${css(...args)}
      }
    `,
    s: (...args: Parameters<typeof css>) => css`
      @media (max-width: ${breakpointValues.s}px) {
        ${css(...args)}
      }
    `,
    m: (...args: Parameters<typeof css>) => css`
      @media (max-width: ${breakpointValues.m}px) {
        ${css(...args)}
      }
    `,
    l: (...args: Parameters<typeof css>) => css`
      @media (max-width: ${breakpointValues.l}px) {
        ${css(...args)}
      }
    `,
    xl: (...args: Parameters<typeof css>) => css`
      @media (max-width: ${breakpointValues.xl}px) {
        ${css(...args)}
      }
    `,
    xxl: (...args: Parameters<typeof css>) => css`
      @media (max-width: ${breakpointValues.xxl}px) {
        ${css(...args)}
      }
    `,
  },
  
  minHeight: {
    xs: (...args: Parameters<typeof css>) => css`
      @media (min-height: ${breakpointValues.xs}px) {
        ${css(...args)}
      }
    `,
    s: (...args: Parameters<typeof css>) => css`
      @media (min-height: ${breakpointValues.s}px) {
        ${css(...args)}
      }
    `,
    m: (...args: Parameters<typeof css>) => css`
      @media (min-height: ${breakpointValues.m}px) {
        ${css(...args)}
      }
    `,
    l: (...args: Parameters<typeof css>) => css`
      @media (min-height: ${breakpointValues.l}px) {
        ${css(...args)}
      }
    `,
    xl: (...args: Parameters<typeof css>) => css`
      @media (min-height: ${breakpointValues.xl}px) {
        ${css(...args)}
      }
    `,
    xxl: (...args: Parameters<typeof css>) => css`
      @media (min-height: ${breakpointValues.xxl}px) {
        ${css(...args)}
      }
    `,
  },
  
  maxHeight: {
    xs: (...args: Parameters<typeof css>) => css`
      @media (max-height: ${breakpointValues.xs}px) {
        ${css(...args)}
      }
    `,
    s: (...args: Parameters<typeof css>) => css`
      @media (max-height: ${breakpointValues.s}px) {
        ${css(...args)}
      }
    `,
    m: (...args: Parameters<typeof css>) => css`
      @media (max-height: ${breakpointValues.m}px) {
        ${css(...args)}
      }
    `,
    l: (...args: Parameters<typeof css>) => css`
      @media (max-height: ${breakpointValues.l}px) {
        ${css(...args)}
      }
    `,
    xl: (...args: Parameters<typeof css>) => css`
      @media (max-height: ${breakpointValues.xl}px) {
        ${css(...args)}
      }
    `,
    xxl: (...args: Parameters<typeof css>) => css`
      @media (max-height: ${breakpointValues.xxl}px) {
        ${css(...args)}
      }
    `,
  },
}

export const between = (min: BreakpointSize, max: BreakpointSize) => {
  return (...args: Parameters<typeof css>) => css`
    @media (min-width: ${breakpointValues[min]}px) and (max-width: ${breakpointValues[max]}px) {
      ${css(...args)}
    }
  `
}

export const customBreakpoint = (value: number, direction: BreakpointDirection = 'min-width') => {
  return (...args: Parameters<typeof css>) => css`
    @media (${direction}: ${value}px) {
      ${css(...args)}
    }
  `
}

export const breakpoints = breakpointValues



// Пример использования:
// breakpoint('m', 'min-width')`
//   font-size: 18px;
// `
//
// media.min.m`
//   display: flex;
// `
//
// media.max.s`
//   flex-direction: column;
// `
//
// between('s', 'l')`
//   grid-template-columns: 1fr 1fr;
// `
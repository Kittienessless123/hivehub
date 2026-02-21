import { css } from 'styled-components'

export type BorderRadiusSize = 'xs' | 's' | 'm' | 'l' | 'xl' |'round' 

export const borderRadius: Record<BorderRadiusSize, ReturnType<typeof css>> = {
  xs: css`
    border-radius: 4px;
  `,
  s: css`
    border-radius: 8px;
  `,
  m: css`
    border-radius: 12px;
  `,
  l : css`
    border-radius: 24px; 
  `,
  xl: css `
    border-radius: 36px; 
  `,
  round: css`
    border-radius: 50%;
  `
}



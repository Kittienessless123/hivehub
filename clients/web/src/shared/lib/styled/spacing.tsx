import { css } from 'styled-components'

type SpaceSize = 'xs' | 's' | 'm' | 'l' | 'xl' 
type SpaceDirection = 'vertical' | 'horizontal'

export const spacing: Record<SpaceDirection, Record<SpaceSize, ReturnType<typeof css>>> = {
  vertical: {
    xs: css`margin-top: 4px; margin-bottom: 4px;`,
    s: css`margin-top: 8px; margin-bottom: 8px;`,
    m: css`margin-top: 12px; margin-bottom: 12px;`,
    l: css`margin-top: 24px; margin-bottom: 24px;`,
    xl: css`margin-top: 36px; margin-bottom: 36px;`,
  },
  horizontal: {
    xs: css`margin-left: 4px; margin-right: 4px;`,
    s: css`margin-left: 8px; margin-right: 8px;`,
    m: css`margin-left: 12px; margin-right: 12px;`,
    l: css`margin-left: 24px; margin-right: 24px;`,
    xl: css`margin-left: 36px; margin-right: 36px;`,
  }
}


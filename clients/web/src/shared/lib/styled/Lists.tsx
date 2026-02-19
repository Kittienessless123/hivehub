import { css } from 'styled-components'

// ============= СБРОС СТИЛЕЙ СПИСКА =============
export const resetList = css`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const resetListItem = css`
  margin: 0;
  padding: 0;
  
  &::before {
    display: none;
  }
`

// ============= ГОРИЗОНТАЛЬНЫЙ СПИСОК =============
export const inlineList = css`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`

export const inlineListItem = css`
  display: inline-block;
  
  &:not(:last-child) {
    margin-right: 16px;
  }
`

// ============= СПИСОК С РАЗДЕЛИТЕЛЯМИ =============
export const listWithDividers = css`
  ${resetList}
  
  & > li {
    padding: 8px 0;
    
    &:not(:last-child) {
      border-bottom: 1px solid #eaeaea;
    }
  }
`

export const inlineListWithDividers = css`
  ${inlineList}
  
  & > li {
    &:not(:last-child) {
      &::after {
        content: '•';
        margin: 0 8px;
      }
    }
  }
`

// ============= МАРКИРОВАННЫЙ СПИСОК =============
export const bulletList = css`
  ${resetList}
  
  & > li {
    position: relative;
    padding-left: 20px;
    
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: currentColor;
    }
  }
`

export const numberedList = css`
  ${resetList}
  counter-reset: list-counter;
  
  & > li {
    position: relative;
    padding-left: 24px;
    counter-increment: list-counter;
    
    &::before {
      content: counter(list-counter) '.';
      position: absolute;
      left: 0;
      font-weight: bold;
    }
  }
`

// ============= СПИСОК С ИКОНКАМИ =============
export const iconList = (iconContent: string = '✓') => css`
  ${resetList}
  
  & > li {
    position: relative;
    padding-left: 24px;
    
    &::before {
      content: '${iconContent}';
      position: absolute;
      left: 0;
      color: currentColor;
    }
  }
`

// ============= КОЛОНКИ ДЛЯ СПИСКА =============
export const listColumns = (columns: number = 2) => css`
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  gap: 16px;
`
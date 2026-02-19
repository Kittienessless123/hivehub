import { css } from 'styled-components'

// Скрыть скроллбар, но сохранить функциональность
export const hideScrollbar = css`
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE и Edge */
`

// Скрыть только горизонтальный скроллбар
export const hideHorizontalScrollbar = css`
  &::-webkit-scrollbar:horizontal {
    display: none;
  }
  
  overflow-x: auto;
  scrollbar-width: none;
`

// Скрыть только вертикальный скроллбар
export const hideVerticalScrollbar = css`
  &::-webkit-scrollbar:vertical {
    display: none;
  }
  
  overflow-y: auto;
  scrollbar-width: none;
`

// Тонкий скроллбар (для Chrome)
export const thinScrollbar = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

// Кастомный скроллбар с возможностью задать цвет
export const customScrollbar = (color = '#ccc', width = '8px') => css`
  &::-webkit-scrollbar {
    width: ${width};
    height: ${width};
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${color};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${color}99;
  }
`

// Скроллбар появляется только при наведении
export const scrollbarOnHover = css`
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
  
  &:hover::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`

// ============= ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ =============

// const ScrollableDiv = styled.div`
//   overflow-y: auto;
//   height: 100%;
//   ${hideScrollbar}
// `

// const CustomScrollDiv = styled.div`
//   overflow: auto;
//   height: 200px;
//   ${customScrollbar('#007bff', '10px')}
// `

// const HoverScrollDiv = styled.div`
//   overflow: auto;
//   height: 300px;
//   ${scrollbarOnHover}
// `
import { css } from 'styled-components'

// display
export const flex = css`
  display: flex;
`

export const inlineFlex = css`
  display: inline-flex;
`

// direction
export const row = css`
  flex-direction: row;
`

export const column = css`
  flex-direction: column;
`

export const rowReverse = css`
  flex-direction: row-reverse;
`

export const columnReverse = css`
  flex-direction: column-reverse;
`

// justify content
export const justifyStart = css`
  justify-content: flex-start;
`

export const justifyEnd = css`
  justify-content: flex-end;
`

export const justifyCenter = css`
  justify-content: center;
`

export const justifyBetween = css`
  justify-content: space-between;
`

export const justifyAround = css`
  justify-content: space-around;
`

export const justifyEvenly = css`
  justify-content: space-evenly;
`

// align items
export const alignStart = css`
  align-items: flex-start;
`

export const alignEnd = css`
  align-items: flex-end;
`

export const alignCenter = css`
  align-items: center;
`

export const alignBaseline = css`
  align-items: baseline;
`

export const alignStretch = css`
  align-items: stretch;
`

// align self
export const alignSelfStart = css`
  align-self: flex-start;
`

export const alignSelfEnd = css`
  align-self: flex-end;
`

export const alignSelfCenter = css`
  align-self: center;
`

// wrap
export const wrap = css`
  flex-wrap: wrap;
`

export const nowrap = css`
  flex-wrap: nowrap;
`

export const wrapReverse = css`
  flex-wrap: wrap-reverse;
`

// gap
const gaps = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
}

export const gapXs = css`
  gap: ${gaps.xs}px;
`

export const gapS = css`
  gap: ${gaps.s}px;
`

export const gapM = css`
  gap: ${gaps.m}px;
`

export const gapL = css`
  gap: ${gaps.l}px;
`

export const gapXl = css`
  gap: ${gaps.xl}px;
`

// flex grow/shrink
export const flex1 = css`
  flex: 1;
`

export const flexAuto = css`
  flex: 1 1 auto;
`

export const flexNone = css`
  flex: none;
`


// rows
export const rowStart = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

export const rowCenter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const rowBetween = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const rowEnd = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

// columns
export const colStart = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

export const colCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const colBetween = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

// centric
export const centerAll = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const centerHorizontal = css`
  display: flex;
  justify-content: center;
`

export const centerVertical = css`
  display: flex;
  align-items: center;
`


// const Header = styled.header`
//   ${rowBetween}
//   ${gapM}
//   padding: 16px;
// `

// const Card = styled.div`
//   ${colCenter}
//   ${gapS}
//   ${flex1}
// `

// const Modal = styled.div`
//   ${centerAll}
//   height: 100vh;
// `


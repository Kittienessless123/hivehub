import styled, { keyframes } from "styled-components";
import { CenterAbsolutely } from "../../lib/styled/centerAbsolutely"; 
import { square } from "../../lib/styled/sizes"; 

// Создаем keyframes анимации
const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

// Стили для лоадера
const LoaderElement = styled.span`
  ${square(48)}
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #ff0b0b;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
  position: relative;

  &::after {
    content: '';
    ${square(48)}
    ${CenterAbsolutely}
    border-radius: 50%;
    border-left: 4px solid #008cff;
    border-bottom: 4px solid transparent;
    animation: ${rotation} 0.5s linear infinite reverse;
    box-sizing: border-box;
  }
`

// Обертка для центрирования
const LoaderWrapper = styled.div`
  margin: 0 auto;
  background-color: transparent;
  margin-top: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
`

// Компонент
export const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderElement />
    </LoaderWrapper>
  )
}
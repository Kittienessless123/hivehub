import { keyframes, css } from 'styled-components'

// ============= FADE =============
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

// ============= SCALE =============
export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const scaleOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

// ============= SLIDE =============
export const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`

export const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`

export const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

export const slideInUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

export const slideInDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`

// ============= ROTATE =============
export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const spinSlow = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const spinReverse = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`

// ============= SHAKE =============
export const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
`

export const shakeHard = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
`

// ============= BOUNCE =============
export const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`

// ============= WIGGLE =============
export const wiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
`

// ============= FLOAT =============
export const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

// ============= GLOW =============
export const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`

// ============= ANIMATION SHORTCUTS =============
export const animationFadeIn = css`
  animation: ${fadeIn} 0.3s ease;
`

export const animationFadeInUp = css`
  animation: ${fadeInUp} 0.3s ease;
`

export const animationSpin = css`
  animation: ${spin} 1s linear infinite;
`

export const animationPulse = css`
  animation: ${pulse} 1s ease infinite;
`

export const animationShake = css`
  animation: ${shake} 0.5s ease;
`

export const animationBounce = css`
  animation: ${bounce} 0.5s ease;
`

// ============= ANIMATION WITH DELAY =============
export const animationWithDelay = (animation: never, duration: string = '0.3s', delay: string = '0s') => css`
  animation: ${animation} ${duration} ease ${delay} forwards;
`

// ============= ANIMATION WITH CUSTOM =============
export const createAnimation = (
  name: never,
  duration: string = '0.3s',
  timing: string = 'ease',
  iteration: string = '1',
  fill: string = 'forwards'
) => css`
  animation: ${name} ${duration} ${timing} ${iteration} ${fill};
`

// ============= TRANSITIONS =============
export const transitionFast = css`
  transition: all 0.15s ease;
`

export const transitionBase = css`
  transition: all 0.3s ease;
`

export const transitionSlow = css`
  transition: all 0.5s ease;
`

export const transitionCustom = (
  properties: string = 'all',
  duration: string = '0.3s',
  timing: string = 'ease'
) => css`
  transition: ${properties} ${duration} ${timing};
`
import {css} from 'styled-components'

export const mainContainerStyle = css`
  margin: 5rem auto;
  max-width: 150rem;
  padding: 0 5rem;
  @media (max-width: 768px) {
    margin: 4rem auto;
    max-width: 100%;
    padding: 0 3rem;
  }
  @media (max-width: 480px) {
    margin: 3rem auto;
    padding: 0 2rem;
  }
`
export const mainButtonStyle = css`
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  background-color: var(--color-main);
  @media (max-width: 768px) {
    padding: 1rem 1.8rem;
  }
  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
  }
`
export const subButtonStyle = css`
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  background-color: var(--color-dark-gray);
  @media (max-width: 768px) {
    padding: 1rem 1.8rem;
  }
  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
  }
`

export const mainSmallButtonStyle = css`
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  background-color: var(--color-main);
  @media (max-width: 768px) {
    padding: 0.5rem 1.8rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem 1.5rem;
  }
`
export const subSmallButtonStyle = css`
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: var(--color-dark-gray);
  @media (max-width: 768px) {
    padding: 0.5rem 1.8rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem 1.5rem;
  }
`
export const inputStyle = css`
  padding: 0 1rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  height: 3.5rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(255, 152, 0, 0.5);
  }
  &::placeholder {
    font-size: var(--font-size-subtext);
  }
`

export const h2Style = css`
  font-weight: bold;
  font-size: var(--font-size-emphasis);
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 1.8rem;
  }
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`

export const skeletonStyle = css`
  position: relative;
  overflow: hidden;
  background-color: #eee;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 200%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: wave 2s infinite;
  }
  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
`

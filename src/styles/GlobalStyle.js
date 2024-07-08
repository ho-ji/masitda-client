import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
  }
  body{
    font-size: 1.6rem;
    line-height: 1.5;
    font-family: Roboto, 'Noto Sans KR', sans-serif;
  }
  a{
    text-decoration: none;
    font-size: inherit;
    color: inherit;
  }
  button{
    border: none;
    cursor: pointer;
    padding: 0;
    font : inherit;
    background: inherit;
    color: inherit;
  }
  img{
    vertical-align: top;
  }
  input{
    font: inherit;
    margin: 0;
    border: none;
  }
  input[type="checkbox"]{
    cursor: pointer;
  }
  select{
    font:inherit;
    margin: 0;
    border: none;
  }
  .a11y-hidden{
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  h1, h2, h3, p,span, strong{
    cursor: default;
  }
  :root {
    --color-main: #ff9800;
    --color-border: #eeeeee;
    --color-text-main: #666666;
    --color-text-sub: #888888;
    --color-gray: #d7d7d7;
    --color-light-gray: #f8f8f8;
    --color-red: #d64141;
    --color-dark-gray : #aaa;

    --font-size-emphasis: 2.4rem;
    --font-size-primary: 1.7rem;
    --font-size-subtext: 1.4rem;
  }
  input{
    &::placeholder{
      color: var(--color-text-sub);
    }
  }

  
  @media (max-width: 768px) {
    body{
    font-size: 1.5rem;
    }
    :root {
      --font-size-emphasis: 2rem;
      --font-size-primary: 1.6rem;
      --font-size-subtext: 1.2rem;
    }
  }
  @media (max-width: 480px) {
    body{
    font-size: 1.4rem;
    }
    :root {
      --font-size-emphasis: 1.8rem;
      --font-size-primary: 1.5rem;
      --font-size-subtext: 1.2rem;
    }
  }
`

export default GlobalStyle

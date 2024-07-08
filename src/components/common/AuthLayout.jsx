import styled from 'styled-components'
import {Link} from 'react-router-dom'

import logoImage from 'assets/images/logo.png'

const Container = styled.div`
  display: grid;
  min-height: 100dvh;
  place-items: center;
  background-color: var(--color-light-gray);
  grid-template-rows: 1fr auto;
  > main {
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 35rem;
  }
  @media (max-width: 480px) {
    > main {
      width: 90%;
    }
  }
`

const AuthFooter = styled.footer`
  width: 100%;
  margin: 2rem 0;
  text-align: center;
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
`

const Logo = styled(Link)`
  display: block;
  width: 15rem;
  aspect-ratio: 2/1;
  background: url(${logoImage}) no-repeat center/contain;
  margin-bottom: 3rem;
  @media (max-width: 480px) {
    width: 12rem;
  }
`

const AuthLayout = ({children}) => {
  return (
    <Container>
      <main>
        <h1>
          <Logo to="/">
            <span className="a11y-hidden">마싯다 로고</span>
          </Logo>
        </h1>
        {children}
      </main>
      <AuthFooter>©2024 장예지. All rights reserved.</AuthFooter>
    </Container>
  )
}

export default AuthLayout

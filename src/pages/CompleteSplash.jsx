import {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import styled from 'styled-components'

import completeImage from 'assets/images/complete.svg'
import {mainButtonStyle} from 'styles/variables'

const Container = styled.div`
  display: grid;
  min-height: 100dvh;
  place-items: center;
  grid-template-rows: 1fr auto;
  > main {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
      width: 10rem;
      margin-bottom: 1rem;
    }
    > h2 {
      font-size: var(--font-size-emphasis);
      font-weight: bold;
      margin-bottom: 2rem;
    }
  }
`

const OrderNumber = styled.p`
  margin: 1rem 0 2rem 0;
  font-size: var(--font-size-primary);
  > span {
    font-weight: bold;
    color: var(--color-main);
  }
`

const GoHome = styled(Link)`
  ${mainButtonStyle}
  margin-top: 1rem;
`

const CompleteSplash = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    if (!location.state?.complete) navigate('/', {replace: true})
  }, [navigate, location])

  useEffect(() => {
    if (location.state?.orderNumber) setOrderNumber(location.state.orderNumber)
  }, [location])

  useEffect(() => {
    const handleRefresh = () => {
      navigate('/', {replace: true})
    }
    window.addEventListener('beforeunload', handleRefresh)
    return () => {
      window.removeEventListener('beforeunload', handleRefresh)
    }
  }, [navigate])

  return (
    <Container>
      <main>
        <h1 className="a11y-hidden">마싯다</h1>
        <img
          src={completeImage}
          alt="완료"
        />
        <h2>주문 완료</h2>
        <p>총 {location.state?.length}건의 주문이 완료되었습니다</p>
        {orderNumber && (
          <OrderNumber>
            [ 주문번호 : <span>{orderNumber}</span> ]
          </OrderNumber>
        )}
        <GoHome
          to="/"
          replace>
          홈화면으로
        </GoHome>
      </main>
    </Container>
  )
}

export default CompleteSplash

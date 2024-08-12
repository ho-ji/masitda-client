import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'

import {postTempOrderAPI} from 'api/tempOrder'
import {getSelectedListSelector} from 'recoil/cart/selector'
import {tokenState} from 'recoil/token/atom'
import {loadingState} from 'recoil/loading/atom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-primary);
  font-weight: bold;
  gap: 1.5rem;
  margin-top: 5rem;
  > a {
    width: 15rem;
    padding: 1rem 0;
    text-align: center;
  }

  @media (max-width: 768px) {
    margin-top: 3rem;
    > a {
      width: 12rem;
      padding: 0.8rem 0;
    }
  }
  @media (max-width: 480px) {
    > a {
      width: 12rem;
      padding: 0.5rem 0;
    }
  }
`
const ContinueButton = styled(Link)`
  border: 1px solid var(--color-main);
  color: var(--color-main);
`

const PurchaseButton = styled(Link)`
  background: var(--color-main);
  color: white;
`

const CartPurchase = () => {
  const selectedList = useRecoilValue(getSelectedListSelector)
  const [token, setToken] = useRecoilState(tokenState)
  const setLoading = useSetRecoilState(loadingState)
  const navigate = useNavigate()

  const handlePurchaseClick = async () => {
    try {
      setLoading(true)
      const result = await postTempOrderAPI({accessToken: token, order: selectedList})
      if (result.data.success) {
        if (result.data.accessToken) setToken(result.data.accessToken)
        navigate(`/order/${result.data.orderId}`)
      }
    } catch {
      alert('잠시 후 다시 시도해주세요')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <ContinueButton to="/">계속 쇼핑하기</ContinueButton>
      <PurchaseButton onClick={handlePurchaseClick}>구매하기</PurchaseButton>
    </Container>
  )
}

export default CartPurchase

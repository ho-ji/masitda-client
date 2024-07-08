import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useRecoilState} from 'recoil'
import {useErrorBoundary} from 'react-error-boundary'
import {Link} from 'react-router-dom'

import OrderListItem from 'components/common/order/OrderListItem'
import {tokenState} from 'recoil/token/atom'
import {getRecentOrderAPI} from 'api/order'

const OrderList = styled.section`
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-bottom: 1rem;
  > h3 {
    font-size: var(--font-size-primary);
    font-weight: bold;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-gray);
  }
`

const NoItem = styled.div`
  padding: 5rem 0;
  margin-top: 3rem;
  text-align: center;
  color: var(--color-text-sub);
  font-size: var(--font-size-secondary);
  background: var(--color-light-gray);
`

const UserOrderList = () => {
  const [order, setOrder] = useState([])
  const [token, setToken] = useRecoilState(tokenState)
  const {showBoundary} = useErrorBoundary()

  useEffect(() => {
    const getRecentorder = async () => {
      try {
        const result = await getRecentOrderAPI(token)
        if (result.data.accessToken) setToken(result.data.accessToken)
        if (result.data.success) {
          setOrder(result.data.orderList)
        }
      } catch (error) {
        showBoundary(error)
      }
    }
    getRecentorder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBoundary])

  return (
    <OrderList>
      <Title>
        <h3>최근 주문상품</h3>
        {order.length !== 0 && <Link to="/myOrder">더보기</Link>}
      </Title>
      {order.length !== 0 ? (
        order.map((item) => {
          return (
            <OrderListItem
              order={item}
              key={item._id}
            />
          )
        })
      ) : (
        <NoItem>최근 구매한 상품이 없습니다</NoItem>
      )}
    </OrderList>
  )
}

export default UserOrderList

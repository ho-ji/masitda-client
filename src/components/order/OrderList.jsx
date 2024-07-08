import styled from 'styled-components'
import {useRecoilState} from 'recoil'
import {useEffect} from 'react'
import {useErrorBoundary} from 'react-error-boundary'

import OrderListItem from 'components/common/order/OrderListItem'
import SkeletonOrderListItem from 'components/common/order/SkeletonOrderListItem'
import {getTempOrderAPI} from 'api/tempOrder'
import {useNavigate, useParams} from 'react-router-dom'
import {tokenState} from 'recoil/token/atom'

const Container = styled.section`
  display: flex;
  flex-direction: column;
`

const OrderList = ({order, setOrder}) => {
  const {orderId} = useParams()
  const navigate = useNavigate()
  const [token, setToken] = useRecoilState(tokenState)
  const {showBoundary} = useErrorBoundary()

  useEffect(() => {
    const getTempOrder = async () => {
      try {
        const result = await getTempOrderAPI(token, orderId)
        if (result.data.accessToken) setToken(result.data.accessToken)
        if (result.data.success) {
          setOrder(result.data.order)
        } else {
          navigate(-1)
        }
      } catch (error) {
        showBoundary(error)
      }
    }
    getTempOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, navigate, setOrder, showBoundary])

  return (
    <Container>
      <h3>주문상품</h3>
      <ul>
        {order.length
          ? order.map((item) => {
              return (
                <OrderListItem
                  order={item}
                  key={item._id}
                />
              )
            })
          : Array.from({length: 5}).map((_, i) => {
              return <SkeletonOrderListItem key={i} />
            })}
      </ul>
    </Container>
  )
}

export default OrderList

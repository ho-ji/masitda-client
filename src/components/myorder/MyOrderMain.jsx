import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useRecoilState} from 'recoil'
import _ from 'lodash'
import {useErrorBoundary} from 'react-error-boundary'

import {getOrderAPI} from 'api/order'
import {tokenState} from 'recoil/token/atom'
import {mainContainerStyle} from 'styles/variables'
import OrderListItem from 'components/common/order/OrderListItem'
import SkeletonOrderListItem from 'components/common/order/SkeletonOrderListItem'

const Container = styled.main`
  ${mainContainerStyle}
  >h2 {
    font-size: var(--font-size-emphasis);
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
  }
`
const OrderDate = styled.p`
  padding: 1rem;
  background-color: var(--color-light-gray);
  margin-top: 3rem;
`

const NoItem = styled.div`
  padding: 5rem;
  text-align: center;
  color: var(--color-text-sub);
  font-size: var(--font-size-secondary);
  background: var(--color-light-gray);
`

const MyOrderMain = () => {
  const [orderList, setOrderList] = useState([])
  const [page, setPage] = useState(1)
  const [isMore, setIsMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [token, setToken] = useRecoilState(tokenState)
  const {showBoundary} = useErrorBoundary()

  const handleScroll = _.throttle(() => {
    if (loading || !isMore) return
    const {scrollTop, scrollHeight} = document.documentElement
    if (scrollHeight - window.innerHeight - scrollTop < 200) {
      setPage((prevPage) => prevPage + 1)
    }
  }, 200)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const getOrder = async () => {
      setLoading(true)
      try {
        const result = await getOrderAPI(token, page)
        if (result.data.success) {
          if (result.data.accessToken) setToken(result.data.accessToken)
          if (result.data.orderList.length === 0) setIsMore(false)
          else setOrderList((prevOrders) => [...prevOrders, ...result.data.orderList])
        }
      } catch (error) {
        showBoundary(error)
      } finally {
        setLoading(false)
        setInitialLoading(false)
      }
    }
    getOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, showBoundary])

  return (
    <Container>
      <h2>주문내역</h2>
      {!initialLoading ? (
        orderList.length !== 0 ? (
          orderList.map((order) => (
            <div key={order._id}>
              <OrderDate>주문일자 {order.orderDate?.slice(0, 10)}</OrderDate>
              <ul>
                {order.products?.map((item) => (
                  <OrderListItem
                    order={item}
                    key={item._id}
                  />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <NoItem>현재 구매하신 상품이 없습니다</NoItem>
        )
      ) : (
        <>
          <OrderDate>ㅤ</OrderDate>
          {Array.from({length: 3}).map((_, i) => {
            return <SkeletonOrderListItem key={i} />
          })}
        </>
      )}
    </Container>
  )
}

export default MyOrderMain

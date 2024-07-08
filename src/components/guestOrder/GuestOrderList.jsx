import styled from 'styled-components'
import {useEffect, useState} from 'react'

import OrderListItem from 'components/common/order/OrderListItem'
import {mainContainerStyle} from 'styles/variables'
import {calculateSaleCost} from 'utils/cost'

const Container = styled.main`
  ${mainContainerStyle}
  >h2 {
    font-size: var(--font-size-emphasis);
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }
`
const Date = styled.p`
  text-align: center;
  margin-bottom: 3rem;
`

const TotalCost = styled.p`
  padding: 2rem;
  background-color: var(--color-light-gray);
  text-align: right;
  > span {
    font-size: var(--font-size-primary);
    font-weight: bold;
    margin-left: 1rem;
  }
`

const GuestOrderList = ({orderList}) => {
  const [totalCost, setTotalCost] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)

  useEffect(() => {
    const cost = orderList.products.reduce((acc, item) => {
      return acc + item.count * calculateSaleCost(item.cost, item.rate)
    }, 0)
    if (cost < 30000) setDeliveryFee(3000)
    setTotalCost(cost)
  }, [orderList])

  return (
    <>
      {orderList && (
        <Container>
          <h2>주문내역</h2>
          <Date>주문일자 {orderList.orderDate.slice(0, 10)}</Date>
          <ul>
            {orderList.products?.map((item) => {
              return (
                <OrderListItem
                  order={item}
                  key={item._id}
                />
              )
            })}
          </ul>
          <TotalCost>
            주문금액<span>{totalCost + deliveryFee}원</span>
          </TotalCost>
        </Container>
      )}
    </>
  )
}

export default GuestOrderList

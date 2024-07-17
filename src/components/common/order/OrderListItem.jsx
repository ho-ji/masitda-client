import {useState} from 'react'
import styled from 'styled-components'
import {skeletonStyle} from 'styles/variables'
import {calculateSaleCost, formatCostWithComma} from 'utils/cost'

const Container = styled.li`
  display: flex;
  height: 15rem;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid var(--color-border);
  @media (max-width: 768px) {
    padding: 1.8rem;
    height: 12rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
    height: 10rem;
  }
`
const Info = styled.div`
  flex: 1;
`

const Image = styled.img`
  display: ${(props) => (props.$load ? 'block' : 'none')};
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
`

const SkeletonImage = styled.div`
  display: ${(props) => (props.$load ? 'none' : 'block')};
  ${skeletonStyle}
  height: 100%;
  aspect-ratio: 1/1;
`

const Temp = styled.p`
  width: fit-content;
  font-size: var(--font-size-subtext);
  border: 1px solid var(--color-gray);
  border-radius: 3px;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`
const Name = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Count = styled.p`
  text-align: right;
`

const CostContainer = styled.div`
  width: 10rem;
  text-align: right;
  @media (max-width: 768px) {
    width: 8rem;
  }
  @media (max-width: 480px) {
    width: 6rem;
  }
`

const Cost = styled.p`
  font-size: var(--font-size-primary);
  color: var(--color-main);
  font-weight: bold;
`
const RegularCost = styled.p`
  text-decoration: line-through;
  color: var(--color-text-sub);
  font-size: var(--font-size-subtext);
`

const OrderListItem = ({order}) => {
  const [loadImage, setLoadImage] = useState(false)
  return (
    <>
      {order && (
        <Container>
          <SkeletonImage $load={loadImage} />
          <Image
            src={order.product.image}
            alt="상품 이미지"
            $load={loadImage}
            onLoad={() => setLoadImage(true)}
          />
          <Info>
            <Temp>{order.product.temp}</Temp>
            <Name>{order.product.name}</Name>
          </Info>
          <Count>{order.count}개</Count>
          <CostContainer>
            <Cost>{formatCostWithComma(order.count * calculateSaleCost(order.cost, order.rate))}원</Cost>
            <RegularCost>{formatCostWithComma(order.count * order.cost)}원</RegularCost>
          </CostContainer>
        </Container>
      )}
    </>
  )
}

export default OrderListItem

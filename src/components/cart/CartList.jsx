import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import styled from 'styled-components'
import {useState} from 'react'

import {cartListState} from 'recoil/cart/atom'
import {formatSaleCost, formatTotalCost} from 'utils/cost'
import checkImage from 'assets/images/check.svg'
import plusImage from 'assets/images/plus.svg'
import minusImage from 'assets/images/minus.svg'
import {deleteOneSelector, updateCountSelector, updateSelectSelector} from 'recoil/cart/selector'
import useModal from 'hooks/useModal'
import {deleleCartProductAPI, postCartProductAPI} from 'api/cart'
import {tokenState} from 'recoil/token/atom'
import closeImage from 'assets/images/close.svg'
import { skeletonStyle } from 'styles/variables'

const Container = styled.ul`
  border-top: 1px solid black;
  width: 100%;
  text-align: center;
`

const CartListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  gap: 2rem;
  border-bottom: 1px solid var(--color-border);
  @media (max-width: 480px) {
    gap: 1rem;
  }
`

const Label = styled.label`
  display: flex;
  align-self: flex-start;
  > input {
    appearance: none;
    border: 1px solid var(--color-gray);
    width: 2.5rem;
    height: 2.5rem;
    &:checked {
      background: url(${checkImage}) no-repeat center/2rem;
      background-color: var(--color-main);
    }
  }
`
const SkeletonImage = styled.div`
  display: ${(props) => (props.$load ? 'none' : 'block')};
  ${skeletonStyle}
  width: 10rem;
  aspect-ratio: 1/1;
  align-self: flex-start;
  @media (max-width: 480px) {
    width: 6rem;
  }
`

const Image = styled.img`
  display: ${(props) => (props.$load ? 'block' : 'none')};
  width: 10rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border: 1px solid var(--color-border);
  align-self: flex-start;
  @media (max-width: 480px) {
    width: 6rem;
  }
`

const ProductInfo = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Temp = styled.span`
  width: fit-content;
  font-size: var(--font-size-subtext);
  border: 1px solid var(--color-gray);
  border-radius: 3px;
  padding: 0 0.5rem;
`
const Name = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-all;
`

const RegularCost = styled.p`
  text-decoration: line-through;
  color: var(--color-text-sub);
  font-size: var(--font-size-subtext);
`

const Count = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-subtext);
  text-align: center;
  > button {
    width: 2.2rem;
    height: 2rem;
    border: 1px solid var(--color-gray);
  }
  > p {
    width: 4rem;
    height: 2rem;
    border-top: 1px solid var(--color-gray);
    border-bottom: 1px solid var(--color-gray);
  }
`

const MinusButton = styled.button`
  background: url(${minusImage}) no-repeat center/1.8rem;
`

const PlusButton = styled.button`
  background: url(${plusImage}) no-repeat center/1.8rem;
`

const DeleteButton = styled.button`
  width: 3rem;
  height: 3rem;
  background: url(${closeImage}) no-repeat center/2.5rem;
  display: inline-block;
  align-self: flex-start;
`
const CartList = () => {
  const [token, setToken] = useRecoilState(tokenState)
  const [loading, setLoading] = useState(false)
  const [loadImage, setLoadImage] = useState(false)
  const cartList = useRecoilValue(cartListState)
  const updateCheck = useSetRecoilState(updateSelectSelector)
  const updateCount = useSetRecoilState(updateCountSelector)
  const deleteOne = useSetRecoilState(deleteOneSelector)
  const {updateModal, openModal} = useModal()

  const handleSelectChange = (productId) => (e) => {
    updateCheck({productId, isSelected: e.target.checked})
  }

  const handleCountButtonClick = (currentCount, productId, count) => async () => {
    if (loading) return
    if (currentCount + count <= 0) return
    try {
      setLoading(true)
      const result = await postCartProductAPI({productId, count, accessToken: token})
      if (result.data.success) {
        if (result.data.accessToken) setToken(result.data.accessToken)
        updateCount({productId, count})
      }
    } catch {
      alert('잠시 후 다시 시도해주세요')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (productId) => {
    if (loading) return
    try {
      setLoading(true)
      const result = await deleleCartProductAPI([productId], token)
      if (result.data.success) {
        if (result.data.accessToken) setToken(result.data.accessToken)
        deleteOne(productId)
      }
    } catch (error) {
      alert('잠시 후 다시 시도해주세요')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOneClick = (productId) => () => {
    updateModal('delete', () => deleteProduct(productId))
    openModal()
  }

  return (
    <Container>
      {cartList &&
        cartList.map((item, i) => {
          return (
            <CartListItem>
              <Label>
                <input
                  type="checkbox"
                  checked={item.isSelected === undefined ? true : item.isSelected}
                  onChange={handleSelectChange(item.product._id)}></input>
              </Label>
              <SkeletonImage $load={loadImage} />
              <Image
                src={item.product.image}
                alt={`${item.product.name} 이미지`}
                $load={loadImage}
                onLoad={() => setLoadImage(true)}
              />
              <ProductInfo>
                <Temp>{item.product.temp}</Temp>
                <Name>{item.product.name}</Name>
                <Count>
                  <MinusButton
                    $count="minus"
                    type="button"
                    onClick={handleCountButtonClick(item.count, item.product._id, -1)}>
                    <span className="a11y-hidden">상품수량감소</span>
                  </MinusButton>
                  <p>{item.count}</p>
                  <PlusButton
                    $count="plus"
                    type="button"
                    onClick={handleCountButtonClick(item.count, item.product._id, 1)}>
                    <span className="a11y-hidden">상품수량증가</span>
                  </PlusButton>
                </Count>
              </ProductInfo>
              <div>
                <p>{`${formatSaleCost(item.product.cost, item.product.rate, item.count)}원`}</p>
                {item.product.rate !== 0 && <RegularCost>{`${formatTotalCost(item.product.cost, item.count)}원`}</RegularCost>}
              </div>
              <DeleteButton
                type="button"
                onClick={handleDeleteOneClick(item.product._id)}>
                <span className="a11y-hidden">상품 하나 삭제하기</span>
              </DeleteButton>
            </CartListItem>
          )
        })}
    </Container>
  )
}

export default CartList

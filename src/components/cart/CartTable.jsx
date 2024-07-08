import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

import {cartListState} from 'recoil/cart/atom'
import {formatCostWithComma, formatSaleCost} from 'utils/cost'
import checkImage from 'assets/images/check.svg'
import plusImage from 'assets/images/plus.svg'
import minusImage from 'assets/images/minus.svg'
import {deleteOneSelector, updateCountSelector, updateSelectSelector} from 'recoil/cart/selector'
import useModal from 'hooks/useModal'
import {deleleCartProductAPI, postCartProductAPI} from 'api/cart'
import {tokenState} from 'recoil/token/atom'
import {postTempOrderAPI} from 'api/tempOrder'

const Container = styled.table`
  border-top: 1px solid black;
  width: 100%;
  text-align: center;
  table-layout: fixed;
`

const Thead = styled.thead`
  background-color: var(--color-light-gray);
  border-bottom: 1px solid var(--color-border);
`

const Th = styled.th`
  padding: 2rem;
  width: 10rem;
  &:first-child {
    width: 5rem;
  }
  &:nth-child(2) {
    width: auto;
  }
  &:last-child {
    width: 12rem;
  }
`

const Tr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }
  > td {
    padding: 2rem 1rem;
    vertical-align: middle;
    &:first-child {
      padding: 0;
    }
  }
`

const Label = styled.label`
  display: flex;
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

const ProductName = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  > img {
    flex: 0 0 10rem;
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border: 1px solid var(--color-border);
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
`

const Temp = styled.span`
  width: fit-content;
  font-size: var(--font-size-subtext);
  border: 1px solid var(--color-gray);
  border-radius: 3px;
  padding: 0 0.5rem;
`
const Name = styled.p`
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
`

const Cost = styled.p`
  font-weight: 500;
`

const RegularCost = styled.p`
  text-decoration: line-through;
  color: var(--color-text-sub);
  font-size: var(--font-size-subtext);
`

const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-subtext);
  > button {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--color-gray);
  }
  > p {
    width: 5rem;
    height: 2.5rem;
    border-top: 1px solid var(--color-gray);
    border-bottom: 1px solid var(--color-gray);
  }
`

const MinusButton = styled.button`
  background: url(${minusImage}) no-repeat center/2rem;
`

const PlusButton = styled.button`
  background: url(${plusImage}) no-repeat center/2rem;
`

const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  > button {
    width: fit-content;
    border: 1px solid var(--color-gray);
    padding: 0.5rem 1.5rem;
  }
`

const BuyNowButton = styled.button`
  background-color: var(--color-main);
  color: white;
`

const DeleteButton = styled.button`
  background-color: white;
  color: var(--color-text-sub);
`
const CartTable = () => {
  const [token, setToken] = useRecoilState(tokenState)
  const [loading, setLoading] = useState(false)
  const cartList = useRecoilValue(cartListState)
  const updateCheck = useSetRecoilState(updateSelectSelector)
  const updateCount = useSetRecoilState(updateCountSelector)
  const deleteOne = useSetRecoilState(deleteOneSelector)
  const {updateModal, openModal} = useModal()
  const navigate = useNavigate()

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

  const handleBuyNowClick = (product, count, cost, rate) => async () => {
    if (loading) return
    try {
      setLoading(true)
      const result = await postTempOrderAPI({token, order: [{product, count, cost, rate}]})
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

  const handleDeleteOneClick = (productId) => () => {
    updateModal('delete', () => deleteProduct(productId))
    openModal()
  }

  return (
    <Container>
      <caption className="a11y-hidden">장바구니 상품리스트</caption>
      <Thead>
        <tr>
          <Th>
            <span className="a11y-hidden">체크</span>
          </Th>
          <Th scope="col">상품명</Th>
          <Th scope="col">구매가</Th>
          <Th scope="col">수량</Th>
          <Th scope="col">금액</Th>
          <Th scope="col">선택</Th>
        </tr>
      </Thead>
      <tbody>
        {cartList.map((item, i) => {
          return (
            <Tr key={i}>
              <td>
                <Label>
                  <input
                    type="checkbox"
                    checked={item.isSelected === undefined ? true : item.isSelected}
                    onChange={handleSelectChange(item.product._id)}></input>
                </Label>
              </td>
              <td>
                <ProductName>
                  <img
                    src={item.product.image}
                    alt={`${item.product.name} 이미지`}
                  />
                  <div>
                    <Temp>{item.product.temp}</Temp>
                    <Name>{item.product.name}</Name>
                  </div>
                </ProductName>
              </td>
              <td>
                <>
                  <Cost>{`${formatSaleCost(item.product.cost, item.product.rate)}원`}</Cost>
                  {item.product.rate !== 0 && <RegularCost>{`${formatCostWithComma(item.product.cost)}원`}</RegularCost>}
                </>
              </td>
              <td>
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
              </td>
              <td>
                <p>{`${formatSaleCost(item.product.cost, item.product.rate, item.count)}원`}</p>
              </td>
              <td>
                <Select>
                  <BuyNowButton
                    type="button"
                    onClick={handleBuyNowClick(item.product._id, item.count, item.product.cost, item.product.rate)}>
                    바로구매
                  </BuyNowButton>
                  <DeleteButton
                    type="button"
                    onClick={handleDeleteOneClick(item.product._id)}>
                    삭제하기
                  </DeleteButton>
                </Select>
              </td>
            </Tr>
          )
        })}
      </tbody>
    </Container>
  )
}

export default CartTable

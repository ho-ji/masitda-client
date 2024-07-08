import {useEffect, useState} from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import styled from 'styled-components'
import {useMediaQuery} from 'react-responsive'

import {deleleCartProductAPI} from 'api/cart'
import {cartListState} from 'recoil/cart/atom'
import checkImage from 'assets/images/check.svg'
import CartTable from './CartTable'
import {deleteMultipleSelector, getSelectedIdListSelector, updateAllSelectSelector} from 'recoil/cart/selector'
import useModal from 'hooks/useModal'
import CartCost from './CartCost'
import CartPurchase from './CartPurchase'
import {tokenState} from 'recoil/token/atom'
import {mainContainerStyle} from 'styles/variables'
import CartList from './CartList'

const Container = styled.main`
  ${mainContainerStyle}
  min-height: 30rem;
`

const CartHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
  > h2 {
    font-weight: bold;
    font-size: var(--font-size-emphasis);
  }
`

const SelectContainer = styled.div`
  display: flex;
  margin: 3rem 0;
  color: var(--color-text-main);
  > label {
    margin-right: 2rem;
    > input {
      margin-right: 1rem;
      float: left;
      appearance: none;
      border: 1px solid var(--color-gray);
      width: 2.5rem;
      height: 2.5rem;
      &:checked {
        background: url(${checkImage}) no-repeat center/2rem;
        background-color: var(--color-main);
      }
    }
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 2rem;
      background-color: var(--color-gray);
      margin-left: 2rem;
      vertical-align: middle;
    }
  }
`

const NoItem = styled.p`
  width: 100%;
  padding: 10rem 0;
  margin-top: 3rem;
  text-align: center;
  color: var(--color-text-sub);
  font-size: var(--font-size-primary);
  background: var(--color-light-gray);
`

const CartMain = () => {
  const [token, setToken] = useRecoilState(tokenState)
  const cartList = useRecoilValue(cartListState)
  const updateAllSelect = useSetRecoilState(updateAllSelectSelector)
  const selectedIdList = useRecoilValue(getSelectedIdListSelector)
  const deleteMultiple = useSetRecoilState(deleteMultipleSelector)
  const [isAllSelect, setIsAllSelect] = useState(true)
  const {updateModal, openModal} = useModal()
  const isMobile = useMediaQuery({query: '(max-width: 768px)'})

  const handleAllSelectChange = (e) => {
    updateAllSelect(e.target.checked)
    setIsAllSelect(e.target.checked)
  }

  const deleteSelectedProduct = async () => {
    try {
      const result = await deleleCartProductAPI(selectedIdList, token)
      if (result.data.success) {
        if (result.data.accessToken) setToken(result.data.accessToken)
        deleteMultiple()
      }
    } catch {
      alert('잠시 후 다시 시도해주세요.')
    }
  }

  const handleDeleteClick = () => {
    updateModal('delete', deleteSelectedProduct)
    openModal()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <CartHeader>
        <h2>장바구니</h2>
        <span>{`상품 (${cartList.length})`}</span>
        <span className="a11y-hidden">개</span>
      </CartHeader>
      {cartList.length !== 0 ? (
        <>
          <SelectContainer>
            <label>
              <input
                type="checkbox"
                checked={isAllSelect}
                onChange={handleAllSelectChange}></input>
              전체선택
            </label>
            <button
              type="button"
              onClick={handleDeleteClick}>
              선택삭제
            </button>
          </SelectContainer>
          {isMobile ? <CartList /> : <CartTable />}
          <CartCost />
          <CartPurchase />
        </>
      ) : (
        <NoItem>장바구니가 비어 있습니다</NoItem>
      )}
    </Container>
  )
}

export default CartMain

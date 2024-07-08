import {getGuestOrderAPI} from 'api/order'
import {signUpText} from 'constants/authText'
import regex from 'constants/regex'
import useInput from 'hooks/useInput'
import {useState} from 'react'
import styled from 'styled-components'

import {inputStyle, mainContainerStyle, mainSmallButtonStyle} from 'styles/variables'
import GuestOrderList from './GuestOrderList'

const Container = styled.main`
  ${mainContainerStyle}
  padding: 0;
  width: 35rem;
  > h2 {
    font-size: var(--font-size-emphasis);
    font-weight: bold;
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    width: 95%;
  }
`
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  > label {
    flex: 0 0 7rem;
  }
  > input,
  select {
    ${inputStyle}
  }
  > select {
    margin-right: 1rem;
  }
  > input {
    flex: 1;
    min-width: 0;
  }
`

const Button = styled.button`
  width: 100%;
  margin-top: 2rem;
  ${mainSmallButtonStyle}
`

const GuestOrderMain = () => {
  const {value: orderNumber, handler: handleOrderNumberChange} = useInput()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phonePrefix, setPhonePrefix] = useState('010')
  const [orderList, setOrderList] = useState([])

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) setPhoneNumber(inputValue)
  }

  const handleSearchClick = async (e) => {
    e.preventDefault()

    if (!/\d{6}-\d{4}/.test(orderNumber)) return alert('주문번호를 입력해주세요')
    const contactNumber = phonePrefix + phoneNumber
    if (!regex.phoneNumber.test(contactNumber)) return alert(signUpText.phoneNumber.validationError)

    try {
      const result = await getGuestOrderAPI(orderNumber, contactNumber)
      if (!result.data.success) alert('해당 정보로 조회되는 주문이 없습니다.')
      if (result.data.success) {
        setOrderList(result.data.orderList)
      }
    } catch {}
  }

  return (
    <>
      {orderList.length === 0 ? (
        <Container>
          <h2>비회원 주문조회</h2>
          <form>
            <InputContainer>
              <label htmlFor="guest-order-number">주문번호</label>
              <input
                type="text"
                id="guest-order-number"
                value={orderNumber}
                onChange={handleOrderNumberChange}
                maxLength="11"
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="guest-phone-number">연락처</label>
              <select
                name="contactNumber1"
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}>
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
              </select>
              <input
                type="tel"
                maxLength="8"
                id="guest-phone-number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                name="contactNumber2"></input>
            </InputContainer>
            <Button onClick={handleSearchClick}>주문 조회</Button>
          </form>
        </Container>
      ) : (
        <GuestOrderList orderList={orderList} />
      )}{' '}
    </>
  )
}

export default GuestOrderMain

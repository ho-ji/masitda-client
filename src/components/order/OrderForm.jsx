import styled from 'styled-components'
import {useState} from 'react'

import useInput from 'hooks/useInput'
import {inputStyle, mainSmallButtonStyle} from 'styles/variables'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  select,
  input {
    ${inputStyle}
  }
  label {
    flex: 0 0 7rem;
    color: var(--color-text-main);
  }
  > div {
    padding: 2rem;
    border-bottom: 1px solid var(--color-border);
  }
  @media (max-width: 480px) {
    width: 95%;
    label {
      flex: 0 0 6rem;
    }
  }
`

const Input = styled.input`
  @media (max-width: 480px) {
    flex: 1;
    min-width: 0;
  }
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  > select {
    margin-right: 1rem;
  }
`

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > div {
    display: flex;
    align-items: center;
  }
`

const AddressSearch = styled.button`
  margin-left: 2rem;
  ${mainSmallButtonStyle}
  flex: 0 0 7rem;
`

const OrderForm = ({formRef}) => {
  const {value: name, handler: handleName} = useInput()
  const {value: contactNumber, handler: handleContactNumber} = useInput()
  const {value: detailAddress, handler: handleDetailAdress} = useInput()
  const [zonecode, setZonecode] = useState('')
  const [roadAddress, setRoadAddress] = useState('')

  const handleContactNumberChange = (e) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) handleContactNumber(e)
  }

  const handleAddressSearchClick = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setRoadAddress(data.roadAddress)
        setZonecode(data.zonecode)
      },
    }).open()
  }

  return (
    <Container ref={formRef}>
      <h3>배송지</h3>
      <InputContainer>
        <label htmlFor="delivery-name">배송지명</label>
        <Input
          type="text"
          placeholder="최대 10자"
          id="delivery-name"
          maxLength="10"
          value={name}
          onChange={handleName}
          name="name"></Input>
      </InputContainer>
      <InputContainer>
        <label htmlFor="contact-number">연락처</label>
        <select name="contactNumber1">
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="018">018</option>
          <option value="019">019</option>
        </select>
        <Input
          type="tel"
          maxLength="8"
          id="contact-number"
          value={contactNumber}
          onChange={handleContactNumberChange}
          name="contactNumber2"></Input>
      </InputContainer>
      <AddressContainer>
        <div>
          <label>배송지</label>
          <Input
            type="text"
            disabled
            name="zonecode"
            value={zonecode}></Input>
          <AddressSearch
            type="button"
            onClick={handleAddressSearchClick}>
            검색
          </AddressSearch>
        </div>
        <input
          type="text"
          disabled
          name="roadAddress"
          value={roadAddress}></input>
        <input
          type="text"
          placeholder="상세주소 입력"
          value={detailAddress}
          maxLength="50"
          onChange={handleDetailAdress}
          name="detailAddress"></input>
      </AddressContainer>
    </Container>
  )
}

export default OrderForm

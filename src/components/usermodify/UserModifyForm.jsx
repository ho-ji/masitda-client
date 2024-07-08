import styled from 'styled-components'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {useErrorBoundary} from 'react-error-boundary'

import {getModifyUserAPI, postModifyUserAPI, postVerifyPasswordAPI} from 'api/user'
import {tokenState} from 'recoil/token/atom'
import useInput from 'hooks/useInput'
import regex from 'constants/regex'
import {signUpText} from 'constants/authText'
import {inputStyle, mainButtonStyle, subButtonStyle} from 'styles/variables'

const Guide = styled.p`
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
  width: 35rem;
  text-align: right;
  margin: 0 auto 1rem auto;
  @media (max-width: 480px) {
    width:95%;
  }
`

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

const Star = styled.span`
  color: var(--color-red);
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 35rem;
  > label {
    text-align: left;
    color: var(--color-text-main);
    flex: 0 0 13rem;
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
  @media (max-width: 480px) {
    width: 95%;
    > label {
      flex: 0 0 10rem;
    }
  }
`

const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
`

const CancelButton = styled.button`
  ${subButtonStyle}
`
const ModifyButton = styled.button`
  ${mainButtonStyle}
`

const UserModifyForm = () => {
  const [token, setToken] = useRecoilState(tokenState)
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const {value: currentPassword, handler: handleCurrentPassword} = useInput()
  const {value: newPassword, handler: handleNewPassword} = useInput()
  const {value: newPasswordCheck, handler: handleNewPasswordCheck} = useInput()
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phonePrefix, setPhonePrefix] = useState('010')
  const navigate = useNavigate()
  const {showBoundary} = useErrorBoundary()

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) setPhoneNumber(inputValue)
  }

  const handleModifyClick = async (e) => {
    e.preventDefault()
    const phone = phonePrefix + phoneNumber
    if (!regex.phoneNumber.test(phone)) return alert(signUpText.phoneNumber.validationError)
    if (!regex.email.test(email)) return alert(signUpText.email.validationError)
    if (currentPassword === '') return alert('현재 비밀번호를 입력해주세요.')
    if (newPassword !== '') {
      if (!regex.password.test(newPassword)) return alert(signUpText.password.validationError)
      if (newPassword !== newPasswordCheck) return alert(signUpText.passwordCheck.validationError)
    }
    try {
      const result = await postVerifyPasswordAPI(token, currentPassword)
      if (result.data.accessToken) setToken(result.data.accessToken)
      if (!result.data.success) return alert('잘못된 비밀번호입니다. 다시 시도해주세요.')

      const info = {phoneNumber: phone, email}
      if (newPassword !== '') info.password = newPassword

      const modifyResult = await postModifyUserAPI(token, info)
      if (modifyResult.data.accessToken) setToken(modifyResult.data.accessToken)
      if (modifyResult.data.success) {
        navigate('/user')
      }
    } catch {
      alert('잠시 후 다시 시도해주세요')
    }
  }

  useEffect(() => {
    const getModifyUser = async () => {
      try {
        const result = await getModifyUserAPI(token)
        if (result.data.success) {
          if (result.data.accessToken) setToken(result.data.accessToken)
          setName(result.data.user.name)
          setAccount(result.data.user.account)
          const phoneNumber = result.data.user.phoneNumber
          setPhonePrefix(phoneNumber.slice(0, 3))
          setPhoneNumber(phoneNumber.slice(3))
          setEmail(result.data.user.email)
        }
      } catch (error) {
        showBoundary(error)
      }
    }
    getModifyUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Guide>
        <Star>*</Star> 필수입력
      </Guide>
      <Container>
        <InputContainer>
          <label>이름</label>
          <input
            type="text"
            value={name}
            disabled
          />
        </InputContainer>
        <InputContainer>
          <label>아이디</label>
          <input
            type="text"
            value={account}
            disabled
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="current-password">
            현재 비밀번호<Star> *</Star>
          </label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={handleCurrentPassword}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="new-password">새 비밀번호</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={handleNewPassword}
            placeholder={signUpText.password.placeholder}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="check-new-password">새 비밀번호 확인</label>
          <input
            id="check-new-password"
            type="password"
            value={newPasswordCheck}
            onChange={handleNewPasswordCheck}
            placeholder={signUpText.passwordCheck.placeholder}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="phone-number">
            연락처<Star> *</Star>
          </label>
          <select
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
            id="phone-number"
            type="text"
            value={phoneNumber}
            maxLength="8"
            placeholder={signUpText.phoneNumber.placeholder}
            onChange={handlePhoneNumberChange}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="email">
            이메일<Star> *</Star>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder={signUpText.email.placeholder}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <ButtonContainer>
          <CancelButton
            type="button"
            onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <ModifyButton onClick={handleModifyClick}>수정</ModifyButton>
        </ButtonContainer>
      </Container>
    </>
  )
}

export default UserModifyForm

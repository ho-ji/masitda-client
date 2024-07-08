import styled from 'styled-components'
import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import SignUpInput from './SignUpInput'
import regex from 'constants/regex'
import {postSignUpAPI} from 'api/user'

const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

const Button = styled.button`
  margin-top: 3rem;
  background-color: ${(props) => (props.$valid ? 'var(--color-main)' : 'var(--color-gray)')};
  color: white;
  padding: 1rem;
  border-radius: 5px;
  &:disabled {
    background-color: var(--color-gray);
  }
`

const SignUpForm = () => {
  const navigate = useNavigate()
  const formRef = useRef()
  const [isValid, setIsValid] = useState(false)
  const [accountError, setaccountError] = useState(true)
  const [passwordError, setPasswordError] = useState(true)
  const [passwordCheckError, setPasswordCheckError] = useState(true)
  const [nameError, setNameError] = useState(true)
  const [phoneNumberError, setPhoneNumberError] = useState(true)
  const [emailError, setEmailError] = useState(true)

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!isValid) return
    const {account, password, name, phoneNumber, email} = formRef.current

    const info = {
      account: account.value,
      password: password.value,
      name: name.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
    }
    try {
      await postSignUpAPI(info)
      navigate('/login')
    } catch (error) {
      alert('회원가입 실패! 잠시 후 다시 시도해주세요')
    }
  }

  useEffect(() => {
    setIsValid(!accountError && !passwordError && !passwordCheckError && !nameError && !phoneNumberError && !emailError)
  }, [accountError, passwordError, passwordCheckError, nameError, phoneNumberError, emailError])

  return (
    <Container
      ref={formRef}
      onSubmit={handleSignUp}>
      <SignUpInput
        type="account"
        validator={(v) => regex.account.test(v)}
        setValidError={setaccountError}
      />
      <SignUpInput
        type="password"
        validator={(v) => regex.password.test(v)}
        setValidError={setPasswordError}
      />
      <SignUpInput
        type="passwordCheck"
        validator={(v) => formRef.current.password.value === v}
        setValidError={setPasswordCheckError}
      />
      <SignUpInput
        type="name"
        validator={(v) => regex.name.test(v)}
        setValidError={setNameError}
      />
      <SignUpInput
        type="phoneNumber"
        validator={(v) => regex.phoneNumber.test(v)}
        setValidError={setPhoneNumberError}
      />
      <SignUpInput
        type="email"
        validator={(v) => regex.email.test(v)}
        setValidError={setEmailError}
      />
      <Button $valid={isValid}>회원가입</Button>
    </Container>
  )
}

export default SignUpForm

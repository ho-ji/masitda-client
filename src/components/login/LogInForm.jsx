import styled from 'styled-components'
import {useSetRecoilState} from 'recoil'
import {useRef} from 'react'
import {useNavigate} from 'react-router-dom'

import {postLogInAPI} from 'api/user'
import useInput from 'hooks/useInput'
import {logInText} from 'constants/authText'
import {tokenState} from 'recoil/token/atom'
import {mainButtonStyle} from 'styles/variables'

const Form = styled.form`
  width: 100%;
  input {
    &:focus {
      z-index: 2;
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.3);
    }
  }
`

const InputContainer = styled.div`
  border-radius: 5px;
  border: 1px solid var(--color-border);
`

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1rem;
  position: relative;
`
const IdInput = styled(Input)`
  border-radius: 5px 5px 0 0;
`
const PasswordInput = styled(Input)`
  border-top: 1px solid var(--color-border);
  border-radius: 0 0 5px 5px;
`

const LogInButton = styled.button`
  width: 100%;
  ${mainButtonStyle}
  margin: 2rem 0;
`

const LogInForm = () => {
  const idRef = useRef(null)
  const passwordRef = useRef(null)
  const setToken = useSetRecoilState(tokenState)
  const {value: idInput, handler: handleIdChange} = useInput()
  const {value: passwordInput, handler: handlePasswordChange, clear: clearPassword} = useInput()
  const navigate = useNavigate()

  const postLogIn = async () => {
    try {
      const result = await postLogInAPI(idInput, passwordInput)
      if (result.data.success) {
        const {accessToken, uid} = result.data
        localStorage.setItem('uid', uid)
        setToken(accessToken)
        navigate('/user', {replace: true})
      } else {
        alert(logInText.logInError)
        clearPassword()
        passwordRef.current.focus()
      }
    } catch {
      alert('잠시 후 다시 시도해주세요')
    }
  }

  const handleLogInSubmit = (e) => {
    e.preventDefault()

    if (idInput === '') {
      alert(logInText.idError)
      idRef.current.focus()
      return
    }
    if (passwordInput === '') {
      alert(logInText.passwordError)
      passwordRef.current.focus()
      return
    }

    postLogIn()
  }

  return (
    <Form onSubmit={handleLogInSubmit}>
      <InputContainer>
        <IdInput
          placeholder="아이디"
          title="아이디"
          value={idInput}
          onChange={handleIdChange}
          ref={idRef}
        />
        <PasswordInput
          placeholder="비밀번호"
          title="비밀번호"
          value={passwordInput}
          onChange={handlePasswordChange}
          ref={passwordRef}
          type="password"
        />
      </InputContainer>
      <LogInButton>로그인</LogInButton>
    </Form>
  )
}

export default LogInForm

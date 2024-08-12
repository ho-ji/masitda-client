import styled from 'styled-components'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useSetRecoilState} from 'recoil'

import {getVerifyResetTokenAPI} from 'api/passwordReset'
import {postPaswordChangeAPI} from 'api/user'
import {signUpText} from 'constants/authText'
import regex from 'constants/regex'
import useInput from 'hooks/useInput'
import PasswordResetSuccess from './PasswordResetSuccess'
import {inputStyle, mainSmallButtonStyle} from 'styles/variables'
import {loadingState} from 'recoil/loading/atom'

const Container = styled.main`
  margin: 5rem auto;
  width: 35rem;
  > h2 {
    font-size: var(--font-size-emphasis);
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > input {
    ${inputStyle}
  }
  > button {
    ${mainSmallButtonStyle}
    width: 100%;
    margin-top: 2rem;
  }
`

const PasswordResetMain = () => {
  const {token} = useParams()
  const navigate = useNavigate()
  const [uid, setUid] = useState('')
  const [isReset, setIsReset] = useState(false)
  const {value: passwordValue, handler: handlePasswordChange} = useInput()
  const {value: passwordCheckValue, handler: handlePasswordCheckChange} = useInput()
  const setLoading = useSetRecoilState(loadingState)

  const handlePasswordChangeClick = async (e) => {
    e.preventDefault()
    if (!regex.password.test(passwordValue)) return alert(signUpText.password.validationError)
    if (passwordValue !== passwordCheckValue) return alert(signUpText.passwordCheck.validationError)

    try {
      setLoading(true)
      await postPaswordChangeAPI({uid, password: passwordValue})
      setIsReset(true)
    } catch {
      alert('잠시 후 다시 시도해주세요')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getVerifyResetToken = async () => {
      try {
        const result = await getVerifyResetTokenAPI(token)
        if (!result.data.success) {
          navigate('/', {replace: true})
        }
        setUid(result.data.uid)
      } catch (error) {
        navigate('/', {replace: true})
      }
    }
    if (!token) return
    getVerifyResetToken()
  }, [token, navigate])

  return (
    <>
      <Container>
        <h2>비밀번호 재설정</h2>
        {!isReset ? (
          <Form>
            <label htmlFor="new-password">새 비밀번호</label>
            <input
              type="password"
              id="new-password"
              placeholder={signUpText.password.placeholder}
              value={passwordValue}
              onChange={handlePasswordChange}
            />
            <label htmlFor="new-password-check">새 비밀번호 확인</label>
            <input
              type="password"
              id="new-password-check"
              value={passwordCheckValue}
              placeholder={signUpText.passwordCheck.placeholder}
              onChange={handlePasswordCheckChange}
            />
            <button onClick={handlePasswordChangeClick}>변경하기</button>
          </Form>
        ) : (
          <PasswordResetSuccess />
        )}
      </Container>
    </>
  )
}

export default PasswordResetMain

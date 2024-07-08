import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {useState} from 'react'

import useInput from 'hooks/useInput'
import {postVerifyPasswordAPI} from 'api/user'
import {tokenState} from 'recoil/token/atom'
import UserModifyForm from './UserModifyForm'
import {inputStyle, mainButtonStyle, mainContainerStyle, subButtonStyle} from 'styles/variables'

const Container = styled.main`
  ${mainContainerStyle}
  text-align: center;
  > h2 {
    font-size: var(--font-size-emphasis);
    font-weight: bold;
    margin-bottom: 3rem;
  }

  > section {
    width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto 0 auto;
    padding: 3rem 0;
    border-radius: 5px;
    background-color: var(--color-light-gray);
    @media (max-width: 480px) {
      padding: 2rem 1rem;
      width: 95%;
    }
  }
`

const Text = styled.p`
  font-size: var(--font-size-primary);
  margin-bottom: 0.5rem;
`
const SubText = styled.p`
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
`

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  > input {
    width: 100%;
    ${inputStyle}
    margin: 3rem 0 2rem 0;
  }
  @media (max-width: 480px) {
    width: 80%;
  }
`

const CancelButton = styled.button`
  ${subButtonStyle}
`
const OkButton = styled.button`
  margin-left: 1rem;
  ${mainButtonStyle}
`

const UserModifyMain = () => {
  const navigate = useNavigate()
  const {value: passwordInput, handler} = useInput()
  const [token, setToken] = useRecoilState(tokenState)
  const [modify, setModify] = useState(false)

  const handleVerifyPassword = async (e) => {
    e.preventDefault()
    try {
      const result = await postVerifyPasswordAPI(token, passwordInput)
      if (result.data.accessToken) setToken(result.data.accessToken)
      if (!result.data.success) return alert('잘못된 비밀번호입니다. 다시 시도해주세요.')
      setModify(true)
    } catch {
      alert('잠시 후 다시 시도해주세요')
    }
  }

  return (
    <Container>
      <h2>회원정보 {!modify ? '확인' : '수정'}</h2>
      {!modify ? (
        <>
          <section>
            <Text>회원님의 소중한 정보를 안전하게 관리하세요.</Text>
            <SubText>회원정보를 수정하시려면 비밀번호를 입력해야합니다.</SubText>
            <PasswordForm>
              <input
                placeholder="비밀번호를 입력해주세요"
                type="password"
                value={passwordInput}
                onChange={handler}
              />
              <div>
                <CancelButton
                  type="button"
                  onClick={() => navigate(-1)}>
                  취소
                </CancelButton>
                <OkButton
                  type="submit"
                  onClick={handleVerifyPassword}>
                  확인
                </OkButton>
              </div>
            </PasswordForm>
          </section>
        </>
      ) : (
        <UserModifyForm />
      )}
    </Container>
  )
}

export default UserModifyMain

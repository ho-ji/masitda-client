import styled from 'styled-components'
import {useState} from 'react'

import {getFindPasswordAPI} from 'api/user'
import regex from 'constants/regex'
import useInput from 'hooks/useInput'
import {mainSmallButtonStyle} from 'styles/variables'

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  > label {
    width: 7rem;
  }
  > input {
    width: 100%;
    padding: 0 1rem;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    height: 3.5rem;
  }
`

const SearchButton = styled.button`
  ${mainSmallButtonStyle}
  width: 100%;
  margin-top: 2rem;
`

const ResultContainer = styled.div`
  text-align: center;
  > h3 {
    font-weight: bold;
    font-size: var(--font-size-primary);
    margin-bottom: 1rem;
  }
  > p {
    font-size: var(--font-size-subtext);
    > strong {
      color: var(--color-main);
      font-weight: bold;
      text-decoration: underline;
    }
  }
`

const FindPwSection = () => {
  const [isFind, setIsFind] = useState(false)
  const {value: accountValue, handler: handleAccountChange} = useInput()
  const {value: emailValue, handler: handleEmailChange} = useInput()

  const handleIdSearchClick = async (e) => {
    e.preventDefault()
    if (!regex.account.test(accountValue)) return alert('아이디를 입력해주세요')
    if (!regex.email.test(emailValue)) return alert('이메일을 입력해주세요')
    try {
      const result = await getFindPasswordAPI({email: emailValue, account: accountValue})
      if (result.data.success) {
        setIsFind(true)
      } else {
        alert('해당 정보로 일치하는 회원정보를 찾을 수 없습니다.')
      }
    } catch {}
  }

  return (
    <section>
      {!isFind ? (
        <form>
          <InputContainer>
            <label htmlFor="id-search-name">아이디</label>
            <input
              type="text"
              id="id-search-account"
              value={accountValue}
              onChange={handleAccountChange}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="id-search-email">이메일</label>
            <input
              type="email"
              id="id-search-email"
              value={emailValue}
              onChange={handleEmailChange}
            />
          </InputContainer>
          <SearchButton onClick={handleIdSearchClick}>이메일 발송</SearchButton>
        </form>
      ) : (
        <ResultContainer>
          <h3>비밀번호 재설정</h3>
          <p>비밀번호 재설정을 위한 이메일이 발송되었습니다.</p>
          <p>
            <strong>이메일을 확인</strong>해 주세요.
          </p>
        </ResultContainer>
      )}
    </section>
  )
}

export default FindPwSection

import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {useSetRecoilState} from 'recoil'

import {getFindAccountAPI} from 'api/user'
import regex from 'constants/regex'
import useInput from 'hooks/useInput'
import {mainSmallButtonStyle} from 'styles/variables'
import {loadingState} from 'recoil/loading/atom'

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
  > a {
    ${mainSmallButtonStyle}
  }
`
const Account = styled.p`
  margin: 2rem;
  font-size: var(--font-size-primary);
  font-weight: bold;
  > span {
    color: var(--color-main);
  }
`

const FindIdSection = () => {
  const [account, setAccount] = useState('')
  const {value: nameValue, handler: handleNameChange} = useInput()
  const {value: emailValue, handler: handleEmailChange} = useInput()
  const setLoading = useSetRecoilState(loadingState)

  const handleIdSearchClick = async (e) => {
    e.preventDefault()
    if (!regex.name.test(nameValue)) return alert('이름을 입력해주세요')
    if (!regex.email.test(emailValue)) return alert('이메일을 입력해주세요')

    try {
      setLoading(true)
      const result = await getFindAccountAPI({name: nameValue, email: emailValue})
      if (result.data.success) {
        setAccount(result.data.account)
      } else {
        alert('해당 정보로 일치하는 아이디를 찾을 수 없습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      {!account ? (
        <form>
          <InputContainer>
            <label htmlFor="id-search-name">이름</label>
            <input
              type="text"
              id="id-search-name"
              maxLength="6"
              value={nameValue}
              onChange={handleNameChange}
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
          <SearchButton onClick={handleIdSearchClick}>아이디 찾기</SearchButton>
        </form>
      ) : (
        <ResultContainer>
          <p>{nameValue} 회원님의 아이디는입니다</p>
          <Account>
            아이디 : <span>{account}</span>
          </Account>
          <Link to="/login">로그인</Link>
        </ResultContainer>
      )}
    </section>
  )
}

export default FindIdSection

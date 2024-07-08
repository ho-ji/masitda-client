import styled from 'styled-components'
import {useState} from 'react'
import {useLocation} from 'react-router-dom'

import FindIdSection from './FindIdSection'
import FindPwSection from './FindPwSection'
import {h2Style, mainContainerStyle} from 'styles/variables'

const Container = styled.main`
  ${mainContainerStyle}
  padding: 0;
  width: 35rem;
  > h2 {
    ${h2Style}
  }
  > section {
    padding: 4rem 2rem;
    border: 1x solid var(--color-dark-gray);
    border-top: none;
    > form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  @media (max-width: 480px) {
    width: 95%;
    > section {
      padding: 2rem 0;
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`
const SelectButton = styled.button`
  flex-grow: 1;
  padding: 1rem 0;
  background-color: ${(props) => (props.$select ? 'white' : 'var(--color-light-gray)')};
  border: ${(props) => (props.$select ? '1px solid var(--color-dark-gray)' : 'none')};
  border-bottom: ${(props) => (props.$select ? 'none' : '1px solid var(--color-dark-gray)')};
`

const FindIdPwMain = () => {
  const location = useLocation()
  const [findId, setFindId] = useState(location.state)

  return (
    <Container>
      <h2>아이디/비밀번호 찾기</h2>
      <ButtonContainer>
        <SelectButton
          type="button"
          onClick={() => setFindId(true)}
          $select={findId}>
          아이디찾기
        </SelectButton>
        <SelectButton
          type="button"
          onClick={() => setFindId(false)}
          $select={!findId}>
          비밀번호 재설정
        </SelectButton>
      </ButtonContainer>
      {findId ? <FindIdSection /> : <FindPwSection />}
    </Container>
  )
}

export default FindIdPwMain

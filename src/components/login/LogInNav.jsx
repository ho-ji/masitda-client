import {Link} from 'react-router-dom'
import styled from 'styled-components'

const UserLink = styled(Link)`
  color: var(--color-text-sub);
  font-size: var(--font-size-subtext);
  &:not(:last-child) {
    margin-right: 1rem;
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 1rem;
      background-color: var(--color-gray);
      margin-left: 1rem;
      vertical-align: middle;
    }
  }
`

const GuestOrder = styled.section`
  margin-top: 5rem;
  width: 100%;
  padding: 3rem 0;
  border-top: 1px solid var(--color-gray);
  text-align: center;
  > a {
    width: fit-content;
    color: var(--color-text-main);
  }
`

const LogInNav = () => {
  return (
    <>
      <nav>
        <UserLink
          to="/findIdPw"
          state={true}>
          아이디 찾기
        </UserLink>
        <UserLink to="/findIdPw">비밀번호 찾기</UserLink>
        <UserLink to="/signup">회원가입</UserLink>
      </nav>
      <GuestOrder>
        <Link to="/guestOrder">비회원 주문 조회하기</Link>
      </GuestOrder>
    </>
  )
}

export default LogInNav

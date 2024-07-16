import {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useErrorBoundary} from 'react-error-boundary'

import {tokenState} from 'recoil/token/atom'
import {getUserInformationAPI} from 'api/user'
import iconImage from 'assets/images/user_icon.svg'
import UserOrderList from './UserOrderList'
import {h2Style, mainContainerStyle} from 'styles/variables'

const Container = styled.main`
  ${mainContainerStyle}
  > h2 {
    ${h2Style}
    text-align: center;
  }
`
const UserInfo = styled.section`
  padding: 2.5rem;
  background-color: var(--color-light-gray);
  display: grid;
  grid-template-areas:
    'img name total'
    'img edit total';
  grid-template-columns: 6rem 3fr 1fr;
  align-items: center;
  margin-bottom: 5rem;
  grid-column-gap: 3rem;
  grid-row-gap: 1rem;
  > img {
    width: 6rem;
    aspect-ratio: 1/1;
    grid-area: img;
  }
  @media (max-width: 768px) {
    padding: 2.2rem;
    grid-template-columns: 5.5rem 3fr 1fr;
    margin-bottom: 4rem;
    grid-column-gap: 2.5rem;
    > img {
      width: 5.5rem;
    }
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
    grid-template-columns: 4rem 2fr 1fr;
    margin-bottom: 3rem;
    grid-column-gap: 2rem;
    grid-row-gap: 0.5rem;
    > img {
      width: 5rem;
    }
  }
`

const Name = styled.p`
  grid-area: name;
  font-size: var(--font-size-primary);
  font-weight: bold;
  > span {
    font-weight: normal;
  }
`
const Edit = styled(Link)`
  grid-area: edit;
  width: fit-content;
  font-size: var(--font-size-subtext);
  color: var(--color-text-main);
  border: 1px solid var(--color-gray);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem 0.5rem;
  }
`

const TotalOrder = styled.div`
  grid-area: total;
  text-align: center;
  border-left: 1px dashed var(--color-dark-gray);
  > p {
    color: var(--color-text-main);
    margin-bottom: 1rem;
    font-size: var(--font-size-subtext);
  }
  > div {
    font-size: var(--font-size-subtext);
    > span {
      font-weight: bold;
      font-size: var(--font-size-primary);
    }
  }
`

const UserInformation = () => {
  const [name, setName] = useState('')
  const [orderCount, setOrderCount] = useState(0)
  const [token, setToken] = useRecoilState(tokenState)
  const {showBoundary} = useErrorBoundary()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUserInformation = async () => {
      setLoading(true)
      try {
        const result = await getUserInformationAPI(token)
        if (result.data.success) {
          if (result.data.accessToken) setToken(result.data.accessToken)
          setName(result.data.user.name)
          setOrderCount(result.data.user.orderCount)
        }
      } catch (error) {
        showBoundary(error)
      } finally {
        setLoading(false)
      }
    }
    getUserInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h2>마이페이지</h2>
      <UserInfo>
        <img
          src={iconImage}
          alt=""
        />
        <Name>
          {loading ? 'ㅤㅤㅤ' : name}
          <span>님 </span>
          <span>안녕하세요.</span>
        </Name>
        <Edit to="/userModify">회원정보 수정</Edit>
        <TotalOrder>
          <p>주문 배송</p>
          <div>
            <span>{loading ? 'ㅤ' : orderCount}</span> 회
          </div>
        </TotalOrder>
      </UserInfo>
      <UserOrderList></UserOrderList>
    </Container>
  )
}

export default UserInformation

import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const Text = styled.p`
  color: var(--text-main);
  text-align: center;
`
const TimerText = styled(Text)`
  margin-top: 2rem;
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
  > span {
    text-decoration: underline;
  }
`

const PasswordResetSuccess = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(3)

  useEffect(() => {
    const countDown = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(countDown)
  }, [])

  useEffect(() => {
    if (count <= 0) navigate('/login', {replace: true})
  }, [count, navigate])

  useEffect(() => {
    const handleRefresh = () => {
      navigate('/login', {replace: true})
    }
    window.addEventListener('beforeunload', handleRefresh)
    return () => {
      window.removeEventListener('beforeunload', handleRefresh)
    }
  }, [navigate])

  return (
    <>
      <Text>비밀번호가 재설정되었습니다.</Text>
      <Text>새로운 비밀번호로 로그인해주세요.</Text>
      <TimerText>
        <span>{count}초</span> 후 로그인화면으로 이동합니다
      </TimerText>
    </>
  )
}

export default PasswordResetSuccess

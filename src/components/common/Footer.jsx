import styled from 'styled-components'

const Container = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 5rem 0;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-sub);
  font-size: var(--font-size-subtext);
`

const Footer = () => {
  return (
    <Container>
      <p>본 페이지는 상업적인 목적이 없는 포트폴리오용 사이트입니다</p>
      <p>©2024 장예지. All rights reserved.</p>
    </Container>
  )
}

export default Footer

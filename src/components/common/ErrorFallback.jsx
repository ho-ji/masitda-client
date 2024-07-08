import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  margin: 5rem 0;
`
const ErrorFallback = ({error, resetErrorBoundary}) => (
  <Container>
    <p>서버에 오류가 발생했습니다:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>다시 시도</button>
  </Container>
)

export default ErrorFallback

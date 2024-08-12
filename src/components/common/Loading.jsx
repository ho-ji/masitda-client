import styled from 'styled-components'
import {useRecoilValue} from 'recoil'

import {loadingState} from 'recoil/loading/atom'

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 99999;
`
const Loader = styled.div`
  width: 3.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-main) 94%, #0000) top/8px 8px no-repeat, conic-gradient(#0000 30%, var(--color-main));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
  @keyframes l13 {
    100% {
      transform: rotate(1turn);
    }
  }
`

const Loading = () => {
  const loading = useRecoilValue(loadingState)
  return (
    <>
      {loading && (
        <Container>
          <Loader />
        </Container>
      )}
    </>
  )
}

export default Loading

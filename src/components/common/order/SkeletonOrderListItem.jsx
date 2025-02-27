import styled from 'styled-components'

import {skeletonStyle} from 'styles/variables'

const Skeleton = styled.div`
  ${skeletonStyle}
`

const Container = styled.li`
  display: flex;
  height: 15rem;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid var(--color-border);
  @media (max-width: 768px) {
    padding: 1.8rem;
    height: 12rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
    height: 10rem;
  }
`

const Image = styled(Skeleton)`
  height: 100%;
  aspect-ratio: 1/1;
`

const Info = styled.div`
  flex: 1;
`

const Temp = styled(Skeleton)`
  width: fit-content;
  font-size: var(--font-size-subtext);
  border-radius: 3px;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`
const Name = styled(Skeleton)`
  width: fit-content;
`

const Cost = styled(Skeleton)`
  width: 10rem;
  text-align: right;
  @media (max-width: 768px) {
    width: 8rem;
  }
  @media (max-width: 480px) {
    width: 6rem;
  }
`

const SkeletonOrderListItem = () => {
  return (
    <Container>
      <Image />
      <Info>
        <Temp>ㅤㅤ</Temp>
        <Name>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</Name>
      </Info>
      <Skeleton>ㅤㅤ</Skeleton>
      <Cost>ㅤㅤㅤㅤ</Cost>
    </Container>
  )
}

export default SkeletonOrderListItem

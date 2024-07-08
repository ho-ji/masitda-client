import styled from 'styled-components'
import {skeletonStyle} from 'styles/variables'

const Container = styled.div`
  aspect-ratio: 1/1.75;
`

const Skeleton = styled.div`
  ${skeletonStyle}
`
const Ranking = styled(Skeleton)`
  width: fit-content;
  font-size: var(--font-size-emphasis);
`

const Image = styled(Skeleton)`
  width: 100%;
  aspect-ratio: 1/1;
  margin: 1rem 0;
  border-radius: 10px;
`

const Name = styled(Skeleton)`
  width: 100%;
  font-size: var(--font-size-primary);
`

const Description = styled(Skeleton)`
  font-size: var(--font-size-subtext);
`

const Cost = styled(Skeleton)`
  margin: 1rem 0;
  font-size: var(--font-size-emphasis);
`
const Temp = styled(Skeleton)``

const SkeletonProductCard = ({ranking}) => {
  return (
    <>
      <Container>
        {ranking && <Ranking>ㅤㅤ</Ranking>}
        <Image />
        <Name>ㅤ</Name>
        <Description>ㅤ</Description>
        <Cost>ㅤ</Cost>
        <Temp>ㅤ</Temp>
      </Container>
    </>
  )
}

export default SkeletonProductCard

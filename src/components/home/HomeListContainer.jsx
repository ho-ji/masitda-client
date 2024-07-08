import styled from 'styled-components'
import {useRef, useState} from 'react'
import {Link} from 'react-router-dom'

import {h2Style, mainContainerStyle} from 'styles/variables'

const Container = styled.section`
  ${mainContainerStyle}
`
const Title = styled.h2`
  ${h2Style}
  display: inline-block;
`

const More = styled(Link)`
  border-radius: 2rem;
  float: right;
  padding: 0.5rem 2rem;
  line-height: 2rem;
  border: 1px solid var(--color-gray);
  color: var(--color-text-main);
  @media (max-width: 768px) {
    padding: 0.5rem 1.8rem;
    line-height: 1.8rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem 1.5rem;
    line-height: 1.5rem;
  }
`

const ListContainer = styled.div`
  position: relative;
`

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  top: 45%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  z-index: 2;
  background-color: white;
  &:hover {
    background-color: var(--color-main);
    > svg {
      fill: white;
    }
  }
  @media (max-width: 768px) {
    width: 3.8rem;
    height: 3.8rem;
  }
  @media (max-width: 480px) {
    display: none;
  }
`

const PrevButton = styled(PageButton)`
  left: 0;
  transform: translateX(-50%);
`

const NextButton = styled(PageButton)`
  right: 0;
  transform: translateX(50%);
`

const List = styled.ol`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  @media (max-width: 768px) {
    gap: 1.8rem;
  }
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`

const HomeListContainer = ({title, link, children}) => {
  const [isDrag, setIsDrag] = useState(false)
  const [startX, setStartX] = useState()
  const [showPrevButton, setShowPrevButton] = useState(false)
  const [showNextButton, setShowNextButton] = useState(true)
  const listRef = useRef()

  const handleDragStart = (e) => {
    e.preventDefault()
    setIsDrag(true)
    setStartX(e.pageX + listRef.current.scrollLeft)
  }

  const handleDragEnd = (e) => {
    setIsDrag(false)
  }

  const handleDragMove = (e) => {
    if (isDrag) {
      listRef.current.scrollLeft = startX - e.pageX

      if (listRef.current.scrollLeft > 10) setShowPrevButton(true)
      else if (listRef.current.scrollLeft < 10) setShowPrevButton(false)

      if (listRef.current.scrollLeft < listRef.current.scrollWidth - listRef.current.clientWidth - 10) setShowNextButton(true)
      else setShowNextButton(false)
    }
  }

  const handlePrevButtonClick = () => {
    listRef.current.scrollTo({
      behavior: 'smooth',
      left: 0,
    })
    setShowNextButton(true)
    setShowPrevButton(false)
  }

  const handleNextButtonClick = () => {
    listRef.current.scrollTo({
      behavior: 'smooth',
      left: listRef.current.scrollWidth,
    })
    setShowPrevButton(true)
    setShowNextButton(false)
  }

  return (
    <Container>
      <Title>{title}</Title>
      <More to={link}>더보기</More>
      <ListContainer>
        {showNextButton && (
          <NextButton
            type="button"
            onClick={handleNextButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#666666">
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </NextButton>
        )}
        <List
          ref={listRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}>
          {children}
        </List>
        {showPrevButton && (
          <PrevButton
            type="button"
            onClick={handlePrevButtonClick}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="#666666"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0196 2.03233L17.791 3.81093L9.54932 12.0192L17.7576 20.2609L15.979 22.0323L5.99932 12.012L16.0196 2.03233Z" />
            </svg>
          </PrevButton>
        )}
      </ListContainer>
    </Container>
  )
}

export default HomeListContainer

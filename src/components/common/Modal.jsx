import {useEffect} from 'react'
import styled from 'styled-components'

import closeImage from 'assets/images/close.svg'
import useModal from 'hooks/useModal'
import {mainButtonStyle, subButtonStyle} from 'styles/variables'

const Dialog = styled.dialog`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  border: none;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

const Container = styled.div`
  background-color: white;
  padding: 3rem;
  width: 50rem;
  border-radius: 10px;
  position: relative;
  @media (max-width: 768px) {
    width: 45rem;
  }
  @media (max-width: 480px) {
    width: 90%;
    padding: 2rem;
  }
`
const Title = styled.h3`
  font-weight: bold;
  font-size: var(--font-size-primary);
`

const Text = styled.p`
  margin-top: 3rem;
  text-align: center;
`
const SubText = styled.p`
  margin-bottom: 4rem;
  text-align: center;
  color: var(--color-text-sub);
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const CancelButton = styled.button`
  ${subButtonStyle}
`
const OkButton = styled.button`
  ${mainButtonStyle}
`
const CloseButton = styled.button`
  width: 4rem;
  height: 4rem;
  background: url(${closeImage}) no-repeat center/3rem;
  position: absolute;
  top: 2rem;
  right: 3rem;
  @media (max-width: 768px) {
    right: 2rem;
  }
  @media (max-width: 480px) {
    top: 1.5rem;
    right: 1rem;
  }
`

const preventScroll = () => {
  const currentScrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${currentScrollY}px`
  document.body.style.overflowY = 'scroll'
  return currentScrollY
}

const allowScroll = (prevScroll) => {
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflowY = ''
  window.scrollTo(0, prevScroll)
}

const Modal = () => {
  const {modal, closeModal} = useModal()
  const handleOutsideClick = (e) => {
    if (e.target.nodeName === 'DIALOG') closeModal()
  }

  const handleEscapeKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal()
      e.target.blur()
    }
  }

  useEffect(() => {
    if (modal.isOpen) {
      const prevScroll = preventScroll()
      document.addEventListener('keydown', handleEscapeKeyDown)
      return () => {
        document.removeEventListener('keydown', handleEscapeKeyDown)
        allowScroll(prevScroll)
        closeModal()
      }
    }
  })

  return (
    <>
      {modal.isOpen && (
        <>
          <Dialog onClick={handleOutsideClick}>
            <Container>
              <Title>{modal.title}</Title>
              <Text>{modal.text}</Text>
              <SubText>{modal.subText}</SubText>
              <ButtonContainer>
                <CancelButton
                  type="button"
                  onClick={modal.handleCancelClick}>
                  {modal.cancelButtonText}
                </CancelButton>
                <OkButton
                  type="button"
                  onClick={modal.handleOkClick}>
                  {modal.okButtonText}
                </OkButton>
              </ButtonContainer>
              <CloseButton onClick={closeModal}>
                <span className="a11y-hidden">팝업창닫기</span>
              </CloseButton>
            </Container>
          </Dialog>
        </>
      )}
    </>
  )
}

export default Modal

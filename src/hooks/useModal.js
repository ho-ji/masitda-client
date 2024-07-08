import {useRecoilState} from 'recoil'
import {modalState} from 'recoil/modal/atom'

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState)

  const closeModal = () => {
    setModal((prev) => {
      return {...prev, isOpen: false}
    })
  }

  const openModal = () => {
    setModal((prev) => {
      return {...prev, isOpen: true}
    })
  }

  const updateModal = (type, okFunc) => {
    switch (type) {
      case 'cart': {
        const cartModal = {
          ...modal,
          title: '장바구니',
          text: '선택한 상품이 장바구니에 담겼습니다.',
          subText: '장바구니로 이동하겠습니까?',
          cancelButtonText: '계속 쇼핑하기',
          okButtonText: '장바구니 확인하기',
          handleCancelClick: () => {
            closeModal()
          },
          handleOkClick: () => {
            okFunc('/cart')
            closeModal()
          },
        }
        setModal(cartModal)
        break
      }
      case 'delete': {
        const deleteModal = {
          ...modal,
          title: '장바구니 상품 삭제',
          text: '삭제 시 복원되지 않습니다.',
          subText: '선택된 상품을 삭제하시겠습니까?',
          cancelButtonText: '취소',
          okButtonText: '확인',
          handleCancelClick: () => {
            closeModal()
          },
          handleOkClick: () => {
            okFunc()
            closeModal()
          },
        }
        setModal(deleteModal)
        break
      }
      default: {
      }
    }
  }
  return {
    modal,
    closeModal,
    openModal,
    updateModal,
  }
}

export default useModal

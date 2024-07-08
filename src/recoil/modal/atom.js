import {atom} from 'recoil'

export const modalState = atom({
  key: 'modal',
  default: {
    isOpen: false,
    title: '',
    text: '',
    subText: '',
    cancelButtonText: '',
    okButtonText: '',
    handleCancelButton: () => {},
    handleOkButton: () => {},
  },
})

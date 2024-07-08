import {v4 as uuidv4} from 'uuid'

export const checkUID = () => {
  if (!localStorage.getItem('uid')) {
    localStorage.setItem('uid', 'guest-' + uuidv4())
  }
}

export const updateUID = () => {
  localStorage.setItem('uid', 'guest-' + uuidv4())
}

export const isGuestUID = () => {
  return localStorage.getItem('uid').startsWith('guest-')
}

export const getUID = () => {
  const uid = localStorage.getItem('uid')
  if (!uid) {
    const newUid = 'guest-' + uuidv4()
    localStorage.setItem('uid', newUid)
    return newUid
  }
  return uid
}

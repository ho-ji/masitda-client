import {instance, setAuthToken} from 'api'
import {getUID} from 'utils/uid'

export const postOrderAPI = async ({accessToken, orderId, name, contactNumber, address}) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.post(`/order/${uid}`, {
      orderId,
      name,
      contactNumber,
      address,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getOrderAPI = async (accessToken, page) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/order/${uid}?page=${page}`)
    return result
  } catch (error) {
    throw error
  }
}

export const getGuestOrderAPI = async (orderNumber, contactNumber) => {
  try {
    const result = await instance.get(`/order/guestOrder/?orderNumber=${orderNumber}&contactNumber=${contactNumber}`)
    return result
  } catch (error) {
    throw error
  }
}

export const getRecentOrderAPI = async (accessToken) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/order/recent/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

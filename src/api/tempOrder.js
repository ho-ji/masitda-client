import {instance, setAuthToken} from 'api'
import {getUID} from 'utils/uid'

export const postTempOrderAPI = async ({accessToken, order}) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.post(`/temporder/${uid}`, {
      order,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getTempOrderAPI = async (accessToken, orderId) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/temporder/${uid}?orderId=${orderId}`)
    return result
  } catch (error) {
    throw error
  }
}

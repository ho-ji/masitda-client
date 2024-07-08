import {instance, setAuthToken} from 'api'
import {getUID} from 'utils/uid'

export const postCartProductAPI = async ({productId, count, accessToken}) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.post(`/cart/${uid}`, {
      productId,
      count,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getCartListAPI = async (accessToken) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/cart/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

export const deleleCartProductAPI = async (idList, accessToken) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.delete(`/cart/${uid}`, {
      data: {
        productId: idList,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

import {instance} from 'api'

export const getBestListAPI = async (limit = '') => {
  try {
    const result = await instance.get(`/product/ranking${limit ? `?limit=${limit}` : ''}`)
    return result
  } catch (error) {
    throw error
  }
}

export const getMDPickListAPI = async (limit) => {
  try {
    const result = await instance.get(`/mdpick${limit ? `?limit=${limit}` : ''}`)
    return result
  } catch (error) {
    throw error
  }
}

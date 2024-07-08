import {instance} from 'api'

export const getVerifyResetTokenAPI = async (passwordResetToken) => {
  try {
    const result = await instance.get(`/passwordReset/${passwordResetToken}`)
    return result
  } catch (error) {
    throw error
  }
}

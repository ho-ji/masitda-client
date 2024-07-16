import {instance, setAuthToken} from 'api'
import {getUID} from 'utils/uid'

export const postLogInAPI = async (account, password) => {
  const uid = getUID()
  try {
    const result = await instance.post(`/user/login/${uid}`, {
      account,
      password,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getCheckAccountAPI = async (account) => {
  try {
    const result = await instance.get(`/user/check/${account}
    `)
    return result
  } catch (error) {
    throw error
  }
}

export const postSignUpAPI = async (info) => {
  try {
    const result = await instance.post('/user/signup', {
      info,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getUserInformationAPI = async (accessToken) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/user/information/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteLogOutAPI = async () => {
  const uid = getUID()
  try {
    const result = await instance.delete(`/user/logout/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

export const postVerifyPasswordAPI = async (accessToken, password) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.post(`/user/password/${uid}`, {password})
    return result
  } catch (error) {
    throw error
  }
}

export const getModifyUserAPI = async (accessToken) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/user/modify/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

export const postModifyUserAPI = async (accessToken, info) => {
  const uid = getUID()
  setAuthToken(accessToken)
  try {
    const result = await instance.post(`/user/modify/${uid}`, {
      info,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getFindAccountAPI = async ({name, email}) => {
  try {
    const result = await instance.get(`/user/findAccount/?name=${name}&email=${email}`)
    return result
  } catch (error) {
    throw error
  }
}

export const getFindPasswordAPI = async ({email, account}) => {
  try {
    const result = await instance.get(`/user/findPassword/?email=${email}&account=${account}`)
    return result
  } catch (error) {
    throw error
  }
}

export const postPaswordChangeAPI = async ({uid, password}) => {
  try {
    const result = await instance.post('/user/passwordChange', {
      uid,
      password,
    })
    return result
  } catch (error) {
    throw error
  }
}

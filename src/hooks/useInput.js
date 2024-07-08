import {useState} from 'react'

const useInput = () => {
  const [value, setValue] = useState('')

  const handler = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  const clear = () => setValue('')

  return {value, handler, clear}
}

export default useInput

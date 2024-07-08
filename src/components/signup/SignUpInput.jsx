import styled from 'styled-components'
import {useState} from 'react'

import useInput from 'hooks/useInput'
import {signUpText} from 'constants/authText'
import {getCheckAccountAPI} from 'api/user'
import {inputStyle} from 'styles/variables'

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-primary);
  color: ${(props) => props.$error === true && 'var(--color-red)'};
  > input {
    ${inputStyle}
    margin-top: 1rem;
    border-color: ${(props) => props.$error === true && 'var(--color-red)'};
    &:focus {
      z-index: 2;
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.3);
    }
  }
`
const ErrorText = styled.p`
  color: var(--color-red);
  font-size: var(--font-size-subtext);
`
const AvailableText = styled.p`
  color: var(--color-main);
  font-size: var(--font-size-subtext);
`

const SignUpInput = ({type, validator, setValidError}) => {
  const {value: inputValue, handler: handleChange} = useInput()
  const [error, setError] = useState(false)
  const [isDuplicateAccount, setIsDuplicateAccount] = useState(null)

  const checkAccount = async () => {
    try {
      const result = await getCheckAccountAPI(inputValue)
      if (result.data.success) setIsDuplicateAccount(false)
      else {
        setIsDuplicateAccount(true)
        setError(true)
        setValidError(true)
      }
    } catch (error) {
      alert('잠시 후 다시 시도해주세요')
      setError(true)
      setValidError(true)
    }
  }

  const handleFocus = () => {
    setError(false)
    setValidError(true)
    setIsDuplicateAccount(null)
  }
  const handleBlur = () => {
    if (!validator(inputValue)) {
      setError(true)
      setValidError(true)
    } else {
      if (type === 'account') {
        checkAccount()
      }
      setValidError(false)
    }
  }

  return (
    <div>
      <Label $error={error}>
        {signUpText[type].label}
        <input
          placeholder={signUpText[type].placeholder}
          value={inputValue}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          name={type}
          type={type.includes('password') ? 'password' : 'text'}
        />
      </Label>
      {error && <ErrorText>{isDuplicateAccount ? signUpText[type].duplicateError : signUpText[type].validationError}</ErrorText>}
      {isDuplicateAccount === false && <AvailableText>{signUpText[type].available}</AvailableText>}
    </div>
  )
}

export default SignUpInput

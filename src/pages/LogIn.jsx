import LogInForm from 'components/login/LogInForm'
import LogInNav from 'components/login/LogInNav'
import AuthLayout from 'components/common/AuthLayout'

const LogIn = () => {
  return (
    <>
      <AuthLayout>
        <LogInForm />
        <LogInNav />
      </AuthLayout>
    </>
  )
}

export default LogIn

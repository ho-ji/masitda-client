import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import {useEffect} from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import GlobalStyle from 'styles/GlobalStyle'
import Home from 'pages/Home'
import 'styles/globalFont.css'
import Cart from 'pages/Cart'
import User from 'pages/User'
import NotFound from 'pages/NotFound'
import Best from 'pages/Best'
import MDPick from 'pages/MDPick'
import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Order from 'pages/Order'
import {checkUID, isGuestUID} from 'utils/uid'
import CompleteSplash from 'pages/CompleteSplash'
import UserModify from 'pages/UserModify'
import FindIdPw from 'pages/FindIdPw'
import PasswordReset from 'pages/PasswordReset'
import GuestOrder from 'pages/GuestOrder'
import MyOrder from 'pages/MyOrder'
import ErrorFallback from 'components/common/ErrorFallback'

const App = () => {
  const PublicRoute = ({element}) => {
    return isGuestUID() ? (
      element
    ) : (
      <Navigate
        to="/"
        replace
      />
    )
  }
  const PrivateRoute = ({element}) => {
    return isGuestUID() ? (
      <Navigate
        to="/login"
        replace
      />
    ) : (
      element
    )
  }

  useEffect(() => {
    checkUID()
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RecoilRoot>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/best"
              element={<Best />}
            />
            <Route
              path="/mdpick"
              element={<MDPick />}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/user"
              element={<PrivateRoute element={<User />} />}
            />
            <Route
              path="/userModify"
              element={<PrivateRoute element={<UserModify />} />}
            />
            <Route
              path="/myOrder"
              element={<PrivateRoute element={<MyOrder />} />}
            />
            <Route
              path="/login"
              element={<PublicRoute element={<LogIn />} />}
            />
            <Route
              path="/findIdPw"
              element={<PublicRoute element={<FindIdPw />} />}
            />
            <Route
              path="/signup"
              element={<PublicRoute element={<SignUp />} />}
            />
            <Route
              path="/passwordReset/:token"
              element={<PublicRoute element={<PasswordReset />} />}
            />
            <Route
              path="/guestOrder"
              element={<PublicRoute element={<GuestOrder />} />}
            />
            <Route
              path="/order/:orderId"
              element={<Order />}
            />
            <Route
              path="/order/:orderId/complete-splash"
              element={<CompleteSplash />}
            />
            <Route
              path="/*"
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ErrorBoundary>
  )
}
export default App

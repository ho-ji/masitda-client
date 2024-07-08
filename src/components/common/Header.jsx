import styled from 'styled-components'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {useEffect, useState} from 'react'
import {useErrorBoundary} from 'react-error-boundary'

import logoImage from 'assets/images/logo.png'
import cartImage from 'assets/images/cart.svg'
import userImage from 'assets/images/user.svg'
import {cartListState} from 'recoil/cart/atom'
import {getCartListAPI} from 'api/cart'
import {tokenState} from 'recoil/token/atom'
import {updateUID} from 'utils/uid'
import {deleteLogOutAPI} from 'api/user'

const Container = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: -3rem;
  z-index: 100;
`
const TopBar = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: var(--color-light-gray);
  padding: 0 1rem;
  font-size: var(--font-size-subtext);
  height: 3rem;
  color: var(--color-text-sub);
  a,
  button {
    margin: 0 1rem;
  }
`
const Menu = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 7rem;
`

const Logo = styled(Link)`
  display: block;
  width: 10rem;
  aspect-ratio: 2/1;
  background: url(${logoImage}) no-repeat center/contain;
`

const MenuLink = styled(Link)`
  padding: 1rem;
  border-radius: 50%;
  margin: 0 0.5rem;
  position: relative;
`

const MenuImage = styled.img`
  height: 2.5rem;
`

const CartCount = styled.strong`
  width: 1.6rem;
  height: 1.6rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  border-radius: 50%;
  font-size: 1rem;
  color: white;
  line-height: 1.6rem;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  background-color: var(--color-main);
`

const Header = () => {
  const [cartList, setCartList] = useRecoilState(cartListState)
  const [isLogIn, setIsLogIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useRecoilState(tokenState)
  const location = useLocation()
  const navigate = useNavigate()
  const {showBoundary} = useErrorBoundary()

  const handleLogoClick = () => {
    if (location.pathname === '/') window.location.reload()
    window.scrollTo(0, 0)
  }

  const handleCartClick = () => {
    if (location.pathname === '/cart') window.location.reload()
  }
  const handleUserClick = () => {
    if (location.pathname === '/user') window.location.reload()
  }

  const handleLogOutClick = async () => {
    try {
      setToken('')
      await deleteLogOutAPI()
      setIsLogIn(false)
      updateUID()
      navigate('/')
    } catch {
      alert('잠시 후 다시 시도해주세요')
    }
  }

  useEffect(() => {
    const getCartCount = async () => {
      try {
        setLoading(true)
        const result = await getCartListAPI(token)
        if (result.data.success) {
          if (result.data.accessToken) {
            setIsLogIn(true)
            setToken(result.data.accessToken)
          }
          setCartList(result.data.products)
        } else {
          setToken('')
          setCartList([])
          updateUID()
        }
      } catch (error) {
        showBoundary(error)
      } finally {
        setLoading(false)
      }
    }
    getCartCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <TopBar>
        {!loading &&
          (isLogIn ? (
            <button
              type="button"
              onClick={handleLogOutClick}>
              로그아웃
            </button>
          ) : (
            <nav>
              <Link to="/signup">회원가입</Link>
              <Link to="/login">로그인</Link>
            </nav>
          ))}
      </TopBar>
      <Menu>
        <h1>
          <span className="a11y-hidden">마싯다 로고</span>
          <Logo
            to="/"
            onClick={handleLogoClick}></Logo>
        </h1>
        <nav>
          <MenuLink
            to="/cart"
            onClick={handleCartClick}>
            <MenuImage
              src={cartImage}
              alt="장바구니"
            />
            <CartCount>
              {cartList.length >= 100 ? '99+' : cartList.length}
              <span className="a11y-hidden">개</span>
            </CartCount>
          </MenuLink>
          <MenuLink
            to={isLogIn ? '/user' : 'login'}
            onClick={handleUserClick}>
            <MenuImage
              src={userImage}
              alt="마이페이지"
            />
          </MenuLink>
        </nav>
      </Menu>
    </Container>
  )
}

export default Header

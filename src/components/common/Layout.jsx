import Footer from './Footer'
import Header from './Header'
import Loading from './Loading'
import Modal from './Modal'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Loading />
      <Modal />
    </>
  )
}

export default Layout

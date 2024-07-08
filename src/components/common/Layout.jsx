import Footer from './Footer'
import Header from './Header'
import Modal from './Modal'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Modal />
    </>
  )
}

export default Layout

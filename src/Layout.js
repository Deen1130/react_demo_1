import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom' // Outlet 插座，意思是在於頁首與頁尾之間的內容區塊

const Layout = () => {
  return (
    <div className="App">
      <Header title="阿貓部落格" />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout

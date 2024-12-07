import { Outlet } from "react-router-dom"
import { Footer, NavBar } from "./components/index.js"

const Layout = () => {
  return (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout
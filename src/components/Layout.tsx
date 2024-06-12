import "../global.css"

import React from "react"
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

const Layout = (props: { children: any }) => (
  <>
    <Navbar />
    { props.children }
    <Footer />
  </>
)

export default Layout

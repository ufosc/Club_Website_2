import "../global.css"

import React from "react"
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import TrackingPixel from './TrackingPixel'

const Layout = (props: { children: any }) => (
  <>
    <Navbar />
    { props.children }
    <Footer />
    <TrackingPixel />
  </>
)

export default Layout

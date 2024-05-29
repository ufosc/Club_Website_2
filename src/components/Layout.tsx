import "../global.css"
import React from "react"

import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

export default function (props: { children?: any }) {
  return (
    <>
      <Navbar />
      { props.children }
      <Footer />
    </>
  )
}

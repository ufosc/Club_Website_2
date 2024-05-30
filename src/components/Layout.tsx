import "../global.css"

import React from "react"
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

const DEFAULT_DESC = "Embrace the power of collaborative creation at the University of Florida's Open Source Club"

export default function Layout
(props: { children?: any, title?: string, desc?: string }) {
  const title = (typeof props.title === 'undefined') ? 'UF Open Source Club' :
    `${props.title} | UF Open Source Club`

  const desc = props.desc || DEFAULT_DESC
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <Navbar />
      { props.children }
      <Footer />
    </>
  )
}

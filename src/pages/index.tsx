import * as React from "react"
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import type { HeadFC, PageProps } from "gatsby"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  )
}

export default IndexPage
export const Head: HeadFC = () => <title>UF Open Source Club</title>

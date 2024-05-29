import * as React from "react"
import Layout from '../components/Layout'
import type { HeadFC, PageProps } from "gatsby"

const AboutPage: ReactFC<PageProps> = () => {
  return (
    <Layout>
      Currently viewing the about page
    </Layout>
  )
}

export default AboutPage
export const Head: HeadFC = () => <title>About | UF Open Source Club</title>

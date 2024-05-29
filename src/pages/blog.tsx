import * as React from "react"
import Layout from '../components/Layout'
import type { HeadFC, PageProps } from "gatsby"

const BlogPage: ReactFC<PageProps> = () => {
  return (
    <Layout>
      Currently viewing the blog page
    </Layout>
  )
}

export default BlogPage
export const Head: HeadFC = () => <title>Blog | UF Open Source Club</title>

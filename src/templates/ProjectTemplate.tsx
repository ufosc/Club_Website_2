import '../global.css'
import './BlogPostTemplate.css'

import * as React from "react"
import { graphql } from "gatsby"
import Layout from '../components/Layout'
import { MDXProvider } from "@mdx-js/react"
import type { HeadFC, PageProps } from "gatsby"

export default function ProjectTemplate(props: { data: any, children: any }) {
  return (
    <Layout
      title={props.data.mdx.frontmatter.title}
      desc={props.data.mdx.frontmatter.description}
    >
      <MDXProvider>
        { props.children }
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ProjectBySlug(
    $id: String!
    $previousProjectId: String
    $nextProjectId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        repo
        description
        maintainers
        tags
      }
    }
    previous: mdx(id: { eq: $previousProjectId }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        repo
        description
        maintainers
        tags
      }
    }
    next: mdx(id: { eq: $nextProjectId }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        repo
        description
        maintainers
        tags
      }
    }
  }
`

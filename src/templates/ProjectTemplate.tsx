import '../global.css'
import './BlogPostTemplate.css'

import * as React from "react"
import { graphql } from "gatsby"
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import { MDXProvider } from "@mdx-js/react"

interface ProjectTemplateProps {
  data: any;
  children: any;
}

const ProjectTemplate : React.FC<ProjectTemplateProps> = ({ data, children }) => (
  <Layout>
    <MDXProvider>
      { children }
    </MDXProvider>
  </Layout>
)

export default ProjectTemplate
export const Head = (props: { data: any }) => (
  <SEO
    title={props.data.mdx.frontmatter.title}
    desc={props.data.mdx.frontmatter.description}
  />
)


export const pageQuery = graphql`
  query ProjectBySlug(
    $id: String!
    $previousProjectId: String
    $nextProjectId: String
  ) {
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

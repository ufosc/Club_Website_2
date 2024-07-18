import '../global.css'
import "./ProjectTemplate.css"

import * as React from "react"
import { graphql } from "gatsby"
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import { MDXProvider } from "@mdx-js/react"
import Badge from '../components/Badge'

interface ProjectTemplateProps {
  data: any;
  children: any;
}

const ProjectTemplate :
React.FC<ProjectTemplateProps> = ({ data, children }) => (
  <Layout>
    <div className="project">
      <h1>{data.mdx.frontmatter.title}</h1>
      <div className="project__badges">
        {
          data.mdx.frontmatter.tags.map((tag: string) => {
            return <Badge>{tag}</Badge>
          })
        }
      </div>
      <h2 id="project__desc">{data.mdx.frontmatter.description}</h2>
      <div className="project__content">
        <MDXProvider>
          { children }
        </MDXProvider>
      </div>
    </div>
  </Layout>
)

export default ProjectTemplate
export const Head = (props: { data: any }) => (
  <SEO
    title={props.data.mdx.frontmatter.title + " | UF Open Source Club" }
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

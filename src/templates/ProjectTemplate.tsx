import '../global.css'
import './BlogPostTemplate.css'

import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ArticleCard from '../components/ArticleCard/ArticleCard'
import { MDXProvider } from '@mdx-js/react'

interface ProjectBodyPrompts {
  data: any;
  children?: any;
}

const ProjectBody: React.FC<ProjectBodyPrompts> = ({ data, children }) => {
  const { frontmatter } = data.mdx
  return (
    <div className="article-layout">
      <div className="article-layout__matter">
        <div className="article-layout__matter__meta">
          <h2 className="date">{frontmatter.date}</h2>
          <h1>{frontmatter.title}</h1>
          <h2 className="subtitle">{frontmatter.description}</h2>
          <h2 className="author">
            {
              frontmatter.maintainers.map((author: string, i: number) => {
                if (i === frontmatter.maintainers.length - 1) {
                  return author
                }
                return author + ", "
              })
            }
          </h2>
        </div>
        <MDXProvider>
          <div id="inner-html">
            { children }
          </div>
        </MDXProvider>
      </div>
    </div>
  )
}

const ProjectTemplate : React.FC<ProjectBodyPrompts> = ({ data, children }) => (
  <Layout>
    <ProjectBody data={data} children={children} />
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
  query ProjectBySlug($id: String!) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        repo
        description
        maintainers
        tags
      }
    }
  }
`

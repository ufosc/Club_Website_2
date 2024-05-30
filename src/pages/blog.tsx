import '../global.css'
import './blog.css'

import * as React from "react"
import Layout from '../components/Layout'
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import ArticleCard from '../components/ArticleCard/ArticleCard'

const Articles = (props: { nodes: any }) => {
  if (props.nodes.length === 0) {
    return (
      <h3 id='no-posts-yet'>No posts yet! Please check back later.</h3>
    )
  }

  return (
    <div id='blog-posts'>
      {
        props.nodes.map((node: any) => {
          return (<ArticleCard data={node.frontmatter} />)
        })
      }
    </div>
  )
}

const BlogPage: ReactFC<PageProps> = (props: { data: any }) => {
  return (
    <Layout desc={"Recent UF Open Source Club News"}>
      <div id='blog-layout'>
        <div id='blog-content'>
          <h2 className='section-heading'>News</h2>
          <Articles nodes={props.data.allMarkdownRemark.nodes} />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage
export const Head: HeadFC = () => <title>Blog | UF Open Source Club</title>
export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          subtitle
          author
          slug
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 500)
            }
          }
        }
      }
    }
  }
`

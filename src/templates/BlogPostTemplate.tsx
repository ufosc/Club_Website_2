import '../global.css'
import './BlogPostTemplate.css'

import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/Layout'
import type { HeadFC, PageProps } from "gatsby"
import ArticleCard from '../components/ArticleCard/ArticleCard'

const ArticleBody = (props: { data: any, children?: any }) => {
  const { frontmatter } = props.data.markdownRemark
  let img = getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData)
  return (
    <div id="article-layout">
      <div id="article-layout_matter">
        <h2 style={{ marginBottom: 20 }}>{frontmatter.title}</h2>
        <h3>{frontmatter.author} - {frontmatter.date}</h3>
        <h3 style={{ fontWeight: "bold", marginTop: 10, marginBottom: 20 }}>
          {frontmatter.subtitle}
        </h3>
        <GatsbyImage image={img} style={{ maxHeight: 500, marginTop: 10 }} />
        <div id="inner-html" dangerouslySetInnerHTML={{
          __html: props.data.markdownRemark.html
        }} />
      </div>
      { props.children }
    </div>
  )
}

export default function BlogPostTemplate(props: { data: any }) {
  return (
    <Layout
      title={props.data.markdownRemark.frontmatter.title}
      desc={props.data.markdownRemark.frontmatter.subtitle}
    >
      <ArticleBody data={props.data}>
        <div className='read-more--container'>
          {
            (props.data.previous !== null || props.data.next !== null) ?
              (<h3 className='read-more--header'>Featured Articles</h3>) : null
          }
          <div className='read-more'>
            {
              (props.data.previous === null) ? null : (
                <ArticleCard data={props.data.previous?.frontmatter} />
              )
            }
            {
              (props.data.next === null) ? null : (
                <ArticleCard data={props.data.next?.frontmatter} />
              )
            }
          </div>
        </div>
      </ArticleBody>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        author
        subtitle
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      id
      html
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        slug
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 300)
          }
        }
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      id
      html
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        slug
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 300)
          }
        }
      }
    }
  }
`

import '../global.css'
import './BlogPostTemplate.css'

import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ArticleCard from '../components/ArticleCard/ArticleCard'

interface ArticleBodyPrompts {
  data: any;
  children?: any;
}

const ArticleBody: React.FC<ArticleBodyPrompts> = ({ data, children }) => {
  const { frontmatter } = data.markdownRemark
  const img = getImage(
    frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
  )
  return (
    <div className="article-layout">
      <div className="article-layout__matter">
        <div className="article-layout__matter__meta">
          <h2 className="date">{frontmatter.date}</h2>
          <h1>{frontmatter.title}</h1>
          <h2 className="subtitle">{frontmatter.subtitle}</h2>
          <h2 className="author">
            {
              frontmatter.author.map((author: string, i: number) => {
                if (i === frontmatter.author.length - 1) {
                  return author
                }
                return author + ", "
              })
            }
          </h2>
        </div>
        <GatsbyImage image={img!} alt={ frontmatter.subtitle } />
        <div id="inner-html" dangerouslySetInnerHTML={{
          __html: data.markdownRemark.html
        }} />
      </div>
      { children }
      <div className="article-layout__recc">
        {
          (data.previous !== null || data.next !== null) ?
            (<h2> Read More </h2>) : null
        }
        <div className="article-layout__recc__articles">
          {
            (data.previous !== null) ? (
              <ArticleCard data={data.previous.frontmatter} />
            ) : null
          }
          {
            (data.next !== null) ? (
              <ArticleCard data={data.next.frontmatter} />
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

const BlogPostTemplate : React.FC<{ data: any}> = ({ data }) => (
  <Layout><ArticleBody data={data} /></Layout>
)

export default BlogPostTemplate
export const Head = (props: { data: any }) => (
  <SEO
    title={props.data.markdownRemark.frontmatter.title + " | UF Open Source Club" }
    desc={props.data.markdownRemark.frontmatter.subtitle}
  />
)

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
            gatsbyImageData(width: 1200)
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
        author
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
        author
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

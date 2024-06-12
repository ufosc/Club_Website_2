import '../global.css'
import './index.css'

import React from "react"
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import type { HeadFC, PageProps } from "gatsby"
import { graphql, Link, navigate } from "gatsby"

// The Index page is significantly larger than other pages.
// Sections are concentrated into ~../components/Index~.
import AnimationSection from '../components/Index/AnimationSection'
import NewsSection from '../components/Index/NewsSection'
import AboutSection from '../components/Index/AboutSection'
import CommunitySection from '../components/Index/CommunitySection'
import ProjectSection from '../components/Index/ProjectSection'
import ContactSection from '../components/Index/ContactSection'
import FAQSection from '../components/Index/FAQSection'

const IndexPage: React.FC<PageProps> = (props: { data: any }) => {
  return (
    <Layout >
      <AnimationSection />
      <div id='section-root'>
        <NewsSection nodes={props.data.news.nodes} />
        <AboutSection />
        <CommunitySection />
        <ProjectSection nodes={props.data.projects.nodes} />
        <ContactSection />
        <FAQSection />
      </div>
    </Layout>
  )
}

export default IndexPage
export const Head: HeadFC = () => <SEO />
export const pageQuery = graphql`
  {
    news: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          subtitle
          slug
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 500)
            }
          }
        }
      }
    }
    projects: allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          slug
          description
          repo
          tags
        }
      }
    }
  }
`

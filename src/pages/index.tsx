import '../global.css'
import './index.css'

import * as React from "react"
import Layout from '../components/Layout'
import Animation from '../components/Animation/Animation'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import { Slideshow, Slide } from '../components/Slideshow/Slideshow'
import CursorText from '../components/CursorText'
import type { HeadFC, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

const NewsSection = (props: { nodes: any }) => {
  let nodes = props.nodes
  if (nodes.length === 0) {
    return null
  }

  // Truncate, we don't want to show too many posts..
  if (nodes.length > 5) {
    nodes = nodes.slice(0, 5)
  }

  return (
      <Slideshow>
        {
          nodes.map((node: any) => {
            const { frontmatter } = node
            const img = getImage(frontmatter.featuredImage)
            const onClick = () => {
              window.location.replace(`/blog${frontmatter.slug}`)
            }
            return (
              <Slide>
                <div className='slide-content'>
                  <GatsbyImage image={img} style={{ borderRadius: 30 }}/>
                  <div className='slide-meta'>
                    <a>ANNOUNCEMENT</a>
                    <h2>{frontmatter.title}</h2>
                    <h3>{frontmatter.subtitle}</h3>
                    <h3>{frontmatter.date}</h3>
                    <button className='secondary' onClick={onClick}>
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </Slide>
            )
          })
        }
      </Slideshow>
  )
}

const ProjectSection = (props: { nodes: any }) => {
  let nodes = props.nodes
  if (nodes.length === 0) {
    return null
  }

  // Truncate if too many.
  if (nodes.length > 6) {
    nodes = nodes.slice(0, 6)
  }

  let cards : Array<any> = []
  for (let i = 0; i < nodes.length; ++i) {
    cards.push((<ProjectCard index={i} data={nodes[i].frontmatter} />))
  }

  return (<div className='project-container'>{ cards }</div>)
}

const MSG_BATCH = [
  "open source", "class scheduler", "3D graphics library",
  "matrix accelerator", "nextjs website", "linux distro",
  "a visual novel", "microservices"
]

const IndexPage: React.FC<PageProps> = (props: { data: any }) => {
  return (
    <Layout>
      <Animation speed={0.001} scale={30}>
        <h2>let's build, <CursorText batch={MSG_BATCH} /></h2>
        <h3 style={{margin: "auto", marginTop: 50, maxWidth: "min(800px, 70%)"}}>
          Embrace the power of collaborative creation at the University of
          Florida's Open Source Club. Meet new friends, propose ideas, learn
          programming, and work on open source projects.
        </h3>
        <button style={{ marginTop: 50 }}>
          JOIN NOW
        </button>
        <button className="secondary">
          LEARN MORE
        </button>
      </Animation>
      <div id='section-root'>
        <section>
          <NewsSection nodes={props.data.news.nodes} />
        </section>
        <section>
          <h2 className="section-heading">Become a member</h2>
        </section>
        <section>
          <h2 className="section-heading">Join a thriving community</h2>
        </section>
        <section>
          <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}>
            <h2 className="section-heading" style={{ float: "left" }}>
              Latest projects
            </h2>
            <button
              className='tertiary'
              style={{ float: "right" }}
              onClick={() => { window.location.replace('/projects') }}>
              SEE MORE 🔗
            </button>
          </div>
          <ProjectSection nodes={props.data.projects.nodes} />
        </section>
        <section>
          <h2 className="section-heading">Get in touch</h2>
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
export const Head: HeadFC = () => <title>UF Open Source Club</title>
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

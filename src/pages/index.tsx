import '../global.css'
import './index.css'

import * as React from "react"
import Layout from '../components/Layout'
import Animation from '../components/Animation/Animation'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import { Slideshow, Slide } from '../components/Slideshow/Slideshow'
import CursorText from '../components/CursorText'
import { Accordion, AccordionItem } from '../components/Accordion/Accordion'

import type { HeadFC, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import GroupPhoto from '../images/group_photo.jpg'

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
  "open source", "a class scheduler", "a 3D graphics library",
  "a matrix accelerator", "a nextjs website", "a linux distro",
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
          <div className="section-root about-container">
            <div>
              <h3>
                Becoming a member of the Open Source Club is as simple
                as showing up. Everyone is invited to attend our
                twice-weekly "casual coding" meetings, where members meet
                to work on open source projects, do homework, or just hang
                out. You may also contribute remotely by joining us on Discord.
                <br /><br />
                If interested, join our Discord channel and keep an eye out for
                any upcoming meetings on our announcements page.
              </h3>
              <button onClick={ () =>
                window.location.replace("https://discord.gg/Gsxej6u") }>
                JOIN DISCORD
              </button>
              <button className='secondary'
                onClick={ () => window.location.replace("/about") }>
                LEARN MORE
              </button>
            </div>
            <img id="club-group-photo" src={GroupPhoto} alt="Club Group Photo" />
          </div>
        </section>
        <section>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <Accordion>
            <AccordionItem prompt="Why should I join?">
              Joining the Open Source Club is a great way to gain experience
              for your CV and develop a strong project portfolio. Working on
              open source projects or leading a group as a tech-lead positively
              distinguishes you from other job applicants. We also host
              professional development meetings, resume reviews, and
              presentations from tech employers (IBM, Amazon, Microsoft, etc.).
              <br /><br />
              The club is also a fun way to meet up and network with people
              with common interests. We frequently host social events or
              hackathons for members to participate in.
            </AccordionItem>
            <AccordionItem prompt="Do I need to know programming?">
              No, but most projects require that you be willing to learn.
              All skill levels are welcome, our tech leads will often
              host workshops, share resources & advice, and provide all
              the help that you need to get started.
            </AccordionItem>
            <AccordionItem prompt="Do I need to be a UF student?">
              No, everyone is welcome to attend, irrespective of your degree
              or UF enrollment status.
            </AccordionItem>
            <AccordionItem prompt="How do I get a leadership position?">
              Leadership positions at the Open Source Club include tech
              leads and board members. The application process happens
              at the beginning of every Fall and Spring semester; it is
              announced via Discord.
            </AccordionItem>
          </Accordion>
        </section>
        <section>
          <h2 className="section-heading">Join a thriving community</h2>
        </section>
        <section>
          <div className="section-root">
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

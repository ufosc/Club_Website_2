import '../global.css'
import './index.css'

import * as React from "react"
import Layout from '../components/Layout'
import Animation from '../components/Animation/Animation'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import { Slideshow, Slide } from '../components/Slideshow/Slideshow'
import Image from '../components/Image/Image'
import CursorText from '../components/CursorText'
import Marquee from '../components/Marquee/Marquee'
import { Accordion, AccordionItem } from '../components/Accordion/Accordion'

import type { HeadFC, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, Link, navigate } from "gatsby"

import GroupPhoto from '../images/group_photo.jpg'
import SoccerImage from '../images/blog/2024-04-11-intramural-soccer.jpeg'
import CareerImage from '../images/blog/2024-04-11-navigating-career-fair.jpeg'
import GBMImage from '../images/GBM.jpeg'
import ReitzGameImage from '../images/reitz_game_day.jpeg'

// we have to pretend women come to OSC.
import RebeccaImage from '../images/rebecca_lol.jpeg'

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
            navigate(`/blog${frontmatter.slug}`)
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

const CommunitySection = () => (
  <Marquee>
    <div className="infinite-scroll">
      <Image src={CareerImage} alt="Navigating UF Career Fair"
        style={{ gridRowStart: 1, gridRowEnd: 3 }}>
        <div className="infinite-scroll__image__meta">
          <h2> Career Fair </h2>
          <h3> Fall 2023 - OSC at the O'Connell Center Career Fair. </h3>
        </div>
      </Image>
      <div className="card">
        <h2 style={{ color: "rgb(231 241 126)" }}>Est. 2016</h2>
        <h3>
          OSC was founded in the Spring semester of 2016 and joined the
          Mozilla Open Source Student Network shortly after.
        </h3>
      </div>
      <Image src={SoccerImage} alt="OSC Gainesville Intramural Soccer"
        style={{ gridRow: "1 / 3", gridColumn: "3 / 5" }}>
        <div className="infinite-scroll__image__meta">
          <h2> Intramural Soccer Team </h2>
          <h3>
            Fall 2023 - Post-game photo of the OSC Intramural soccer team.
          </h3>
        </div>
      </Image>
      <div className="card"
        style={{ gridRow: "2/3", gridColumn: "5" }}>
        <h2 style={{ color: "rgb(20 241 149)" }}>500+</h2>
        <h3>Active members</h3>
      </div>
      <Image src={GroupPhoto} alt="Winners of the OSC Gainesville Hackathon">
        <div className="infinite-scroll__image__meta"
          style={{ gridRow: "2/ 3", gridColumn: "2" }}>
          <h2> OSC Mini-Hackathon </h2>
          <h3> Spring 2024 - Winners of the first OSC Mini-Hackathon </h3>
        </div>
      </Image>
      <Image src={ReitzGameImage} alt="Reitz Game Day"
        style={{ gridRow: "1/3", gridColumn: "6/8" }}>
        <div className="infinite-scroll__image__meta">
          <h2> Game Day at the Reitz </h2>
          <h3> Spring 2024 - OSC meets at the Reitz Game Room </h3>
        </div>
      </Image>
      <div className="card">
        <h2 style={{ color: "rgb(20 241 149)" }}>250k+</h2>
        <h3>Lines of code contributed to Open Source Software</h3>
      </div>
      <Image src={RebeccaImage} alt="New OSC Board"
        style={{ gridRow: "2/3", gridColumn: "2"}}>
        <div className="infinite-scroll__image__meta">
          <h2> New OSC Board </h2>
          <h3> Spring 2024 - OSC presents the new executive board </h3>
        </div>
      </Image>
      <Image src={GBMImage} alt="Last CC of the spring semester">
        <div className="infinite-scroll__image__meta">
          <h2> Last Spring Meeting </h2>
          <h3> Spring 2024 - Members meet at Casual coding for the last day of the semester </h3>
        </div>
      </Image>
    </div>
  </Marquee>
)

const MSG_BATCH = [
  "open source", "a scheduler", "3D graphics", "an LLM",
  "a nextjs site", "a linux distro", "a visual novel",
  "microservices"
]

const IndexPage: React.FC<PageProps> = (props: { data: any }) => {
  return (
    <Layout >
      <Animation speed={0.001} scale={30}>
        <h2>let's build <CursorText batch={MSG_BATCH} /></h2>
        <h3 style={{margin: "auto", marginTop: 50, maxWidth: "min(800px, 70%)"}}>
          Embrace the power of collaborative creation at the University of
          Florida's Open Source Club. Meet new friends, propose ideas, learn
          programming, and work on open source projects.
        </h3>
        <button onClick={ () => navigate('/#become-a-member') }
          style={{ marginTop: 50 }}>
          JOIN NOW
        </button>
        <button onClick={ () => navigate('/about') }
          className="secondary">
          LEARN MORE
        </button>
      </Animation>
      <div id='section-root'>
        <section>
          <NewsSection nodes={props.data.news.nodes} />
        </section>
        <section>
          <h2 className="section-heading">UF Open Source Club</h2>
          <div className="section-root about-container">
            <div>
              <h3 style={{ fontWeight: 300 }}>
                The Open Source Club (OSC) at the University of Florida is a
                community of makers who want to solve problems and improve
                our world through open source projects. The club was founded
                in the Spring of 2016 as an official student organization at
                UF. In 2017, OSC were founding members of the Mozilla Open
                Source Student Network. Join us at casual codings, where
                we work on open source projects, do homework, or just hang
                out.
              </h3>
              <div style={{ marginTop: 20 }}>
                <button onClick={ () => navigate("https://discord.gg/Gsxej6u") }
                  style={{ marginLeft: 0 }}>
                  JOIN DISCORD
                </button>
                <button className='secondary' onClick={ () => navigate("/about") }>
                  LEARN MORE
                </button>
              </div>
            </div>
            <Image className="club-group-photo" src={GroupPhoto} alt="Club Group Photo" />
          </div>
        </section>
        <section style={{ maxWidth: "100vw", width: "100vw", overflow: "hidden" }}
          id='become-a-member'>
          <div id="infinite-scroll-heading">
            <h2 className="section-heading">Join a thriving community</h2>
          </div>
          <CommunitySection />
          <div id="become-a-member-card">
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
            <div style={{ marginTop: 20 }}>
              <button onClick={ () => navigate("https://discord.gg/Gsxej6u") }
                style={{ marginLeft: 0 }}>
                JOIN DISCORD
              </button>
              <button className='secondary' onClick={ () => navigate("/about") }>
                LEARN MORE
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="section-root">
            <h2 className="section-heading">
              Latest projects
            </h2>
            <button className='tertiary' onClick={() => { navigate('/projects') }}>
              SEE MORE 🔗
            </button>
          </div>
          <ProjectSection nodes={props.data.projects.nodes} />
        </section>
        <section id='faq-section'>
          <div className="section-root">
            <h2 className="section-heading">
              Frequently Asked Questions
            </h2>
            <button
              className='tertiary'
              onClick={() => { navigate('/about/#frequently-asked-questions') }}>
              SEE MORE 🔗
            </button>
          </div>
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
            <AccordionItem prompt="Where/when is casual coding?">
              Casual coding takes place over the Fall and Spring semesters.
              The location varies subject to room availability. Locations
              and meeting times are announced at the beginning of every
              semester. Check the <Link to="/blog">announcements</Link> page
              or the <Link to="https://discord.gg/Gsxej6u">discord</Link> for
              more details.
            </AccordionItem>
          </Accordion>
        </section>
        <section id='get-in-touch'>
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

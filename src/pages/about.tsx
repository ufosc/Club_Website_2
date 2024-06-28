import '../global.css'
import './about.css'

import * as React from "react"
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Accordion, AccordionItem } from '../components/Accordion/Accordion'
import type { HeadFC, PageProps } from "gatsby"
import { Slideshow, Slide } from '../components/Slideshow/Slideshow'
import { Link, navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Overlay from '../components/Overlay/Overlay'

const GameNightImage = '../images/game_night.png'
const CasualCodingImage = '../images/casual_coding2.jpeg'
const CasualCodingImage2 = '../images/casual_coding3.png'
const SoccerImage = '../images/blog/2024-04-11-intramural-soccer.jpeg'
const CareerImage = '../images/blog/2024-04-11-navigating-career-fair.jpeg'

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className='about'>
        <section id='slideshow'>
          <Slideshow>
            <Slide>
              <Overlay className="slide-img">
                <StaticImage src={GameNightImage} alt="OSC Game Night" width={1200} />
                <div className="slide-img__meta">
                  <h1> Game Night Social </h1>
                  <h2> Spring 2024 - Game Night Social at UF Little Hall. </h2>
                </div>
              </Overlay>
            </Slide>
            <Slide>
              <Overlay className="slide-img">
                <StaticImage src={SoccerImage} alt="OSC Intramural Soccer Team" width={1200} />
                <div className="slide-img__meta">
                  <h1> Intramural Soccer Team </h1>
                  <h2>
                    Fall 2023 - Post-game photo of the OSC Intramural soccer team.
                  </h2>
                </div>
              </Overlay>
            </Slide>
            <Slide>
              <Overlay className="slide-img">
                <StaticImage src={CareerImage} alt="OSC at the UF Career Fair" width={1200} />
                <div className="slide-img__meta">
                  <h1> Career Fair </h1>
                  <h2> Fall 2023 - OSC at the O'Connell Center Career Fair. </h2>
                </div>
              </Overlay>
            </Slide>
            <Slide>
              <Overlay className="slide-img">
                <StaticImage src={CasualCodingImage} alt="OSC at Casual Coding" width={1200} />
                <div className="slide-img__meta">
                  <h1> OSC Mini-Hackathon </h1>
                  <h2> Spring 2024 - Members participating in the first OSC Mini-Hackathon. </h2>
                </div>
              </Overlay>
            </Slide>
            <Slide>
              <Overlay className="slide-img">
                <StaticImage src={CasualCodingImage2} alt="OSC at Casual Coding" width={1200} />
                <div className="slide-img__meta">
                  <h1> Casual Coding </h1>
                  <h2>
                    Fall 2023 - A new member has their first ever pull request accepted by
                    an OSC maintainer.
                  </h2>
                </div>
              </Overlay>
            </Slide>
          </Slideshow>
        </section>
        <section>
          <h1>The Open Source Club</h1>
          <h2 style={{ marginTop: 20 }}>
            The Open Source Club (OSC) at the University of Florida is a
            community of makers who want to solve problems and improve
            our world through open source projects. The club was founded
            in the Spring of 2016 as an official student organization at
            UF. In 2017, OSC were founding members of the Mozilla Open
            Source Student Network. The purpose of the Open Source Club is
            to promote, support, and create open source software in
            Gainesville and beyond.
            <br/><br/>
            The club organizes casual coding, a twice-weekly meeting
            dedicated to working on open source code, planning or proposing
            projects, or just hanging out. Ocassionaly, it also hosts
            resume reviews, guest speakers from tech companies, and
            competitive hackathons.
          </h2>
        </section>
        <section>
          <h1>Why join OSC?</h1>
          <h2 style={{ marginTop: 20 }}>
            Joining the Open Source Club is a great way to gain experience
            for your CV and develop a strong project portfolio. Working on
            open source projects or leading a group as a tech-lead positively
            distinguishes you from other job applicants. We also host
            professional development meetings, resume reviews, and
            presentations from tech employers (IBM, Amazon, Microsoft, etc.).
            <br /><br />
            The club is also a fun way to meet up and network with people
            with common interests. We frequently host social events or
            hackathons in Gainesville for members to participate in.
          </h2>
        </section>
        <section>
          <h1>Casual Coding</h1>
          <div id='casual-coding'>
            <div>
              <h2>
                Casual coding is when the Open Source Club meets in person
                to work on open source code, plan or propose projects, or
                to just hang out. It takes place twice a week throughout the
                Fall and Spring semesters. The dates and locations vary each
                semester, they are announced at the beginning of every semester
                and are posted on Discord before each meeting. Keep an eye
                out on the Discord or news page for more details.
              </h2>
              <button
                style={{ marginTop: 40 }}
                onClick={ () => navigate("https://discord.gg/Gsxej6u") }>
                JOIN DISCORD
              </button>
              <button
                onClick={ () => navigate("/blog") }
                className="secondary">
                NEWS 🔗
              </button>
            </div>
            <StaticImage src={CasualCodingImage} alt="OSC Mini-Hackathon" width={600} />
          </div>
        </section>
        <section id='frequently-asked-questions'>
          <h1>Frequently Asked Questions</h1>
          <Accordion>
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
            <AccordionItem prompt="Am I required to attend every meeting?">
              No, you are not required to attend any meetings or casual coding
              sessions.
            </AccordionItem>
            <AccordionItem prompt="Can I still participate if I have a busy schedule?">
              Yes, you can participate as much or as little as you like, there
              are no strict participation requirements. We only ask that you
              communicate with your group members and tech leads so that they
              may adapt accordingly.
            </AccordionItem>
            <AccordionItem prompt="How much do I have to contribute?">
              As much or as little as you want. Contributions to a project are
              not a requirement.
            </AccordionItem>
            <AccordionItem prompt="What should I do if I require special accommodations?">
              We believe in making the club as accessible as possible. If you require
              special accomodations, please contact us via Discord, the
              site <Link to="/#get-in-touch">contact form</Link>, or via email at:
              osctechlead(at)gmail.com.
            </AccordionItem>
            <AccordionItem prompt="How can new members get involved in club activities?">
              The best way to get involved is by getting to participate in a project.
              We recommend reading through the club's <Link to="/projects">projects</Link>
              &nbsp;page to find something that you're interested in and then sending a
              message to the project's tech leads via Discord. Each active project
              has its dedicated Discord channel, so it shouldn't be hard to get in
              touch. The tech leads will answer any further questions and help you
              get started.
              <br/><br/>
              Another good way is to speak to one of the board members. They can
              be approached during meetings or via Discord. If you'd like additional
              help, you can also contact us via email at osctechlead(at)gmail.com or
              via the <Link to="/#get-in-touch">contact form</Link>.
            </AccordionItem>
            <AccordionItem prompt="Are there any membership requirements or dues?">
              No, the club is completely free of charge and anyone can join.
              There are no membership requirements.
            </AccordionItem>
            <AccordionItem prompt="What events does the club typically organize?">
              The club organizes casual codings, which typically happen
              twice a week throughout the fall and spring semesters. It also
              organizes General Body Meetings, which happen 1-3 times a semester
              and host guest speakers from UF or tech companies.
              <br/><br/>
              We've also started to host &nbsp;
              <Link to="/blog/2024-osc-mini-hackathon-highlights/">
                hackathons
              </Link>
            </AccordionItem>
            <AccordionItem prompt="How can I contact you?">
              You can contact us via &nbsp;
              <Link to="https://discord.gg/Gsxej6u">discord</Link> or
              through the site <Link to="/#get-in-touch">contact form</Link>.
              Alternatively, you can send an email to
              osctechlead(at)gmail.com
            </AccordionItem>
            <AccordionItem prompt="How does the club contribute to professional development?">
              The club hosts practice internship interviews, resume reviews,
              and collaborations with the &nbsp;
              <Link to="/blog/navigating-career-fair/">
                UF Career Connections center.
              </Link>. Occasionally, we invite guest speakers from companies
              (most recently &nbsp;
              <Link to="https://docs.ufosc.org/docs/club/2022-2023/fall-gbm-11-04-2022">
                Amazon & Microsoft
              </Link>), &nbsp;
              <Link to="/blog/2024-osc-mini-hackathon-highlights/">
                host hackathons
              </Link>, or a variety of other events to assist our
              members in accumulating pre-professional experiences.
              <br/><br/>
              Joining the open source club is a great way to develop
              your CV (especially if you're a tech lead or board member)
              and portfolio through working on real-life projects. You'll
              also learn sought-after jobs skills like maintaining Git
              repositories, software development paradigms
              (AGILE, kanban, etc.), and cloud/devops.
            </AccordionItem>
          </Accordion>
        </section>
        <section>
          <h1>Resources</h1>
          <h2>
            The club maintains extensive project documentation, planning
            information, education resources, and meeting archives
            (recordings, transcripts, etc.). It is available at &nbsp;
            <Link to="https://docs.ufosc.org">docs.ufosc.org</Link>.
          </h2>
        </section>
      </div>
    </Layout>
  )
}

export default AboutPage
export const Head: HeadFC = () => <SEO title={"About | UF Open Source Club"} />

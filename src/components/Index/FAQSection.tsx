import React from "react"
import { Link, navigate } from "gatsby"
import { Accordion, AccordionItem } from '../Accordion/Accordion'

const FAQSection = () => (
  <section id='faq-section'>
    <div className="section-root">
      <h2 className="section-heading">
        Frequently Asked Questions
      </h2>
      <button
        className='tertiary'
        style={{ marginBottom: 30 }}
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
)

export default FAQSection

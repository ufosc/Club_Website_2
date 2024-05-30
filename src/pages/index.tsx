import '../global.css'

import * as React from "react"
import Layout from '../components/Layout'
import Animation from '../components/Animation/Animation'
import type { HeadFC, PageProps } from "gatsby"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Animation speed={0.001} scale={30}>
        <h2>let's build, <mark>open source</mark></h2>
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
      <section>
        Blog section
      </section>
      <section>
        <h2 className="section-heading">Our projects</h2>
      </section>
      <section>
        <h2 className="section-heading">Join a thriving community</h2>
      </section>
      <section>
        <h2 className="section-heading">Become a member</h2>
      </section>
      <section>
        <h2 className="section-heading">Get in touch</h2>
      </section>
    </Layout>
  )
}

export default IndexPage
export const Head: HeadFC = () => <title>UF Open Source Club</title>

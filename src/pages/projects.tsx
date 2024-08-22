import '../global.css'
import './projects.css'

import * as React from "react"
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import { graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"

const ProjectsPage: React.FC<PageProps> = (props: { data: any }) => {
  const nodes = props.data.allMdx.nodes
  const cards : any[] = []
  for (let i = 0; i < nodes.length; ++i) {
    cards.push((<ProjectCard index={i} data={nodes[i].frontmatter} />))
  }
  return (
    <Layout>
      <div className='projects'>
        <div className='projects__projects'>
          { cards }
          <div className='projects__projects__meta'>
            <h1> Projects </h1>
            <h2 style={{ marginTop: 10 }}>
              At the beginning of every semester, members present their work
              or propose new project ideas. If enough people are interested
              in a project, it is adopted by the club and tech-leads are
              assigned to lead it.
              <br /><br />
              All projects are hosted on GitHub under permissive, open source
              licenses.
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectsPage
export const Head: HeadFC = () => (
  <SEO
    title={"Projects | UF Open Source Club"}
    desc={"Open Source Projects from the Open Source Club"}
  />
)

export const pageQuery = graphql`
  {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
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

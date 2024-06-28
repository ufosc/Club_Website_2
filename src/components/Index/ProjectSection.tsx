import React from "react"
import { navigate } from "gatsby"
import ProjectCard from "../ProjectCard/ProjectCard"

export default function ProjectSection(props: { nodes: any }) {
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

  return (
    <section>
      <div className="section-root">
        <h1 className="section-heading">
          Latest projects
        </h1>
        <button
          className='tertiary'
          style={{ marginBottom: 30 }}
          onClick={() => { navigate('/projects') }}>
          SEE MORE 🔗
        </button>
      </div>
      <div className='project-container'>{ cards }</div>
    </section>
  )
}

import './ProjectCard.css'
import * as React from "react"

const COLORS = [
  "#10ac84", "#0abde3", "#ee5253", "#ff9f43", "#f368e0",
  "#01a3a4", "#54a0ff", "#341f97", "#3dc1d3"
]

export default function ProjectCard(props: { data: any, index: number }) {
  const color = COLORS[props.index % COLORS.length]
  console.log(COLORS[1])
  console.log(props.index)

  const onClickLearnMore = () => {
    window.location.replace(`/projects${props.data.slug}`)
  }

  const onClickGitHub = () => {
    window.location.replace(props.data.repo)
  }

  // Truncate if too many tags.
  if (props.data.tags.length > 3) {
    props.data.tags = props.data.tags.slice(0, 3)
  }

  return (
    <div className='project-card'>
      <div className='project-card-title' style={{ borderLeftColor: color }}>
        <h2>{props.data.title}</h2>
      </div>
      <h3>{props.data.description}</h3>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        { props.data.tags.map((tag: string) => (<a>{tag}</a>)) }
      </div>
      <div>
        <button className='secondary' onClick={onClickLearnMore}>
          LEARN MORE
        </button>
        <button className='secondary' onClick={onClickGitHub}>
          GitHub 🔗
        </button>
      </div>
    </div>
  )
}

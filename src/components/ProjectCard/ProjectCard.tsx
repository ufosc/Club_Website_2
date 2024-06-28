import './ProjectCard.css'
import * as React from "react"
import { navigate } from "gatsby"
import Badge from '../Badge'

const COLORS = [
  "#10ac84", "#0abde3", "#ee5253", "#ff9f43", "#f368e0",
  "#01a3a4", "#54a0ff", "#341f97", "#3dc1d3"
]

// Temporarily disable the button linking to custom project pages.
// TODO: This is until we finish custom project pages.
const DISABLE_PROJECT_PAGE : boolean = true

export default function ProjectCard(props: { data: any, index: number }) {
  const color = COLORS[props.index % COLORS.length]
  const onClickLearnMore = () => {
    navigate(`/projects${props.data.slug}`)
  }

  const onClickGitHub = () => {
    navigate(props.data.repo)
  }

  // Truncate if too many tags.
  if (props.data.tags.length > 3) {
    props.data.tags = props.data.tags.slice(0, 3)
  }

  return (
    <div className='project-card'>
      <div className='project-card-title' style={{ borderLeftColor: color }}>
        <h1>{props.data.title}</h1>
      </div>
      <h2>{props.data.description}</h2>
      <div style={{ margin: "20px 0", display: "flex" }}>
        {
          props.data.tags.map((tag: string) => (
            <Badge>{tag}</Badge>
          ))
        }
      </div>
      <div>
        {
          (DISABLE_PROJECT_PAGE) ? null : (
            <button className='secondary' onClick={onClickLearnMore}>
              LEARN MORE
            </button>
          )
        }
        <button className='secondary' onClick={onClickGitHub}>
          GitHub 🔗
        </button>
      </div>
    </div>
  )
}

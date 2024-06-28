import React from "react"
import { Slideshow, Slide } from "../Slideshow/Slideshow"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
import Badge from "../Badge"

export default function NewsSection(props: { nodes: any }) {
  let nodes = props.nodes
  if (nodes.length === 0) {
    return null
  }

  // Truncate, we don't want to show too many posts..
  if (nodes.length > 5) {
    nodes = nodes.slice(0, 5)
  }

  return (
    <section>
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
                  <GatsbyImage image={img} style={{ borderRadius: 30 }} width={470} />
                  <div className='slide-meta'>
                    <Badge> ANNOUNCEMENT </Badge>
                    <h1 style={{ marginTop: 10 }}>{frontmatter.title}</h1>
                    <h2>{frontmatter.subtitle}</h2>
                    <h2>{frontmatter.date}</h2>
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
    </section>
  )
}

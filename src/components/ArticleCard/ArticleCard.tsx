import '../../global.css'
import './ArticleCard.css'

import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"

export default function ArticleCard(props: { data: any }) {
  const img = getImage(props.data.featuredImage)
  const onClick = () => {
    navigate(`/blog${props.data.slug}`)
  }
  return (
    <div className='card-container' onClick={onClick}>
      <div style={{ maxWidth: 300, height: 200 }}>
        <GatsbyImage image={img!} alt={props.data.subtitle} />
      </div>
      <h1>{props.data.title}</h1>
      <h2 style={{ fontWeight: "bold" }}>
        {
          props.data.author.map((author: string, i: number) => {
            if (i === props.data.author.length - 1) {
              return author
            }
            return author + ", "
          })
        }
      </h2>
      <h2>{props.data.subtitle}</h2>
      <h2>{props.data.date}</h2>
    </div>
  )
}

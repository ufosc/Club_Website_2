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
      <GatsbyImage image={img} />
      <h2>{props.data.title}</h2>
      <h3 style={{ fontWeight: "bold" }}>{props.data.author}</h3>
      <h3>{props.data.subtitle}</h3>
      <h3>{props.data.date}</h3>
    </div>
  )
}

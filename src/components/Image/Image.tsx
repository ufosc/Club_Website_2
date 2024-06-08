import React from "react"
import "./Image.css"

// TODO: Optimize image rendering.

export default function Image
(props: { style?: object, children?: any, className?: string, src: string, alt: string}) {
  const className = (props.className) ? " " + props.className : ""
  if (typeof props.children === "undefined") {
    return (
      <img
        src={props.src}
        alt={props.alt}
        style={props.style}
        className={className}
      />
    )
  }

  return (
    <div className={`image-container${className}`} style={props.style}>
      <img
        src={props.src}
        alt={props.alt}
        className="image-container__image"
      />
      <div className="image-container__meta">
        { props.children }
      </div>
    </div>
  )
}

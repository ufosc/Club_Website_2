import React from "react"
import "./Overlay.css"

interface OverlayProps {
  children: Array<any>;
  className?: string;
  style?: any;
}

const Overlay: React.FC<OverlayProps> = ({ children, className, style }) => {
  const cname = (className) ? " " + className : ""
  if (children.length < 1) {
    throw new Error("First child must be the background image")
  }

  return (
    <div className={`image-container${cname}`} style={style}>
      <div className="image-container__image">
        { children[0] }
      </div>
      <div className="image-container__meta">
        { children.slice(1) }
      </div>
    </div>
  )
}

export default Overlay

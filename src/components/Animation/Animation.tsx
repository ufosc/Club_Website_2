import "./Animation.css"
import React, { lazy, useEffect, useState } from "react"

interface AnimationProps {
  children?: any;
  speed: number;
  scale: number;
}

const Renderer = lazy(() => import('./Renderer'))

const Animation: React.FC<AnimationProps> = ({ children, speed, scale }) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false)
  useEffect(() => { setShouldRender(true) }, [])

  return (
    <div id="animation">
      <div id="animation__root" />
      <div id="animation__children">
        { children }
        { shouldRender && <Renderer speed={speed} scale={scale} /> }
      </div>
    </div>
  )
}

export default Animation

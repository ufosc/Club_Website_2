import React from "react"
import Animation from '../Animation/Animation'
import CursorText from '../CursorText'
import { navigate } from "gatsby"

// Do not use long strings. If you cause the line to wrap to the next
// page (e.g. mobile screen widths), then you're negatively impacting
// the lighthouse performance metric.
const MSG_BATCH = [
  "open source", "a scheduler", "3D graphics", "an LLM",
  "a nextjs site", "a linux distro", "a visual novel",
  "microservices"
]

const AnimationSection = () => (
  <Animation speed={0.001} scale={30}>
    <h1>let's build <CursorText batch={MSG_BATCH} /></h1>
    <h2 style={{margin: "auto", marginTop: 50, maxWidth: "min(800px, 70%)"}}>
      Embrace the power of collaborative creation at the University of
      Florida's Open Source Club. Meet new friends, propose ideas, learn
      programming, and work on open source projects.
    </h2>
    <div>
      <button onClick={ () => navigate('/#become-a-member') }
        style={{ marginTop: 50 }}>
        JOIN NOW
      </button>
      <button onClick={ () => navigate('/about') }
        className="secondary">
        LEARN MORE
      </button>
    </div>
  </Animation>
)

export default AnimationSection

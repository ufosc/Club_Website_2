import React, { useState, useEffect } from "react"
import Typewriter from "typewriter-effect"

export default function CursorText(props: { batch: Array<string> }) {
  return (
    <div style={{ width: "var(--width-max)", height: 80 }}>
      <Typewriter
        options={{
          strings: props.batch,
          autoStart: true,
          loop: true,
        }}/>
    </div>
  )
}

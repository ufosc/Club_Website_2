import React, { useState, useEffect } from "react"
import "../global.css"

const TrackingPixel = () => {
  const [trackURI, setTrackURI] = useState<string>("")

  // Wraps window.location when available. Window is not defined
  // during server rendering/building.
  const getWindowLocation = () => {
    if (typeof window !== "undefined") {
      return window.location.href
    }
    return null
  }

  // Initializes pixel tracking URL. It passes the user's screen
  // width/height, device memory, and CPU cores to the analytics
  // service.
  useEffect(() => {
    const newURI = "https://tracker-750768004266.us-central1.run.app/track/ufosc.png/" +
      `?width=${window.screen.width}` +
      `&height=${window.screen.height}` +
      `&mem=${navigator.deviceMemory}` +
      `&cores=${navigator.hardwareConcurrency}` +
      `&src=${window.location}`

    if (newURI !== trackURI) {
      setTrackURI(newURI)
      console.log("changed")
    }
  }, [getWindowLocation()])

  return trackURI !== "" ? (
    <img id="trk-pixel"
      height={1} width={1}
      alt="tracking pixel"
      src={trackURI} />
  ) : null
}

export default TrackingPixel

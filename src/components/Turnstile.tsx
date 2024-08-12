import React, { useEffect } from "react"

const CaptchaURL = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"

const Turnstile: React.FC<{setToken: (_: string) => void }> =
  ({ setToken }) => {
  useEffect(() => {

    // Prevent loading script multiple times.
    if (window.turnstile) {
      return
    }

    // Turnstile callback.
    window.onloadTurnstileCallback =  () => {
      turnstile.render('#captcha-container', {
        sitekey: '1x00000000000000000000AA',
        callback: setToken,
      })
    }

    // Inject Turnstile script.
    const script = document.createElement('script')
    script.src = CaptchaURL
    script.defer = false
    script.async = true
    document.getElementById('captcha-injection-site')?.appendChild(script)

  }, [])

  return (
    <>
      <div id="captcha-injection-site"/>
    </>
  )
}

export default Turnstile

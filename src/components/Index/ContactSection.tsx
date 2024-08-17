import React, { useState } from "react"
import Turnstile from '../Turnstile'
import axios from "axios"

export type ContactFormInput = {
  Email:     string;
  Subject:   string;
  Message:   string;
  Subscribe: boolean;
}

export default function ContactSection() {
  type TextEvent = { target: { value: string }}
  type CheckboxEvent = { target: { checked: boolean }}

  const [showCaptcha, setShowCaptcha] = useState<boolean>(false)
  const [captchaToken, setCaptchaToken] = useState<string>("")
  const [form, setForm] = useState<ContactFormInput>({
    Email: "", Subject: "", Message: "", Subscribe: true,
  })

  const onSubscribeChange = (event: CheckboxEvent) => {
    setForm({ ...form, Subscribe: event.target.checked })
  }

  const onTextChange = (field: string, event: TextEvent) => {
    if (!showCaptcha) {
      console.log("Showing captcha!")
      setShowCaptcha(true)
    }
    setForm({ ...form, [field]: event.target.value})
  }

  // whether submission is disabled.
  const isDisabled = () => {
    return (captchaToken === "")
  }

  const onSubmit = (event: { preventDefault: () => any }) => {
    event.preventDefault()
    if (isDisabled()) {
      return
    }
    axios.post("https://mailbox-sifpwxrsgq-uc.a.run.app/mailbox/submit", {
      from: form.Email,
      subject: form.Subject,
      message: form.Message,
      captcha: captchaToken,
    }).then((res) => {
      if (res.status && res.status === 200) {
        alert("Message successfully submitted")
        window.location.reload()
        return
      }
      alert("Failed to submit message. Please try again later.")
      window.location.reload()
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.error) {
        alert(`Error: ${err.response.data.error}. Please try again later.`)
        window.location.reload()
        return
      }
      alert("Failed to submit message. Please try again later.")
      window.location.reload()
    })
  }

  const Captcha = (
    <>
      <Turnstile setToken={(t: string) => setCaptchaToken(t) } />
      <div id="captcha-container" />
    </>
  )

  return (
    <section id='get-in-touch'>
      <h1 className="section-heading" style={{ marginBottom: 20 }}>
        Get in touch
      </h1>
      <div className="contact-form">
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            required type="text" id="contact-form__email"
            name="email" placeholder="gator@example.com"
            title="Expected an email address of the form: example@example.tld"
            pattern=".+@.+\..+" value={form.Email}
            onChange={ (event: TextEvent) => onTextChange("Email", event) }
          />
          <label htmlFor="subject">Subject</label>
          <input
            required type="text" id="contact-form__subject"
            name="subject" placeholder="Subject"
            title="Message Subject (A-Z, a-z, no punctuation)"
            pattern="[A-Za-z\s]+" value={form.Subject}
            onChange={ (event: TextEvent) => onTextChange("Subject", event) }
          />
          <label htmlFor="message">Message</label>
          <textarea required id="contact-form__message"
            name="message" placeholder="Enter your message here..."
            onChange={ (event: TextEvent) => onTextChange("Message", event) }
            rows={4} cols={40} value={form.Message} />
          <div style={{ display: "flex", flexDirection: "row"}}>
            <input
              checked={form.Subscribe}
              type="checkbox"
              id="contact-form__subs"
              name="subscribe"
              onChange={onSubscribeChange}
            />
            <label htmlFor="subscribe" style={{ margin: "5px 20px" }}>
              Subscribe to our newsletter (1-2 emails/month)
            </label>
          </div>
          { (showCaptcha) ? Captcha : null }
          <input type="submit" value="Submit" disabled={isDisabled()} />
        </form>
        <h2 id="contact-form__meta">
          We're here to help! If you have any questions, suggestions, or
          comments about the Open Source Club, please feel free to reach out
          to us using the contact form to the left. Our team is dedicated to
          provided the best experience for our members, and we value your
          feedback.
        </h2>
      </div>
    </section>
  )
}

import React, { useState } from "react"

export type ContactFormInput = {
  Email:     string;
  Subject:   string;
  Message:   string;
  Subscribe: boolean;
}

export default function ContactSection() {
  type TextEvent = { target: { value: string }}
  type CheckboxEvent = { target: { checked: boolean }}

  const [form, setForm] = useState<ContactFormInput>({
    Email: "", Subject: "", Message: "", Subscribe: true,
  })

  const onSubscribeChange = (event: CheckboxEvent) => {
    setForm({ ...form, Subscribe: event.target.checked })
  }

  const onTextChange = (field: string, event: TextEvent) => {
    setForm({ ...form, [field]: event.target.value})
  }

  const onSubmit = (event: { preventDefault: Function }) => {
    event.preventDefault()
    alert("Contact form is temporarily unavailable")
  }

  return (
    <section id='get-in-touch'>
      <h2 className="section-heading" style={{ marginBottom: 20 }}>
        Get in touch
      </h2>
      <div className="contact-form">
        <form onSubmit={onSubmit}>
          <label for="email">Email Address</label>
          <input
            required type="text" id="contact-form__email"
            name="email" placeholder="gator@example.com"
            title="Expected an email address of the form: example@example.tld"
            pattern=".+@.+\..+" value={form.Email}
            onChange={ (event: TextEvent) => onTextChange("Email", event) }
          />
          <label for="subject">Subject</label>
          <input
            required type="text" id="contact-form__subject"
            name="subject" placeholder="Subject"
            title="Provide a message subject"
            pattern="[A-Za-z\s]+" value={form.Subject}
            onChange={ (event: TextEvent) => onTextChange("Subject", event) }
          />
          <label for="message">Message</label>
          <textarea required id="contact-form__message"
            name="message" placeholder="Enter your message here..."
            onChange={ (event: TextEvent) => onTextChange("Message", event) }
            rows="4" cols="40" value={form.Message} />
          <div style={{ display: "flex", flexDirection: "row"}}>
            <input
              checked={form.Subscribe}
              type="checkbox"
              id="contact-form__subs"
              name="subscribe"
              onChange={onSubscribeChange}
            />
            <label for="subscribe" style={{ margin: "5px 20px" }}>
              Subscribe to our newsletter (1-2 emails/month)
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
        <h3 id="contact-form__meta">
          We're here to help! If you have any questions, suggestions, or
          comments about the Open Source Club, please feel free to reach out
          to us using the contact form to the left. Our team is dedicated to
          provided the best experience for our members, and we value your
          feedback.
        </h3>
      </div>
    </section>
  )
}

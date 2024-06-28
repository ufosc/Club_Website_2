import './Accordion.css'
import '../../global.css'

import React, { useState }  from "react"
import { ChevronDown } from "lucide-react"

export const Accordion = (props: { children?: any }) => (
  <div className='accordion'>
    { props.children }
  </div>
)

export const AccordionItem = (props: { children?: any, prompt?: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const chevronStyle = () => {
    const anim = (isOpen) ? "flip-open" : "flip-close"
    return {
      animation: `0.2s ease-out ${anim} forwards`,
      color: "white"
    }
  }

  return (
    <div className='accordion-item'>
      <div className='accordion-item--trigger' onClick={() => setIsOpen(!isOpen)}>
        <h2>{props.prompt}</h2>
        <ChevronDown style={chevronStyle()} />
      </div>
      {
        (isOpen) ? (
          <div className='accordion-item--body'> {props.children} </div>
        ) : null
      }
      <hr />
    </div>
  )
}

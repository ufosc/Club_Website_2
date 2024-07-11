import './Slideshow.css'
import React, { useState, useEffect } from "react"

export const Slide = (props: { children?: any }) => {
  return (
    <div className='slide-container' key={Math.random()}
      style={{ animation: "rollin 2s" }}>
      { props.children }
    </div>
  )
}

export const Slideshow = (props: { children: any, period?: number }) => {
  const [select, setSelect] = useState<number>(0)
  const period = props.period || 5000
  const advance = (i: number) => {
    setSelect((select + i) % props.children.length)
  }

  const PrevButton = () => {
    if (select === 0) {
      return null
    }
    return (
      <div className="slideshow-button" onClick={() => advance(-1)}>&#8249;</div>
    )
  }

  const NextButton = () => {
    if (select === props.children.length - 1) {
      return null
    }
    return (
      <div className='slideshow-button-root'>
        <div className="slideshow-button" onClick={() => advance(1)}>&#8250;</div>
      </div>
    )
  }

  const SlideIndices = () => {
    const rows : any = []
    for (let i = 0; i < props.children.length; i++) {
      if (i !== select) {
        rows.push((
          <div key={i} className='slide-index' onClick={() => setSelect(i)}/>
        ))
        continue
      }
      rows.push((
        <div key={i} className='slide-index--selected' onClick={() => setSelect(i)} />
      ))
    }

    return (
      <div
        className='slide-indices'
        style={{ gridTemplateColumns: `repeat(${props.children.length}, 1fr`}}>
        { rows }
      </div>
    )
  }

  useEffect(() => {
    const interval = setInterval(() => { advance(1) }, period)
    return () => clearInterval(interval);
  }, [select])

  return (
    <div className='slideshow-layout'>
      <div className='slideshow-button-root'>
        <PrevButton />
      </div>
      <div className='slideshow-body'>
        {
          // Rendering the child directly (e.g. props.children[select])
          // means we re-download images every time they are rendered.
          props.children.map((child: any, i: number) => {
            if (i === select) {
              return (<div style={{ width: "100%" }}>{ child }</div>)
            }
            return (
              <div style={{ display: "none" }}>
                { child }
              </div>
            )
          })
        }
        <SlideIndices />
      </div>
      <div className='slideshow-button-root'>
        <NextButton />
      </div>
    </div>
  )
}

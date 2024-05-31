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
  const period = props.period || 4000
  const advance = (i: number) => {
    setSelect((select + i) % props.children.length)
  }

  const PrevButton = () => {
    if (select === 0) {
      return null
    }
    return (
      <a className="slideshow-button" onClick={() => advance(-1)}>&#8249;</a>
    )
  }

  const NextButton = () => {
    if (select === props.children.length - 1) {
      return null
    }
    return (
      <div className='slideshow-button-root'>
        <a className="slideshow-button" onClick={() => advance(1)}>&#8250;</a>
      </div>
    )
  }

  const SlideIndices = () => {
    let rows : any = []
    for (let i = 0; i < props.children.length; i++) {
      if (i !== select) {
        rows.push((
          <a key={i} className='slide-index' onClick={() => setSelect(i)}/>
        ))
        continue
      }
      rows.push((
        <a key={i} className='slide-index--selected' onClick={() => setSelect(i)} />
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
        { props.children[select] }
        <SlideIndices />
      </div>
      <div className='slideshow-button-root'>
        <NextButton />
      </div>
    </div>
  )
}

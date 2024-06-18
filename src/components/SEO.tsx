import React, { ReactNode } from "react"

interface SEOProps {
  title?:    string,
  desc?:     string,
  children?: ReactNode,
}

const DEFAULT_DESC = "Embrace the power of collaborative creation at the University of Florida's Open Source Club"

const SEO : React.FC<SEOProps> = ({ title, desc, children }) => {
  const meta = {
    title: title || "UF Open Source Club",
    desc: desc || DEFAULT_DESC,
  }
  return (
    <>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.desc} />
      { children }
    </>
  )
}

export default SEO

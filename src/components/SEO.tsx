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
      <meta name="description" content={desc} />
      <link
        rel="preload"
        href="/static/ABCDiatype-Thin-0014e853f5cc65fcba085b6bf3d5173a.woff2"
        type="font/woff2"
        as="font"
      />
      <link
        rel="preload"
        href="/static/outrun-fb555d4ee3de8868db9007c6c5d8bb4a.otf"
        as="font"
      />
      <link
        rel="preload"
        href="/static/ABCDiatype-Bold-f3ad6f560dfe6e2ea8a23827a0b64d34.woff2"
        type="font/woff2"
        as="font"
      />
      <link
        rel="preload"
        href="/static/ABCDiatype-Regular-ad4231d2ee05dc2551ce86a6580ccdbf.woff2"
        type="font/woff2"
        as="font"
      />
      <link
        rel="preload"
        href="/static/ABCDiatype-Thin-0014e853f5cc65fcba085b6bf3d5173a.woff2"
        type="font/woff2"
        as="font"
      />
      { children }
    </>
  )
}

export default SEO

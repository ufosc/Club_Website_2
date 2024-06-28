import '../global.css'
import "./404.css"

import React from "react"
import { HeadFC, PageProps } from "gatsby"
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Image404 = "../images/404.jpg"

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <div className="not-found-page">
      <div style={{ width: 200, maxWidth: "100%" }}>
        <StaticImage src={Image404} width={200} alt="Page not found" />
      </div>
      <h2 className="not-found-page--text">Error 404: Not Found</h2>
      <p className="not-found-page--text">
        The requested resource does not exist or has permanently moved. If
        you believe this is an error, please <Link to="/#get-in-touch">contact us</Link> or file an issue on
        <Link to="https://github.com/ufosc/Club_Website_2"> GitHub </Link>
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
export const Head: HeadFC = () => <SEO title={"404 Not Found | UF Open Source Club"} />

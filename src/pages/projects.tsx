import '../global.css'

import * as React from "react"
import Layout from '../components/Layout'
import type { HeadFC, PageProps } from "gatsby"

const ProjectsPage: React.FC<PageProps> = () => {
  return (
    <Layout desc={"Projects maintained by the Open Source Club"}>
      You are currently viewing the projects page.
    </Layout>
  )
}

export default ProjectsPage
export const Head: HeadFC = () => <title>Projects | UF Open Source Club</title>

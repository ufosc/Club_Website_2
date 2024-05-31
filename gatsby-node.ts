import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'

const createBlog = async (createPage: Function, reporter: any, graphql: Function) => {

  // Define the template for blog post.
  const blogPost = path.resolve('./src/templates/BlogPostTemplate.tsx')

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  if (posts.length <= 0) {
    return
  }

  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    createPage({
      path: `/blog${post.frontmatter.slug}`,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    })
  })
}

const createProjects = async (createPage: Function, reporter: any, graphql: Function) => {

  // Define the template for blog post.
  const projectTemplate = path.resolve('./src/templates/ProjectTemplate.tsx')

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your projects`,
      result.errors
    )
    return
  }

  const projects = result.data.allMdx.nodes
  if (projects.length <= 0) {
    return
  }

  projects.forEach((project, index) => {
    const previousProjectId = index === 0 ? null : projects[index - 1].id
    const nextProjectId = index === projects.length - 1 ? null : projects[index + 1].id

    createPage({
      path: `/projects${project.frontmatter.slug}`,
      component: `${projectTemplate}?__contentFilePath=${project.internal.contentFilePath}`,
      context: {
        id: project.id,
        previousProjectId,
        nextProjectId,
      },
    })
  })
}

export const createPages = async({ graphql, actions, reporter }) => {
  const { createPage } = actions
  await createBlog(createPage, reporter, graphql)
  await createProjects(createPage, reporter, graphql)
}

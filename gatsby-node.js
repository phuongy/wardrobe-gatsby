const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const clothing = path.resolve(`./src/templates/clothing.js`)
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                name
                slug
                brand
                category
                subcategory
                colour
                sleeve
                description
                year
                purchased
                season
                material
                condition
                cost
                timesWorn
                comments
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      createPage({
        path: post.node.frontmatter.slug,
        component: clothing,
        context: {
          slug: post.node.frontmatter.slug,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
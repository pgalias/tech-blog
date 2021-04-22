const path = require("path")
const { kebabCase } = require("lodash")

exports.createPages = async gatsbyUtilities => {
  const posts = await getPosts(gatsbyUtilities)
  createPostPages(posts, gatsbyUtilities)
}

async function getPosts({ graphql, reporter }) {
  const results = await graphql(/* GraphQL */ `
    query Posts {
      allCustomApi {
        nodes {
          documents {
            document {
              id
              name
              elements {
                body {
                  value {
                    text {
                      value
                    }
                  }
                }
                img {
                  url
                  asset {
                    altText
                  }
                }
                author {
                  value
                }
              }
              tags
              description
              lastModified(formatString: "DD/MM/YY")
              created(formatString: "DD/MM/YY")
            }
          }
        }
      }
    }
  `)

  if (results.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      results.errors
    )
    return
  }

  return results.data.allCustomApi.nodes[0].documents
}

function createPostPages(posts, { actions: { createPage } }) {
  posts.forEach(post => {
    createPage({
      path: `/${kebabCase(post.document.name)}`,
      component: path.resolve("./src/templates/post/post.jsx"),
      context: {
        post: post.document,
      },
    })
  })
}

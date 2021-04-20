const path = require("path")

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
              elements {
                ft {
                  value
                  elementType
                }
                img {
                  url
                  altText
                }
              }
              lastModified(fromNow: true)
              name
              created(fromNow: true)
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
      path: `/${post.document.id}`,
      component: path.resolve("./src/templates/post/post.jsx"),
      context: {
        post: post.document,
      },
    })
  })
}

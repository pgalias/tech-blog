import React from "react"
import { graphql, Link } from "gatsby"
import { slugifyPost } from "../utils/string"
import * as styles from "./index.module.css"

export default function Home({ data }) {
  const posts = data.allCustomApi.nodes[0].documents.map(post => post.document)

  return (
    <div className="container">
      <h1>Welcome to bugno</h1>
      <section className={styles.section}>
        {posts.map(post => (
          <article className={styles.article} key={post.id}>
            <Link to={`/${slugifyPost(post)}`}>
              <img
                className={styles.articleImg}
                src={`https://content-eu-4.content-cms.com/859f2008-a40a-4b92-afd0-24bb44d10124${post.elements.img.url}`}
                alt={post.elements.img.altText}
                loading="lazy"
              />
            </Link>
            <Link to="/" className={styles.articleCategory}>
              Category name with link
            </Link>
            <h3 className={styles.articleName}>
              <Link to={`/${slugifyPost(post)}`}>{post.name}</Link>
            </h3>
            <div className={styles.articleContent}>{post.description}</div>
            <Link to={`/${slugifyPost(post)}`}>Read more</Link>
          </article>
        ))}
      </section>
    </div>
  )
}

export const pageQuery = graphql`
  query Archive {
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
            lastModified(fromNow: true)
            created(fromNow: true)
          }
        }
      }
    }
  }
`

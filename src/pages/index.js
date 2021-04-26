import React from "react";
import { graphql, Link } from "gatsby";
import { slugifyPost } from "../utils/string";
import { Layout } from "../components/layout";

import * as styles from "./index.module.scss";

export default function Home({ data }) {
  const posts = data.allCustomApi.nodes[0].documents.map((post) =>
    post.document
  );

  return (
    <Layout>
      <div className="container">
        <h1 className={styles.articleIntro}>Welcome to bugno</h1>
        <section className={styles.section}>
          {posts.map((post) => (
              <Link key={post.id} className={styles.article} to={`/${slugifyPost(post)}`}>
                <img className={styles.articleImg} src={`https://content-eu-4.content-cms.com/859f2008-a40a-4b92-afd0-24bb44d10124${post.elements.img.url}`} alt={post.elements.img.altText} />
                <p className={styles.articleMeta}>
                  <small>{post.elements.author.value}</small>
                  <span className={styles.articleCategory}>{post.lastModified}</span>
                </p>
                <h2 className={styles.articleName}>{post.name}</h2>
                <p>{post.description}</p>
              </Link>
          ))}
        </section>
      </div>
    </Layout>
  );
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
            description
            lastModified(formatString: "DD/MM/YY")
            created(formatString: "DD/MM/YY")
          }
        }
      }
    }
  }
`;

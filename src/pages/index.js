import React from "react";
import { graphql, navigate } from "gatsby";
import { slugifyPost } from "../utils/string";
import { Layout } from "../components/layout";
import Loadable from "@loadable/component"

import * as styles from "./index.module.scss";

const GalleryTile = Loadable(() => import("../components/galleryTile/GalleryTile"));

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
            <GalleryTile
              alt={post.elements.img.altText}
              src={`https://content-eu-4.content-cms.com/859f2008-a40a-4b92-afd0-24bb44d10124${post.elements.img.url}`}
              link={`/${slugifyPost(post)}`}
              description={post.description}
              lastModified={post.lastModified}
              title={post.name}
              onClick={() => navigate(`/${slugifyPost(post)}`)}
            />
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
            tags
            description
            lastModified(formatString: "DD/MM/YY")
            created(formatString: "DD/MM/YY")
          }
        }
      }
    }
  }
`;

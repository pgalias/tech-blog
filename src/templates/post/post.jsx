import React from "react"
import { Layout } from "../../components/layout"
import { document } from "browser-monads";
import * as styles from "./style.module.scss"
import { CodeBlock } from "./code-block"


const isCodeBlock = element =>
  element.tagName.toLocaleLowerCase() === "pre" &&
  element.children[0].tagName.toLocaleLowerCase() === "code"

const Post = ({ pageContext: { post } }) => {
  const isSSR = typeof window === "undefined";
  const element = !isSSR ? document.createElement("div") : {};
  element.innerHTML = !isSSR ? post.elements.body.value.text.value : '';

  const elements = !isSSR && Array.from(element.children).map(e => {
    if (isCodeBlock(e)) {
      return <CodeBlock codeBlock={e.children[0]} />
    }

    return <div dangerouslySetInnerHTML={{ __html: e.outerHTML }} />
  })

  return (
    <Layout>
      <article>
        <header
          className={styles.header}
          style={{
            backgroundImage: `url(https://content-eu-4.content-cms.com/859f2008-a40a-4b92-afd0-24bb44d10124${post.elements.img.url})`,
          }}
        >
          <div className="container">
            <h1 className={styles.heading}>{post.name}</h1>
            <p className={styles.meta}>
              <span className={styles.author}>
                {post.elements.author.value}
              </span>
              <small className={styles.date}>{post.created}</small>
            </p>
          </div>
        </header>

        <div className={styles.article}>
          <div className="container">{elements}</div>
        </div>
      </article>
    </Layout>
  )
}

export default Post

import React from "react"
import { Link } from "gatsby"
import { Layout } from "../../components/layout"
import * as styles from "./style.module.scss"
import { CodeBlock } from "./code-block"

const isCodeBlock = element =>
  element.tagName.toLocaleLowerCase() === "pre" &&
  element.children[0].tagName.toLocaleLowerCase() === "code"

const Post = ({ pageContext: { post } }) => {
  const element = document.createElement("div")
  element.innerHTML = post.elements.body.value.text.value

  const elements = Array.from(element.children).map(e => {
    if (isCodeBlock(e)) {
      return <CodeBlock codeBlock={e.children[0]} />
    }

    return <div dangerouslySetInnerHTML={{ __html: e.outerHTML }} />
  })

  return (
    <Layout>
      <article>
        <img
          className={styles.img}
          src={`https://content-eu-4.content-cms.com/859f2008-a40a-4b92-afd0-24bb44d10124${post.elements.img.url}`}
          alt={post.elements.img.asset.altText}
          loading="lazy"
        />
        <div className="container">
          <h1 className={styles.header}>{post.name}</h1>
          <h3 className={styles.subheader}>
            <span>{post.elements.author.value}</span>
            <small>{post.created}</small>
          </h3>
          {elements}
          <Link to="/">Go back</Link>
        </div>
      </article>
    </Layout>
  )
}

export default Post

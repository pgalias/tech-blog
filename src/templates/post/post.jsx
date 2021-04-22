import React, { createRef } from "react"
import { unescape } from "lodash"
import { Link } from "gatsby"
import { Layout } from "../../components/layout"
import * as styles from "./style.module.scss"
import Highlight, { defaultProps } from "prism-react-renderer"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import * as decibel from "@decibel/components"

const Post = ({ pageContext: { post } }) => {
  const element = document.createElement("div")
  element.innerHTML = post.elements.body.value.text.value

  const elements = Array.from(element.children).map(e => {
    if (
      e.tagName.toLocaleLowerCase() === "pre" &&
      e.children[0].tagName.toLocaleLowerCase() === "code"
    ) {
      const language = Array.from(e.children[0].classList)
        .map(c => (c.startsWith("language-") ? c.replace("language-", "") : ""))
        .filter(c => c)[0]
      const isReact = language === "javascript"
      const isLive = Array.from(e.children[0].classList).includes("live")
      const code = unescape(e.children[0].innerHTML)

      if (isLive && isReact) {
        return (
          <LiveProvider code={code} scope={{ Button: decibel.Button }}>
            <LiveEditor />
            <LiveError />
            <LivePreview />
          </LiveProvider>
        )
      }

      return (
        <Highlight {...defaultProps} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )
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

import React from "react"
import { Link } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import * as styles from "./style.module.css"

const Post = ({ pageContext: { post } }) => {
  return (
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
        <div className={styles.content}><MDXProvider components={{}}>{post.elements.body.value.text.value}</MDXProvider></div>
        <Link to="/">Go back</Link>
      </div>
    </article>
  )
}

export default Post

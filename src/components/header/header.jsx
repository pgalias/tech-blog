import React from "react"
import { Link } from "gatsby"
import { Logo } from "../logo"
import * as styles from "./header.module.scss"

export const Header = () => (
  <header className={styles.header}>
    <Link to="/">
      <Logo />
    </Link>
    <span className={styles.productName}>Tech BLOG</span>
  </header>
)

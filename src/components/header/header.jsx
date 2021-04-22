import React from "react"
import { Link } from "gatsby"
import { Logo } from "../logo"
import * as styles from "./header.module.scss"

export const Header = () => (
  <header className={styles.header}>
    <div className="container">
        <Link to="/" className={styles.logoWrapper}>
          <Logo />
          <span className={styles.productName}>Tech BLOG</span>
        </Link>
    </div>
  </header>
);

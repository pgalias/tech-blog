import React from "react"
import { Link } from "gatsby"
import { Logo } from "../logo"
import * as styles from "./header.module.scss"

export const Header = () => (
  <header className={styles.header}>
    <div className={`${styles.navWrapper} container`}>
      <Link to="/" className={styles.logoWrapper}>
        <Logo />
        <span className={styles.productName}>Tech BLOG</span>
      </Link>
      <div className={styles.navItems}>
        <Link to="/">Our team</Link>
        <Link to="https://www.acoustic.com/careers" target="_blank">Join us</Link>
      </div>
    </div>
  </header>
);

import React from "react"
import { Link } from "gatsby"
import { Logo } from "../logo"
import * as styles from "./footer.module.scss"

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <Link to="https://acoustic.com" target="_blank">
          <Logo />
        </Link>
        <p className={styles.copyRight}>
          © {year} Acoustic, L.P. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

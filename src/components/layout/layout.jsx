import React from "react"
import { Header } from "../header"
import { Footer } from "../footer"
import * as styles from "./layout.module.scss"

export const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header/>
      <main className={styles.pageContent}>{children}</main>
      <Footer />
    </div>
  )
}

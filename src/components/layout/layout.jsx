import React from "react"
import { Header } from "../header/header"

export const Layout = ({ children }) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <p>Place footer here</p>
    </div>
  )
}

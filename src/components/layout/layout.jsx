import React from "react"

export const Layout = ({ children }) => {
  return (
    <div>
      <p>Place header here</p>
      <main>{children}</main>
      <p>Place footer here</p>
    </div>
  )
}

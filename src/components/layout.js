import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import logo from "../images/car-like-logo-2.png"

import "./layout.css"

const d = new Date()

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="container">
      <div className="header">
        <div className="header-left">
          <div>
            {d.getMonth()} &nbsp;-<span> </span>&nbsp;
          </div>
          <div>
            {d.getDate()} &nbsp;-<span> </span>&nbsp;
          </div>
          <div>{d.getFullYear()} </div>
        </div>
        <img className="main-logo" src={logo} alt="Logo" />
        <div className="header-right">
          <a className="main-log-in">LOG IN</a>
          <a className="main-sign-up">SIGN UP</a>
        </div>
      </div>
      <div className="nav">
        <div className="nav-element-first">HOME</div>
        <div className="nav-element">CARS</div>
        <div className="nav-element">ABOUT</div>
      </div>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

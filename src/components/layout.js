import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Navigation from "../components/navigation"
import 'prismjs/themes/prism-okaidia.css';
import logo from "../images/nueljoe.svg"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-title">
          <Link to="/"><img style={{fill: '#d3d6e7',  width: '150px'}} src={logo}/></Link>
        </div>
        <Navigation />
      </header>
      {children}
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Sirfreeman &bull; </p>
      </footer>
    </div>
  )
}

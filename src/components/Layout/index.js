import React from "react"
import { Link } from "gatsby"
import './style.scss';

class Layout extends React.Component {
  render() {
    const { location, title, children, isPost } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={`/`} >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link to={`/`}>
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div className={`layout ${isPost ? 'post' : ''}`}>
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Github
          {` `}
          <a href="https://github.com/buildGoodWeb/blog">Blog</a>
        </footer>
      </div>
    )
  }
}

export default Layout

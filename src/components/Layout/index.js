import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import './style.scss';
import Toggle from '../Toggle';

const isClient = typeof window === 'object';

const Layout = props => {
  const { location, children, isPost } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  const title = site.siteMetadata.title;
  let header

  const [cls, setCls] = React.useState(() => {
    if (isClient) {
      return window.localStorage.getItem('theme') || 'light';
    } else {
      return 'light';
    }
  });
  const toggle = React.useCallback(() => {
    const theme = cls === 'light' ? 'dark' : 'light';
    setCls(theme);
    isClient && window.localStorage.setItem('theme', theme);
  }, [cls, setCls]);

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
    <div className={`theme-${cls}`}>
      <div className={`layout ${isPost ? 'post' : ''}`}>
        <header>
          {header}
          <div onClick={toggle} className="toggle">
            {cls === 'light' ? <Toggle.Dark /> : <Toggle.Light />}
          </div>
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Github
        {` `}
          <a href="https://github.com/buildGoodWeb/blog">Blog</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout

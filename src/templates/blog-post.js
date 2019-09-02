import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import JustComments from 'gatsby-plugin-just-comments'

import Layout from "../components/Layout"
import playground from "../components/Playground"
import LinkedHeading from "../components/LinkedHeading"
import Toc from "../components/Toc"
import SEO from "../components/seo"

const components = {
  h2: props => <LinkedHeading h="2" {...props} />,
  h3: props => <LinkedHeading h="3" {...props} />,
  h4: props => <LinkedHeading h="4" {...props} />,
  code: playground,
  pre: props => <div className="pre" {...props} />,
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const { headings = [] } = post || {}
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout isPost location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>
          {post.frontmatter.title}
          <span>{post.frontmatter.date}</span>
        </h1>
        <Toc headings={headings} location={this.props.location} />
        <MDXProvider components={components}>
          <MDXRenderer>{post.code.body}</MDXRenderer>
        </MDXProvider>
        <div className="prev-next-nav">
          {previous && (
            <Link className="prev-page" to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link className="next-page" to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </div>
        <JustComments
          locale="zh_CN"
          apikey="6b7be982-a2b1-4c37-ac0b-be44f6c9e483"
          disablesociallogin
          disableprofilepictures
        />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      code {
        body
      }
      headings {
        value
        depth
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
      }
    }
  }
`

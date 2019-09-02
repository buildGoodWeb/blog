import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import "purecss/build/pure-min.css"
import "./style.scss"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug} className="all-header">
              <h3>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
                <span>{node.frontmatter.date}</span>
              </h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
        <div className="pagination">
          <div>
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
          </div>
          <div className="pages">
            {Array.from({ length: numPages }, (_, i) => (
              <Link key={i} to={`/${i === 0 ? "" : i + 1}`}>
                {i + 1}
              </Link>
            ))}
          </div>
          <div>
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
          }
        }
      }
    }
  }
`

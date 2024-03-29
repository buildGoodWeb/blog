import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import playground from '../components/Playground';
import LinkedHeading from '../components/LinkedHeading';
import Toc from '../components/Toc';
import SEO from '../components/seo';

const components = {
  h2: props => <LinkedHeading h="2" {...props} />,
  h3: props => <LinkedHeading h="3" {...props} />,
  h4: props => <LinkedHeading h="4" {...props} />,
  code: playground,
  pre: props => <div className="pre" {...props} />,
};

class BlogPostTemplate extends React.Component {
  render() {
    console.log(this.props.data);
    const pdf = this.props.data.file;
    const post = this.props.data.mdx;
    const { headings = [] } = post || {};
    const { previous, next } = this.props.pageContext;

    return (
      <Layout isPost location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>
          {post.frontmatter.title}
          <span>{post.frontmatter.date}</span>
          {pdf && <a target="_blank" rel="noopener noreferrer" href={pdf.publicURL} title={`打开 ${pdf.relativePath} 文件`}>&Theta;</a>}
        </h1>
        <Toc headings={headings} location={this.props.location} />
        <MDXProvider components={components}>
          <MDXRenderer>{post.body}</MDXRenderer>
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
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
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
    file(ext: { eq: ".pdf" }, name: { regex: $slug }) {
      relativePath
      publicURL
    }
  }
`;

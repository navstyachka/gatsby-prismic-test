import React from 'react';
import {graphql, StaticQuery} from 'gatsby';
import {withPreview} from 'gatsby-source-prismic-graphql';
import {RichText} from 'prismic-reactjs';
import Img from 'gatsby-image';
import { Link } from 'gatsby'

const Image = ({source = {}, property, ...props}) => {
  const sourceSharp = source[`${property}Sharp`];
  if (sourceSharp && sourceSharp.childImageSharp) {
    return <Img {...sourceSharp.childImageSharp} />;
  } else if (source[property] && source[property].url) {
    return <img src={source[property].url} {...props} />;
  }
  return null;
};

const query = graphql`
    query {
        prismic {
            allPosts {
                edges {
                    node {
                        _meta {
                            uid
                        }
                        date
                        description
                        title
                    }
                }
            }
        }
    }
`;

const renderPosts = data => {
  return (
    <>
      <h1>List of articles</h1>
      <ul>
        {data.prismic.allPosts.edges.map(({node}) => (
          <li key={node._meta.uid}>
            <Link to={`/posts/${node._meta.uid}`}>{RichText.render(node.title)}</Link>
            <Image source={node} property="image"/>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Posts = () => {
  return (
    <>
      <StaticQuery query={query} render={withPreview(renderPosts, query)}/>
    </>
  );
};

import React from 'react';
import {Posts} from './post';
import Layout from '../components/layout';
import {graphql} from 'gatsby';

const Gallery = ({items}) => {
    if (!items.fields) return null;
    return items.fields.map(item => (<li key={item.gallery_image.url}>
        <img src={item.gallery_image.url} alt=""/>
    </li>))
}

const VideoGallery = ({items}) => {
    return items.fields.map(item => (<li key={item.yt_video.embed_url}>
        <h3>{item.yt_video.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: item.yt_video.html }} />
    </li>))
}

const Post = ({data}) => {
  const post = data.prismic.post.edges[0].node;
  const {date, description, title, body} = post;

  return (
    <Layout>
      <h1>{title[0].text}</h1>
      <h2>Date: {date}</h2>
      <p>{description}</p>
      {body.map(slice => <div>
        {slice.type === 'gallery' && (<ul>
            <Gallery items={slice} />
        </ul>)}
        {slice.type === 'video_gallery' && (<ul>
            <VideoGallery items={slice} />
        </ul>)}
      </div>)}
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
    query PostBySlug($uid: String!) {
        prismic {
            post: allPosts(uid: $uid) {
                edges {
                    node {
                        date
                        description
                        title
                        body {
                            ... on PRISMIC_PostBodyCode_block {
                                type
                                label
                                primary {
                                    codeBlock
                                }
                            }
                            ... on PRISMIC_PostBodyQuote {
                                type
                                label
                                primary {
                                    quote
                                }
                            }
                            ... on PRISMIC_PostBodyText {
                                type
                                label
                                primary {
                                    text
                                }
                            }
                            ... on PRISMIC_PostBodyImage {
                                type
                                label
                                primary {
                                    image
                                }
                            }
                            ... on PRISMIC_PostBodyGallery {
                                type
                                label
                                fields {
                                    gallery_image
                                }
                            }
                            ... on PRISMIC_PostBodyVideo_gallery {
                                type
                                label
                                fields {
                                    yt_video
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

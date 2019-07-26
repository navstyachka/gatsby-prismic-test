const _ = require('lodash')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = require.resolve('./src/components/post.js')
  const categoryTemplate = require.resolve('./src/components/header.js')

  const result = await wrapper(
    graphql(`
      {
        prismic {
          allPosts {
            edges {
              node {
                _meta {
                  uid
                  tags
                  type
                  id
                  lang
                }
              }
            }
          }
        }
      }
    `)
  )

  const categorySet = new Set()
  const postsList = result.data.prismic.allPosts.edges

  postsList.forEach(edge => {
    // if (edge.node.data.categories[0].category) {
    //   edge.node.data.categories.forEach(cat => {
    //     categorySet.add(cat.category.document[0].data.name)
    //   })
    // }

    // The uid you assigned in Prismic is the slug!
    createPage({
      path: `posts/${edge.node._meta.uid}`,
      component: postTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node._meta.uid,
      },
    })
  })

  const categoryList = Array.from(categorySet)

  // categoryList.forEach(category => {
  //   createPage({
  //     path: `/categories/${_.kebabCase(category)}`,
  //     component: categoryTemplate,
  //     context: {
  //       category,
  //     },
  //   })
  // })
}

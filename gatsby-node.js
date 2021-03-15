const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('src/templates/product.js')
    resolve(
      graphql(
        `
          {
            allContentstackProduct {
              nodes {
                id
                url
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.allContentstackProduct.nodes.forEach(node => {
          createPage({
            path: `/product${node.url}/`,
            component: productPageTemplate,
            context: {
              id: node.id,
            },
          })
        })
      }),
    )
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    node: {fs: 'empty'},
  })
}

/* eslint-disable */
import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../components/SEO'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'
import Layout from '../components/Layout'

class ProductPageTemplate extends React.PureComponent {
  render() {
    const productInfo = get(this, 'props.data.allContentstackProduct')
    const data = productInfo.nodes[0]
    const image = get(data, 'image')
    //const sizes = get(data, 'mainImage.childImageSharp.sizes')
    const product = {
      ...data,
      id: data.id,
      title: data.title,
      image,
      mainImage: data.mainImage,
      header: data.name,
      meta: data.meta,
      sku: data.sku,
      description: data.description
    }

    //if (!sizes) return null

    return (
      <Layout location={this.props.location}>
        <SEO title={product.title} />
        <ProductSummary {...product} />
        <ProductAttributes {...product} />
      </Layout>
    )
  }
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($id: String!) {
    allContentstackProduct(filter: {id: {eq: $id}}) {
      nodes {
        id
        title
        seo {
          title
          description
        }
        image {
          url
        }
        url
        type
        material
        price
        sku
        description
      }
    }
  }
`

import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Image, Header} from 'semantic-ui-react'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import banner from '../images/contentstack-swag-banner.png'
import Layout from '../components/Layout'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
        }
      }
      contentstackHome {
        title
        modular_blocks {
          banner {
            image {
              url
            }
          }
          products {
            title
            select
          }
          text {
            rich_text
          }
        }
      }
      allContentstackProduct {
        nodes {
          id
          title
          url
          price
          image {
            url
          }
        }
      }
    }
  `)

  function createText(text, idx) {
    return (
      <div
        key={idx}
        dangerouslySetInnerHTML={{__html: text}}
        className="dynamicContent"
      />
    )
  }

  function createProductList(title, idx) {
    return (
      <div style={{
        margin: '2em',
      }}>
        <Header
          as="h3"
          icon
          textAlign="center"
          style={{
            marginBottom: '2em',
          }}
        >
          <Header.Content
            style={{
              width: '60%',
              margin: '0 auto',
            }}
          >
            {title}
          </Header.Content>
        </Header>
        <ProductList products={filterProductsWithoutImages} />
      </div>
    )
  }

  function createBanner(url, idx) {
    return <img src={url} alt="Banner" style={{
      width: '100%',
      margin: '1em auto',
    }}/>
  }

  const siteTitle = get(data, 'site.siteMetadata.title')
  const home = get(data, 'contentstackHome')
  const products = get(data, 'allContentstackProduct.nodes')
  const filterProductsWithoutImages = products.filter(p => p.image)
  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      {home.modular_blocks.map(area =>
        Object.entries(area).map((data, idx) => {
          if (data[0] === 'banner' && data[1] !== null) {
            return createBanner(data[1].image.url, idx)
          }
          if (data[0] === 'products' && data[1] !== null) {
            return createProductList(data[1].title, idx)
          }
          if (data[0] === 'text' && data[1] !== null) {
            return createText(data[1].rich_text, idx)
          }
        }),
      )}
    </Layout>
  )
}

export default StoreIndex

/* eslint-disable camelcase */
import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const mapProductsToItems = products =>
  products.map(({title, url, id, price, image}) => {
    return {
      as: Link,
      to: `/product${url}/`,
      childKey: id,
      image: (
        <Image>
          <img src={image.url} alt={title} />
          {/*<Img fluid={mainImage.childImageSharp.sizes} alt={title} />*/}
        </Image>
      ),
      header: title,
      meta: <Card.Meta style={{color: 'dimgray'}}>{price} €</Card.Meta>,
    }
  })

export default ({products}) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)

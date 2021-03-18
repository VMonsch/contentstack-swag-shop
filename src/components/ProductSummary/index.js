import React from 'react'
import Img from 'gatsby-image'

import {Item, Label} from 'semantic-ui-react'

import AddToCart from '../AddToCart'

export default ({product}) => (
  <Item.Group>
    <Item style={{alignItems: 'center'}}>
      <Item.Image size="medium">
        {/*<Img
          style={{width: '250px'}}
          fluid={mainImage.childImageSharp.sizes}
          alt={name}
        />*/}
        <img src={product.image.url} alt={product.title} />
      </Item.Image>
      <Item.Content>
        <Item.Header>{product.title}</Item.Header>
        <Item.Description>
          <p>{product.price} €</p>
          <Label>{`SKU: ${product.sku}`}</Label>
        </Item.Description>
        <Item.Extra>
          <AddToCart product={product} />
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)

import React from 'react'
import Img from 'gatsby-image'

import {Item, Label} from 'semantic-ui-react'

import AddToCart from '../AddToCart'

export default ({id, title, price, sku, image}) => (
  <Item.Group>
    <Item style={{alignItems: 'center'}}>
      <Item.Image size="medium">
        {/*<Img
          style={{width: '250px'}}
          fluid={mainImage.childImageSharp.sizes}
          alt={name}
        />*/}
        <img src={image.url} alt={title} />
      </Item.Image>
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Description>
          <p>{price} €</p>
          <Label>{`SKU: ${sku}`}</Label>
        </Item.Description>
        <Item.Extra>
          <AddToCart productId={id} />
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)

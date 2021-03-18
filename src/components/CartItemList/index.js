/* eslint-disable camelcase */
import React from 'react'
import {Link, useStaticQuery} from 'gatsby'
import {Item, Button, Loader, Message, Responsive} from 'semantic-ui-react'

export default ({items, removeFromCart, loading, completed}) => {
  if (loading) return <Loader active inline="centered" />

  if (completed)
    return (
      <Message success>
        <Message.Header>Than you!</Message.Header>
        <p>Congratulations. Your order and payment has been accepted.</p>
      </Message>
    )

  if (!items || items.length === 0)
    return (
      <Message warning>
        <Message.Header>Your cart is empty</Message.Header>
        <p>
          You will need to add some items to the cart before you can checkout.
        </p>
      </Message>
    )
  const mapCartItemsToItems = items =>
    items.map(({id, url, title, quantity, image, price}) => {
      const imageUrl = image.url || '/images/contentstack-logo.png'

      const DesktopItemImage = () => (
        <Item.Image
          src={imageUrl}
          alt={title}
          size="small"
          style={{background: '#f2f2f2'}}
        />
      )
      const MobileItemImage = () => (
        <Item.Image
          src={imageUrl}
          alt={title}
          size="small"
          style={{background: 'none'}}
        />
      )

      return {
        childKey: id,
        header: (
          <Item.Header>
            <Link to={`/product${url}`}>{title}</Link>
          </Item.Header>
        ),
        image: (
          <React.Fragment>
            <Responsive as={MobileItemImage} {...Responsive.onlyMobile} />
            <Responsive
              as={DesktopItemImage}
              minWidth={Responsive.onlyTablet.minWidth}
            />
          </React.Fragment>
        ),
        meta: `${quantity}x ${price} €`,
        description: 'Awesome choice!',
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => removeFromCart(id)}
          />
        ),
      }
    })
  return <Item.Group divided items={mapCartItemsToItems(items)} />
}

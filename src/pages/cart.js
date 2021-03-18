/* eslint-disable camelcase */
import React, {useState, useContext, useEffect} from 'react'
import SEO from '../components/SEO'
import CartItemList from '../components/CartItemList'
import CartSummary from '../components/CartSummary'
import CartContext from '../components/Context/CartContext'
import Layout from '../components/Layout'

const Cart = ({location}) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [completed, setCompleted] = useState(false)
  const {cart, setCart} = useContext(CartContext)

  function getCartItems() {
    setLoading(true)
    setItems(cart.items)
    setLoading(false)
  }

  useEffect(() => {
    getCartItems()
  }, [])

  const handleCheckout = async data => {
    try {
      setCompleted(true)
      fetch(
        'https://eu-api.contentstack.com/v3/content_types/order/entries?locale=en-us',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            api_key: process.env.CONTENTSTACK_API_KEY || '',
            authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN || '',
          },
          body: JSON.stringify({
            entry: {
              title: 'New order',
              buyer: data.card.name + ' (' + data.email + ')',
              address:
                data.address_line1 +
                ', ' +
                data.address_city +
                ', ' +
                data.address_zip +
                ', ' +
                data.address_country,
            },
          }),
        },
      )
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemoveFromCart = itemId => {
    setCart(
      cart.items.filter(item => {
        return item.id !== itemId
      }),
    )
  }

  const rest = {completed, items, loading}
  let amount = 0
  items.forEach(item => {
    amount += item.quantity * item.price
  })

  return (
    <Layout location={location}>
      <SEO title="Cart" />
      <CartItemList
        {...rest}
        removeFromCart={item => handleRemoveFromCart(item)}
      />
      {!loading && !completed && (
        <CartSummary amount={amount} handleCheckout={handleCheckout} />
      )}
    </Layout>
  )
}

export default Cart

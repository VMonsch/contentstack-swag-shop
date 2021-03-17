import React from 'react'

const CartContext = React.createContext({
  cartId: null,
  cartCount: 0,
  addToCart: () => {},
})

export default CartContext

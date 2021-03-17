import React from 'react'

const CartContext = React.createContext({
  cart: {items:[]},
  cartCount: 0,
  addToCart: () => {},
})

export default CartContext

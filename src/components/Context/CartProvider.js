import React, {useState, useEffect} from 'react'
import CartContext from './CartContext'

const CartProvider = ({children}) => {
  const [cart, setCart] = useState(null)

  const addToCart = (productId, quantity) => {
    let cart =  JSON.parse(localStorage.getItem('cart'))

    if(!cart) {
      cart = {items:[]}
    }

    console.log(cart)

    const existingProduct = cart.items.find(item => item.id === productId)

    if (existingProduct) {
      existingProduct.quantity += quantity;
    }
    else {
      cart.items.push({
        id: productId,
        quantity
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

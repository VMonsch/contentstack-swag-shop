import React, {useState, useEffect} from 'react'
import CartContext from './CartContext'

const CartProvider = ({children}) => {
  const [cart, setCart] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  if(!cart) {
    if(!localStorage.getItem('cart')) {
      setCart({items:[]})
    }
    else {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
  }

  const addToCart = (productId, quantity) => {
    const existingProduct = cart.items.find(item => item.id === productId)
    quantity = Number(quantity)

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

    setCartCount(cartCount + quantity)
    console.log(cartCount)
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

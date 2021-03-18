import React, {useState, useEffect} from 'react'
import CartContext from './CartContext'

const CartProvider = ({children}) => {
  const [cart, setCart] = useState({items: []})
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
  }, [])

  const addToCart = (product, quantity) => {
    const existingProduct = cart.items.find(item => item.id === product.id)
    quantity = Number(quantity)

    if (existingProduct) {
      existingProduct.quantity += quantity
    } else {
      cart.items.push({
        id: product.id,
        quantity,
        title: product.title,
        price: product.price,
        image: product.image,
        url: product.url,
      })
    }

    saveCart()

    setCartCount(cartCount + quantity)
  }

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
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

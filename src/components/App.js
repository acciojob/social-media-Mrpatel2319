// App.js
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999.99, quantity: 10 },
    { id: 2, name: 'Smartphone', price: 599.99, quantity: 15 },
    { id: 3, name: 'Headphones', price: 199.99, quantity: 20 }
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingCartItem = cart.find(item => item.id === product.id);
    
    if (existingCartItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Reduce product inventory
    setProducts(products.map(p => 
      p.id === product.id 
        ? { ...p, quantity: p.quantity - 1 } 
        : p
    ));
  };

  const removeFromCart = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    
    // Restore product inventory
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, quantity: p.quantity + cartItem.quantity } 
        : p
    ));

    // Remove item from cart
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    const cartItem = cart.find(item => item.id === productId);
    const quantityDifference = newQuantity - cartItem.quantity;

    // Update cart item quantity
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));

    // Update product inventory
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, quantity: p.quantity - quantityDifference } 
        : p
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="App" data-testid="app">
      <header>
        <h1>Shopping Cart</h1>
      </header>
      
      <div className="container">
        <ProductList 
          products={products} 
          onAddToCart={addToCart} 
        />
        
        <Cart 
          cartItems={cart}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartItemQuantity}
          total={calculateTotal()}
        />
      </div>
    </div>
  );
}

export default App;

// ProductList.js
import React from 'react';

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-list" data-testid="product-list">
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} className="product-item" data-testid={`product-${product.id}`}>
          <span>{product.name}</span>
          <span>${product.price}</span>
          <span>Stock: {product.quantity}</span>
          <button 
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
            data-testid={`add-to-cart-${product.id}`}
          <span class="ml-2" /><span class="inline-block w-3 h-3 rounded-full bg-neutral-a12 align-middle mb-[0.1rem]" />

import { useState, useEffect } from 'react';
import { CartItem, Product } from 'shared-types';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleAddToCart = (event: CustomEvent<Product>) => {
      const product = event.detail;
      
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === product.productId);
        
        if (existingItem) {
          return prevItems.map(item =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    };

    window.addEventListener('addToCart', handleAddToCart as EventListener);
    
    return () => {
      window.removeEventListener('addToCart', handleAddToCart as EventListener);
    };
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-app">
      <h2>Shopping Cart ({getTotalItems()} items)</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <div className="item-info">
                  <h4>{item.productName}</h4>
                  <p className="item-price">${item.price.toFixed(2)} each</p>
                </div>
                <div className="item-quantity">
                  <span>Qty: {item.quantity}</span>
                  <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
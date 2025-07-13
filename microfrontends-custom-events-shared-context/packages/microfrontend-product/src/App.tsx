import { Product } from 'shared-types';
import './App.css';

const products: Product[] = [
  {
    productId: 'prod-001',
    productName: 'Wireless Mouse',
    price: 29.99
  },
  {
    productId: 'prod-002',
    productName: 'Mechanical Keyboard',
    price: 89.99
  }
];

function App() {
  const handleAddToCart = (product: Product) => {
    const event = new CustomEvent('addToCart', {
      detail: product
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="product-app">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.productId} className="product-card">
            <h3>{product.productName}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
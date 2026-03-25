import { useState } from 'react'
import Logo from './assets/image-1.jpg'
import './styles.css'

const fruits = [
  {id: 1, text: "Apple", price: 1.99, emoji: "🍎"},
  {id: 2, text: "Orange", price: 2.49, emoji: "🍊"},
  {id: 3, text: "Mango", price: 3.99, emoji: "🥭"},
  {id: 4, text: "Pear", price: 2.29, emoji: "🍐"},
  {id: 5, text: "Lemon", price: 1.49, emoji: "🍋"},
  {id: 6, text: "Banana", price: 0.99, emoji: "🍌"},
  {id: 7, text: "Strawberry", price: 4.99, emoji: "🍓"},
  {id: 8, text: "Grapes", price: 3.49, emoji: "🍇"},
  {id: 9, text: "Watermelon", price: 5.99, emoji: "🍉"},
  {id: 10, text: "Pineapple", price: 3.99, emoji: "🍍"},
  {id: 11, text: "Cherry", price: 4.49, emoji: "🍒"},
  {id: 12, text: "Peach", price: 2.79, emoji: "🍑"},
  {id: 13, text: "Kiwi", price: 1.29, emoji: "🥝"},
  {id: 14, text: "Blueberry", price: 3.99, emoji: "🫐"},
  {id: 15, text: "Raspberry", price: 4.29, emoji: "🫒"},
  {id: 16, text: "Coconut", price: 2.99, emoji: "🥥"},
  {id: 17, text: "Avocado", price: 1.79, emoji: "🥑"},
  {id: 18, text: "Plum", price: 1.99, emoji: "🟣"},
  {id: 19, text: "Pomegranate", price: 3.29, emoji: "🍎"},
  {id: 20, text: "Fig", price: 2.49, emoji: "🟤"}
];

function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div className="menu">
      <button onClick={() => setIsOpen(!isOpen)}>☰ Menu</button>
      {isOpen && (
        <ul>
          <li><button>📊 Dashboard</button></li>
          <li><button>👤 Profile</button></li>
          <li><button>⚙️ Settings</button></li>
          <li><button>🔓 Logout</button></li>
        </ul>
      )}
    </div>
  );
}

// Cart Component - defined BEFORE App component
function Cart({ cart, updateQuantity, removeFromCart, cartTotal, setIsCartOpen, isCartOpen }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="cart-sidebar">
      <button className="cart-toggle" onClick={() => setIsCartOpen(!isCartOpen)}>
        🛒 Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>
      
      {isCartOpen && (
        <div className="cart-dropdown">
          <h3>Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-emoji">{item.emoji}</span>
                    <span className="cart-name">{item.text}</span>
                    <span className="cart-price">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="cart-quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="cart-quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              
              <div className="cart-total">
                <strong>Total: ${cartTotal.toFixed(2)}</strong>
              </div>
              <button className="checkout-btn">Checkout</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredFruits = fruits.filter(fruit =>
    fruit.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add item to cart with quantity
  const addToCart = (fruit) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === fruit.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevCart.map(item =>
          item.id === fruit.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add with quantity 1
        return [...prevCart, { ...fruit, quantity: 1 }];
      }
    });
  };

  // Update quantity for a specific item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item if quantity becomes 0 or negative
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Remove item completely from cart
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (
    <>
      <div className='header'>
        <div className='header-left'>
          <MenuButton/>
        
        <div className='logo-container'>
          <a href="https://e-market.com" target="_blank" rel="noopener noreferrer">
            <img src={Logo} className="logo" alt="Market logo" />
          </a>
        </div>
        
        <h1>E-Fruit Market</h1>
        </div>
        <div className='search-container'>
          <input 
            type="text"
            placeholder="Search fruit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                alert("Search has been cleared");
              }}
              aria-label="Clear search"
              className="clear-btn"
            >
              Clear
            </button>
          )}
        </div>
        
        {/* Cart Component */}
        <Cart 
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          cartTotal={cartTotal}
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
        />
      </div>
      
      {/* Search Results */}
      {searchTerm && (
        <div className="search-results-container">
          {filteredFruits.length > 0 ? (
            <>
              <h3>Search Results ({filteredFruits.length} fruits found)</h3>
              <ul className="search-results">
                {filteredFruits.map(fruit => (
                  <li key={fruit.id}>{fruit.text} {fruit.emoji}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="no-results">No fruit found for "{searchTerm}"</p>
          )}
        </div>
      )}
      
      {/* Fruits Grid */}
      <div className="fruits-section">
        <h2>Available Fruits</h2>
        <div className='fruits-container'>
          {fruits.map(fruit => (
            <div key={fruit.id} className="grid-item">
              <div className="fruit-emoji">{fruit.emoji}</div>
              <div className="fruit-name">{fruit.text}</div>
              <div className="fruit-price">${fruit.price.toFixed(2)}/Kg</div>
              <button 
                className="buy-fruit"
                onClick={() => addToCart(fruit)}
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
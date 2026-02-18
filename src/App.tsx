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
];
function MenuButton (){
const [isOpen, setIsOpen]= useState(false);
  return(
    <div className="menu">
      <button onClick={()=>setIsOpen(!isOpen)}>☰ Menu</button>
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
function App() {
  const [searchTerm,setSearchTerm]=useState("");
  const [cartCount, setCartCount] = useState(0);


  const filteredFruits =fruits.filter(fruit =>fruit.text.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <>
      <div className='line'>
        <div className='header-left'>
        <MenuButton/>
        </div>
        <div>
        <a href="https://e-market.com" target="_blank">
          <img src={Logo} className="logo" alt="Market logo" />
        </a>
        </div>
        
        <h1>E-Fruit Market</h1>
        
        
  <div className='search'>
  <input 
          type="text"
          placeholder="Search fruit..."
          value={searchTerm}
          onChange={(e) =>setSearchTerm(e.target.value)}
        
        />
      
          {
        searchTerm && (
          <button
          onClick= { () => {setSearchTerm("");
           alert("Search has been cleared"); 
          }}
          arial-label="Clear search"
          >Clear
            </button>
        ) }
       
        
                  {searchTerm && (
            filteredFruits.length > 0 ? (
              <ul className="search-results">
                {filteredFruits.map(fruit => (
                  <li key={fruit.id}>{fruit.text}</li>
                ))}

        </ul>
        ):(
        <p>No fruit found for"{searchTerm}"</p>
        )     
     ) }
        </div>
      </div>
       <div>
  <h2>Available Fruits</h2>
  
  <div className='fruits-container'>
        {fruits.map(fruit => (
          <div key={fruit.id} className="grid-item">
            <div className="fruit-emoji">{fruit.emoji}</div>
            <div  className="fruit-name">{fruit.text}</div>
            <div className="fruit-price">${fruit.price.toFixed(2)}/Kg</div>
            <div > <button className="buy-fruit">Buy Now</button></div>
          </div>
        ))}
        </div>
</div>
     </>
)};

export default App

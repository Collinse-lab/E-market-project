import { useState } from 'react'
import Logo from './assets/image-1.jpg'
import './styles.css'



const fruits = [
  {id:1,text:"Apple"},
  {id:2,text:"Orange"},
  {id:3,text:"Mango"},
  {id:4,text:"Pear"},
  {id:5,text:"Lemon"},
];
function App() {
  const [count, setCount] = useState(0);
  const [searchTerm,setSearchTerm]=useState("");
    

  const filteredFruits =fruits.filter(fruit =>fruit.text.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <>
      <div className='line'>
        <div>
        <MenuButton/>
        </div>
        <div>
        <a href="https://e-market.com" target="_blank">
          <img src={Logo} className="logo" alt="Market logo" />
        </a>
        </div>
        <h1>E-Market</h1>
        
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
          onClick= { () =>setSearchTerm("")}
          arial-label="Clear search"
          >x
            </button>
        ) }
        
        {searchTerm &&(
          filteredFruits.length > 0 ?(
             
        <ul>
          {filteredFruits.map(fruit =>(
            <li key="fruit.id">{fruit.text}</li>
          ))}
        </ul>
        ):(
        <p>No fruit found for"{searchTerm}"</p>
        )     
        )}
        </div>
      </div>

      <div className="card">
        <button className="button"onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the logo to learn more
      </p>
    </>
  )
}
function MenuButton (){
const [isOpen, setIsOpen]= useState(false);
  return(
    <div className="menu">
      <button onClick={()=>setIsOpen(!isOpen)}>Menu</button>
      {isOpen && (
        <ul>
        <li><button>Dashboard</button></li>
        <li><button>Profile</button></li>
        <li><button>Settings</button></li>
        <li><button>Logout</button></li>
        </ul>
      )}
    </div>
  );
}

export default App

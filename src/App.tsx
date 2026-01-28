import { useState } from 'react'
import Logo from './assets/image-1.jpg'
import './styles.css'



const products = [
  {id:1,text:"Apple"},
  {id:2,text:"Oranges"},
  {id:3,text:"Mangoes"},
  {id:4,text:"Pears"},
  {id:5,text:"Lemon"},
];
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='line'>
        <a href="https://e-market.com" target="_blank">
          <img src={Logo} className="logo" alt="Market logo" />
        </a>
        <h1>E-Market</h1>
        
  <input
          type="text"
          placeholder="Search items..."
        />
       
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
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

export default App

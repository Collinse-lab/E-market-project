import { useState } from 'react'
import Logo from './assets/image-1.jpg'
import './styles.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://e-market.com" target="_blank">
          <img src={Logo} className="logo" alt="Market logo" />
        </a>
      </div>
      <h1>E-Market</h1>
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

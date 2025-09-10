import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/Signup/Signup.jsx'
import RegisterForm from './components/Signup/Signup.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);
  

  


  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App

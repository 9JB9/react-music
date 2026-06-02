import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './css/App.css'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './Pages/Home.jsx'
import Favorites from './Pages/Favorites.jsx'

function App() {
  

  return (
    <>
      <header>
        <NavBar /> {/* what happens when i don't want to have this here... we could use JS to conditionally control when it renders */}
      </header>
      <main>
        <Routes>
          <Route path = '/' element = {<Home />}/>
          <Route path = '/favorites' element = {<Favorites />} />
        </Routes>
      </main>
      
    </>
  )
}

export default App

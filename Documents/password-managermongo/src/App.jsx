import { useState } from 'react'
import Nav from './Components/Nav'
import './App.css'
import Manager from './Components/Manager'
import Footer from './Components/Footer'

function App() {
  
  return (
    <div>
     <Nav></Nav>
     <div className='min-h-[87vh] items-center'><Manager></Manager></div>
     
     <Footer></Footer>
    </div>
  )
}

export default App

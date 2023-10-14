import { useState } from 'react'
import Search from './components/Search'

import './App.css'
import CartWidget from './components/cartWidget/cartWidget'


function App() {
  

  return (
    <>
    <div>
      <CartWidget></CartWidget>
      <Search></Search>
    </div>
      
    </>
  )
}

export default App

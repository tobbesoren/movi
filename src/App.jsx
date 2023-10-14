import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './components/Search'

import './App.css'
import CartWidget from './components/cartWidget/cartWidget'
import { ShoppingCart } from './components/shoppingCart/shoppingCart'


function App() {
  

  return (
    <>
    <BrowserRouter>
      <div>
        <CartWidget></CartWidget>
        <Routes>
          <Route
            path="/"
            element={<Search />}
          />
          <Route
            path="/cart"
            element={<ShoppingCart />}
          />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App

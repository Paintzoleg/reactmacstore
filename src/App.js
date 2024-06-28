import React  from 'react'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart.jsx'
import FullProduct from './pages/FullProduct.jsx'
import NotFound from './pages/NotFound.jsx'
import MainLayout from './layouts/MainLayout'

function App() {
  return (   
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<FullProduct />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
  )
}

export default App

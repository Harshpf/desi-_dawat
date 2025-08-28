import { useState } from 'react'

import './App.css'
import { Landing } from './pages/Landing'
import { Routes , Route } from 'react-router-dom'
import Allproduct from './Components/Allproduct';
import { Fotter } from './Components/Fotter';
import { Header } from './Components/Header'
import ScrollToTop from './Components/ScrollToTop';
import { Specialpro } from './Components/Specialpro';
import { Login } from './Components/Login';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';



function App() {


  return (
    <>

         <Header/>
         <ScrollToTop /> {/* ensures top scroll on route change */}


      <Routes>
        <Route path = "/" element= {<Landing/>}/>
        <Route path = "/allproduct" element= {<Allproduct/>}/>
        <Route path = "/special" element= {<Specialpro/>}/>
        <Route path = "/login" element= {<Login/>}/>
        <Route path = "/cart" element= {<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>} />

        
      </Routes>

      <Fotter/>

      
      
    </>
  )
}

export default App

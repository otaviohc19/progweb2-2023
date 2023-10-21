import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home/Home";
import Contato from "./pages/Contato/Contato";
import NoAr from './pages/NoAr/NoAr';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/noar' element={<NoAr />} />
          <Route path='/contato' element={<Contato />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

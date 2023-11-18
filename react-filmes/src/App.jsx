import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home/Home";
import NoAr from "./pages/NoAr/Noar";
import Contato from "./pages/Contato/Contato";
import Filme from "./pages/Filme/Filme";
import Login from './pages/Login/Login';
import CriarConta from './pages/CriarConta/CriaConta';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/noar' element={<NoAr />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/filme/:id' element={<Filme />} />
          <Route path='/criarconta' element={<CriarConta />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

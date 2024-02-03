import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Player from './pages/Player'
import UploadFiles from './pages/UploadFiles'

export default function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Player />} />
          <Route path='/Upload' element={<UploadFiles />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
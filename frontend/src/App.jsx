import { useState } from 'react'
import { Route ,Routes } from 'react-router-dom'
import Home from './assets/Pages/HomePage'
import CreateJob from './assets/Pages/CreateJob'
import Board from './assets/Pages/Board/Board'
import './App.css'
import JobDetails from './assets/Pages/Board/JobDetails'  
import Analytics from './assets/Pages/Analytics'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreateJob/>}/>
        <Route path='/board' element={<Board/>}/>
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>

    </>
  )
}

export default App

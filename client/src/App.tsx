import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Header from './components/Header'
import Timer from './components/Timer'

function App() {

  return (
    <div className="App">
        <Header/>
        <Timer/>
    </div>
  )
}

export default App

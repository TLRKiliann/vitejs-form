import { useState } from 'react'
import FormDemo from './components/FormDemo'
import YupComponent from './components/YupComponent'
import ZodComponent from './components/ZodComponent'
import './App.css'

function App() {

  return (
    <div className="App">
      <FormDemo />
      <YupComponent />
      <ZodComponent />
    </div>
  )
}

export default App

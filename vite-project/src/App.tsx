import { useState } from 'react'
import FormDemo from './components/FormDemo'
import YupComponent from './components/YupComponent'
import ZodComponent from './components/ZodComponent'
import './App.css'

function App() {

  const [state, setState] = useState<boolean>({
    firstComp: false,
    secondComp: false,
    thirdComp: false,
  });

  const handleFirst = () => {
    setState({...state, firstComp: !state.firstComp})
  }

  const handleSecond = () => {
    setState({...state, secondComp: !state.secondComp})
  }

  const handleThird = () => {
    setState({...state, thirdComp: !state.thirdComp})
  }

  return (
    <div className="App">
      <h1>React-Hook-Form</h1>
      {state.firstComp === true ? (
        <FormDemo />
      ) : (
        null
      )}
      <button className="btn" type="button" onClick={handleFirst}>Form with all stuff</button>

      {state.secondComp === true ? (
        <YupComponent />
      ) : (
        null
      )}
      <button className="btn" type="button" onClick={handleSecond}>Yup</button>

      {state.thirdComp === true ? (
        <ZodComponent />
      ) : (
        null
      )}
      <button className="btn" type="button" onClick={handleThird}>Zod</button>

    </div>
  )
}

export default App

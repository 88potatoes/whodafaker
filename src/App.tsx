// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div><h2>WhoDaFaker</h2></div>
      <div className="container row gx-3">
        <Card word="eric"/>
        <Card word="victor"/>
        <Card word="josher"/>
      </div>
    </>
  )
}

export default App

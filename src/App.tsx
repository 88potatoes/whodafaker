// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CardGrid from './CardGrid'

function App() {
  // const [count, setCount] = useState(0)
  const words: string[] = ['josher', 'tyana', 'jerri'];
  return (
    <>
      <div><h2>WhoDaFaker</h2></div>
      <CardGrid items={words}/>
    </>
  )
}

export default App

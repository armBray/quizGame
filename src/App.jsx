import { useState } from 'react'
import './App.css'
import StartPage from './components/StartPage'
import Questionaire from './components/Questionaire'

function App() {
  const [page,setPage] = useState("start")

  function handleChangePage(){
    setPage( prev => {
      if(prev === "start") return "first"
      else if (prev === "first") return "start"
    })
  }

  return (
    <div className='container'>
      <div className="blob blob-right"></div>
      <div className="blob blob-left"></div>
      {page === "start" ?  
        <StartPage handleChangePage={handleChangePage}/> 
        : 
        <Questionaire handleChangePage={handleChangePage}/>
      }
    </div>
  )
}

export default App

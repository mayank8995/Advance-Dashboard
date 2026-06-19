import { useState } from 'react'
import './App.css'

import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'



function App() {

  const [show , setShow] = useState<boolean>(true);


  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/background.png')" }}
      /> 
      <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[80%] md:-translate-x-1/2 w-full max-w-md px-4" > 
        {show ? <Login onCustomEvent={(flag:boolean) => setShow(flag)}/> : <Signup onCustomEvent={() => setShow((flag) => !flag)}/>}
        
      </div>     
    </div>
  )
}

export default App

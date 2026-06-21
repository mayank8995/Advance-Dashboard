import { useState } from 'react'
import './App.css'

import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'



function App() {

  const [show , setShow] = useState<boolean>(true);


  return (
     <div className="overflow-hidden">
            <div className="absolute z-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[80%] md:-translate-x-1/2 w-full max-w-md px-4" > 
            {show ? <Login onCustomEvent={(flag:boolean) => setShow(flag)}/> : <Signup onCustomEvent={() => setShow((flag) => !flag)}/>}
            
              </div>  
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[#7c3aed]/20 blur-3xl rounded-full" />
      </div>
  )
}

export default App

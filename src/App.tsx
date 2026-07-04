import { useState } from 'react'
import './App.css'

import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { CheckCircle } from 'lucide-react';



function App() {

  const [show , setShow] = useState<boolean>(true);


  return (
    <>
     <div className="h-screen max-h-full relative">
       
            <div className={`absolute z-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 `} > 
            {/* {show ? <Login onCustomEvent={(flag:boolean) => setShow(flag)}/> : <Signup onCustomEvent={() => setShow((flag) => !flag)}/>} */}
            <div className={`flex flex-1 flex-col md:flex-row justify-evenly items-center transition-opacity duration-300`}>
              <div className="hidden md:flex flex-col justify-center gap-6 p-12">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg " >
                  <img src={'/hr_portal_logo_svg_transparent.svg'} className="w-full h-full object-cover"/>
                </div>
                        <span className="text-xl font-bold text-white">HR Portal</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white leading-tight">
                        Manage your entire workforce, in one place.
                      </h2>
                      <p className="text-slate-400 text-sm">
                        Track performance, and analytics — all from a single dashboard.
                      </p>
                      <div className="flex flex-col gap-3 mt-4">
                        {['Analytics', 'Employee performance tracking', 'Centralized directory'].map((f) => (
                          <div key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                            <CheckCircle size={16} className="text-[#534ab7]" />
                            {f}
                          </div>
                        ))}
                      </div>
              </div>
              <div className="flex md:hidden flex-col items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg " >
                  <img src={'/hr_portal_logo_svg_transparent.svg'} className="w-full h-full object-cover"/>
                </div>
                <span className="text-lg font-bold text-white">HR Portal</span>
              </div>
             {show ?  <Login onCustomEvent={(flag: boolean) => setShow(flag)} /> :
              <Signup onCustomEvent={() => setShow((flag) => !flag)} />}
            </div>
            </div>  
            <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-indigo-950 to-purple-950" />
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[#7c3aed]/20 blur-3xl rounded-full" /> 
      </div>
            </>
  )
}

export default App

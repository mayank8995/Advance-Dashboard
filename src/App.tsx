import {  RouterProvider } from 'react-router-dom';
import './App.css'

import Login from './pages/login/Login'



function App() {

  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/background.png')" }}
      /> 
      <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[80%] md:-translate-x-1/2 w-full max-w-md px-4" > 
        <Login/>
      </div>     
    </div>
  )
}

export default App

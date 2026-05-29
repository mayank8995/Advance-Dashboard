import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import Employees from './pages/employee/Employees.tsx'


createRoot(document.getElementById('root')!).render(
      // <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='home' element={<Home/>}>
        <Route path='dashboard' element={<Dashboard/>}></Route>
        <Route path='employees' element={<Employees/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  //  </StrictMode> 
)

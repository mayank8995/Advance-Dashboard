import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home/Home.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import Employees from './pages/employee/Employees.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Analytics from './pages/analytics/Analytics.tsx'
import Settings from './pages/settings/Settings.tsx'
import ViewMore from './components/ViewMore/ViewMore.tsx'
import { DashboardRoot } from './pages/dashboard/DashboardRoot.tsx'


const queryClient = new QueryClient();
// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
      import('@tanstack/query-core')
        .QueryClient
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'home',
    element: <Home />,
    handle: { breadcrumb: 'Home' },
    children:[
   {
    path: 'dashboard',
    element: <DashboardRoot />,
      handle: { breadcrumb: 'Dashboard' },
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'viewmore',
        element: <ViewMore />,
        handle: { breadcrumb: 'View More' }
      }
    ]
  },
   {
    path: 'employees',
    element: <Employees />,
    handle: { breadcrumb: 'Employees' }
  }, {
    path: 'analytics',
    element: <Analytics />,
    handle: { breadcrumb: 'Analytics' }
  }, {
    path: 'settings',
    element: <Settings />,
    handle: { breadcrumb: 'Settings' }
  }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
      <StrictMode>
      <QueryClientProvider client = {queryClient}>

    {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='home' element={<Home/>}>
       <Route path='dashboard' element={<DashboardRoot/>}>
           <Route path='' element={<Dashboard/>} />
        <Route path='viewmore' element={<ViewMore/>}/>
        </Route>
        <Route path='employees' element={<Employees/>}></Route>
        <Route path='analytics' element={<Analytics/>}></Route>
        <Route path='settings' element={<Settings/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter> */}
    <RouterProvider router={router}>

    </RouterProvider>
    <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

    </StrictMode> 
)

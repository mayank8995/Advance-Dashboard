import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home/Home.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import Employees from './pages/employee/Employees.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
          <RouterProvider router={router} />
          </QueryClientProvider>
      </StrictMode> 
)

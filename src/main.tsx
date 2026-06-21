import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext.tsx'
import { ProtectedRoute } from './pages/protected-routes/ProtectedRoutes.tsx'
const Home = React.lazy(() => import('./components/Home/Home.tsx'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard.tsx'));
const Employees = React.lazy(() => import('./pages/employee/Employees.tsx'));
const Analytics = React.lazy(() => import('./pages/analytics/Analytics.tsx'));
const Settings = React.lazy(() => import('./pages/profile-settings/ProfileSettings.tsx'));
const ViewMore = React.lazy(() => import('./components/ViewMore/ViewMore.tsx'));
const DashboardRoot = React.lazy(() => import('./pages/dashboard/DashboardRoot.tsx'));


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
    path: '',
    element: <ProtectedRoute />,
    children:[
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
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
      <StrictMode>
          <QueryClientProvider client = {queryClient}>
            <ToastContainer />
            <AuthProvider>
          <RouterProvider router={router} />
           </AuthProvider>
          </QueryClientProvider>
      </StrictMode> 
)

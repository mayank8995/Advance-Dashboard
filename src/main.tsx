import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext.tsx';
import { ProtectedRoute } from './pages/protected-routes/ProtectedRoutes.tsx';
import { LoaderFlagProvider } from './context/Loadercontext.tsx';
import ErrorBoundaryPage from './components/Error/ErrorBoundaryPage.tsx';
import { ModalProvider } from './context/ModalContext.tsx';
const Home = React.lazy(() => import('./components/Home/Home.tsx'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard.tsx'));
const Employees = React.lazy(() => import('./pages/employee/Employees.tsx'));
const Analytics = React.lazy(() => import('./pages/analytics/Analytics.tsx'));
const Settings = React.lazy(
  () => import('./pages/profile-settings/ProfileSettings.tsx')
);
const ViewMore = React.lazy(() => import('./components/ViewMore/ViewMore.tsx'));
const DashboardRoot = React.lazy(
  () => import('./pages/dashboard/DashboardRoot.tsx')
);

const queryClient = new QueryClient();
// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    path: '',
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: '/home',
        element: <Home />,
        errorElement: <ErrorBoundaryPage />,
        handle: { breadcrumb: 'Home' },
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardRoot />,
            handle: { breadcrumb: 'Dashboard' },
            children: [
              {
                path: '',
                element: <Dashboard />,
              },
              {
                path: 'viewmore',
                element: <ViewMore />,
                handle: { breadcrumb: 'View More' },
              },
            ],
          },
          {
            path: 'employees',
            element: <Employees />,
            handle: { breadcrumb: 'Employees' },
          },
          {
            path: 'analytics',
            element: <Analytics />,
            handle: { breadcrumb: 'Analytics' },
          },
          {
            path: 'settings',
            element: <Settings />,
            handle: { breadcrumb: 'Settings' },
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <ToastContainer autoClose={1000} />
          <LoaderFlagProvider>
            <RouterProvider router={router} />
          </LoaderFlagProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

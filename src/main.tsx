import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.tsx'
import { ServerProvider } from './context/ServerProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotProtectedRoute from './components/NotProtectedRoute/index.tsx'
import ProtectedRoute from './components/ProtectedRoute/index.tsx'
import Register from './pages/Register.tsx'
import Home from './pages/Home.tsx'
import { AuthProvider } from './context/AuthContext.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  {
    path: "/login",
    element: <NotProtectedRoute><Login /></NotProtectedRoute>,
  },
  {
    path: "/register",
    element: <NotProtectedRoute><Register /></NotProtectedRoute>,
  },
]);

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ServerProvider>
          <RouterProvider router={router}/> 
        </ServerProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProvider from './Provider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SearchProvider } from './hooks/useSearch';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" reverseOrder={false}></Toaster>
          </HelmetProvider>
        </QueryClientProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>,
)

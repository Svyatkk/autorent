import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import QueryProdiver from './providers/queryProvide.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProdiver>
      <RouterProvider router={router} />
    </QueryProdiver>
  </React.StrictMode>,
)
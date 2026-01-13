import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './routes/Error/Error.tsx'
import SmProjeto from './routes/SmProjeto/index.tsx'
import Login from './routes/Login/index.tsx'


const router = createBrowserRouter([
  {
    path: "/", element: <App />, errorElement: <Error/>, children: [
      {path:"/", element:<SmProjeto/>}, 
      {path:"/login", element:<Login/> }, 
    ]

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

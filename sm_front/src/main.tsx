import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Error from './routes/Error/Error.tsx'
import SmProjeto from './routes/SmProjeto.tsx'

const router = createBrowserRouter([
  {
    path: "/", element: <App />, errorElement: <Error/>, children: [
      {path:"/", element:<SmProjeto/>}
    ]

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

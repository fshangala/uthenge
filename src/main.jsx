import React from 'react'
import ReactDOM from 'react-dom/client'
import 'primereact/resources/themes/lara-dark-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './main.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import Root from './routes/root'
import UserProvider from './contexts/user_context'
import SignUp from './routes/auth/signup'
import Login from './routes/auth/login'
import Profile from './routes/auth/profile'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Root />,
    children: [
      {
        path:'signup/',
        element:<SignUp />
      },
      {
        path:'login/',
        element:<Login />
      },
      {
        path:'profile/',
        element:<Profile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)

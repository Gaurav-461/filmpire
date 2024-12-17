import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { Actors, MovieInformation, Profile, Movies, PageNotFound } from './components/index.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Movies />,
      },
      {
        path: "/movie/:id?",
        element: <MovieInformation />,
      },
      {
        path: "/actor/:id?",
        element: <Actors />,
      },
      {
        path: "/profile/:id?",
        element: <Profile />,
      },
      {
        path: '*',
        element: <PageNotFound />
      }
    ]
  },
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Actors, MovieInformation, Movies, Profile } from './components/index.js'
import PageNotFound from './components/PageNotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <> <App /> <Movies /> </>,
    children: [
      {
        path: "movie/:id?",
        element: <MovieInformation />,
      },
      {
        path: "actor/:id?",
        element: <Actors />,
      },
      {
        path: "profile/:id?",
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

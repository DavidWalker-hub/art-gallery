import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    element: <div>Home Page</div>,
    children: [
      // {
      //   index: true,
      //   element: <HomeScreen />,
      // },
     
    ],
  },
  // {
  //   path: "*",
  //   element: <Root />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)

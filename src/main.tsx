import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Root } from "./routes/Root";
import { ThemeProvider } from "@emotion/react";
import theme from "./lib/theme";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    element: <Root />,
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

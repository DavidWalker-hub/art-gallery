import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Root } from "./routes/Root";
import { ThemeProvider } from "@emotion/react";
import theme from "./lib/theme";
import { Home } from "./routes/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { Detail } from "./routes/Detail";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detail/:imageId",
        element: <Detail />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Root />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

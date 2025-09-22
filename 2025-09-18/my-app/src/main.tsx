import React from "react"
import ReactDOM from "react-dom/client"
import { createHashRouter, RouterProvider } from "react-router-dom"
import "./index.css"

import Something from "./pages/Something"
import About from "./pages/About"
import RootLayout from "./components/RootLayout"
import Home from "./pages/Home"

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "something", element: <Something /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

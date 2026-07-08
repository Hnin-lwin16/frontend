import { createBrowserRouter } from "react-router-dom"
import Home from "./components/common/Home"
import Shop from "./components/common/Shop"

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  }
])

export default router
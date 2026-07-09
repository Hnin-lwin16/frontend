import { createBrowserRouter } from "react-router-dom"
import Home from "./components/Home"
import Shop from "./components/Shop"
import Layout from "./components/common/Layout"
import Product from "./components/Product"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"

const router = createBrowserRouter([
 {
  path: "/",
  element:<Layout/>,
  children:[
     { 
   index: true,
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/product",
    element: <Product/>,
  },
  {
    path:"/cart",
    element:<Cart/>
  },
  {
    path:"/checkout",
    element:<Checkout/>
  }
  ]
 }
])

export default router
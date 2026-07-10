import { createBrowserRouter } from "react-router-dom"
import Home from "./components/Home"
import Shop from "./components/Shop"
import Layout from "./components/common/Layout"
import Product from "./components/Product"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import Login from "./components/admin/Login"
import Dashboard from "./components/admin/Dashboard"
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth"



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
  },
  {
    path:"/admin/login",
    element: <Login/>
  },
  {
    path:"/admin/dashboard",
    element:<AdminRequireAuth/>,
    children:[
      {
       index:true,
       element:<Dashboard/>
      }
    ]
  }
  ]
 }
])

export default router
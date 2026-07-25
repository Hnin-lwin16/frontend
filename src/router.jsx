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
import CategoryShow from "./components/admin/category/Show";
import CategoryCreate from "./components/admin/category/Create";
import CategoryEdit from "./components/admin/category/Edit";
import BrandShow from "./components/admin/brand/Show";
import BrandCreate from "./components/admin/brand/Create";
import BrandEdit from "./components/admin/product/Edit";
import ProductShow from "./components/admin/product/Show";
import ProductCreate from "./components/admin/product/Create";
import ProductEdit from "./components/admin/product/Edit"


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
    path: "/product/:id",
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
  },
   {
    path:"/admin/categories",
    element:<AdminRequireAuth/>,
    children:[
      {
       index:true,
       element:<CategoryShow/>
      },
      {
        path:"create",
        element:<CategoryCreate/>
      },
      {
        path:"edit/:id",
        element:<CategoryEdit/>
      }
    ]
  },
  {
    path:"/admin/brands",
    element:<AdminRequireAuth/>,
    children:[
      {
       index:true,
       element:<BrandShow/>
      },
      {
        path:"create",
        element:<BrandCreate/>
      },
      {
        path:"edit/:id",
        element:<BrandEdit/>
      }
    ]
  },
   {
    path:"/admin/products",
    element:<AdminRequireAuth/>,
    children:[
      {
       index:true,
       element:<ProductShow/>
      },
      {
        path:"create",
        element:<ProductCreate/>
      },
      {
        path:"edit/:id",
        element:<ProductEdit/>
      }
    ]
  }
  ]
 }
])

export default router
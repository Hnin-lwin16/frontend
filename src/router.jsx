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
import Register from "./components/Register"
import AccountLogin from "./components/Login"
import Profile from "./components/front/Profile"
import { RequireAuth } from "./components/RequireAuth"
import Confirmation from "./components/Confirmation"
import ShowOrders from "./components/admin/orders/ShowOrders"
import OrderDetail from "./components/admin/orders/OrderDetail"
import Orders from "./components/front/Orders"
import FrontOrderDetail from "./components/front/OrderDetail"
import Shipping from "./components/admin/shipping/Shipping"

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
    path:"/account/register",
    element: <Register/>
  },
  {
    path:"/account/login",
    element:<AccountLogin/>
  },
  {
    path:"/account",
    element:<Profile/>
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
  },
  {
    path:"/admin/shipping",
    element:<AdminRequireAuth/>,
    children:[
      {
       index:true,
       element:<Shipping/>
      }
    ]
  },
  {
    path:"/account",
    element:<RequireAuth/>,
    children:[
      {
       index:true,
       element:<Profile/>
      }
    ]
  },
  {
    path:"/checkout",
    element:<RequireAuth/>,
    children:[
      {
       index:true,
       element:<Checkout/>
      }
    ]
  },
   {
    path:"/order/confirmation/:id",
    element:<RequireAuth/>,
    children:[
      {
       index:true,
       element:<Confirmation/>
      }
    ]
  },{
    path:"/account/orders",
    element:<RequireAuth/>,
    children:[
      {
       index:true,
       element:<Orders/>
      },{
        path:"detail/:id",
        element:<FrontOrderDetail/>
      }
    ]
  },
  {
    path:"/admin/orders",
    element:<AdminRequireAuth/>,
    children:[
      {
       index:true,
       element:<ShowOrders/>
      },
     {
      path:":id",
      element:<OrderDetail/>
     }
    ]
  },
  ]
 }
])

export default router
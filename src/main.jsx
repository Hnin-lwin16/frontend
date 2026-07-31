import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.scss";
  import { ToastContainer, toast } from 'react-toastify';
import { AdminAuthProvider } from './components/context/AdminAuth.jsx'
import { CartProvider } from './components/context/Cart.jsx'

createRoot(document.getElementById('root')).render(
<>
  <AdminAuthProvider>

   <CartProvider>
     <RouterProvider router={router} />
   </CartProvider>
  </AdminAuthProvider>
<ToastContainer/>
</>
)

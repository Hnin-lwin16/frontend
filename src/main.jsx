import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.scss";
createRoot(document.getElementById('root')).render(
<>
  <RouterProvider router={router} />

</>
)

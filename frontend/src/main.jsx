import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import 'sweetalert2/src/sweetalert2.scss'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <AuthProvider><RouterProvider router={router} /></AuthProvider> 
  </Provider>,
)

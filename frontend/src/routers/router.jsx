import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckOut from "../pages/books/CheckOut";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./privateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import Dashboard from "../pages/dashboard/DashboardLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
             {
                path: "/orders",
                element: <PrivateRoute>
                    <OrderPage/>
                </PrivateRoute>,
            },
             {
                path: "/about",
                element: <h1>About</h1>,
            },

             {
                path: "/login",
                element:<Login/>,
            },

            {
                path: "/login",
                element:<Login/>,
            },

            {
                path: "/register",
                element:<Register/>,
            },
            {
                path: "/cart",
                element:<CartPage/>,
            },

            {
                path: "/checkout",
                element:<PrivateRoute><CheckOut/>
                </PrivateRoute>,
            },
            {
                path: "/books/:id",
                element: <SingleBook/>
            }
        ]
    },

    {
       path: "/dashboard",
       element:<AdminRoute><Dashboard/></AdminRoute>, 
       children:[
        {
        path: "",
        element: <AdminRoute><div>Dashboard Home</div></AdminRoute>
       },
    
       {
        path: "add-new-book",
        element: <AdminRoute><div>Add New Book</div></AdminRoute>
       },
       {
        path: "edit-book/:id",
        element: <AdminRoute><div>Edit Book</div></AdminRoute>
       },
       {
        path: "manage-book",
        element: <AdminRoute><div>Manage Book</div></AdminRoute>
       }
    ]
    },
    {
        path: "/admin",
        element: <AdminLogin/>
    },
    {
        
    }
]);

export default router;
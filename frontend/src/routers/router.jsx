import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckOut from "../pages/books/CheckOut";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ManageOrders from "../pages/dashboard/manageorders/ManageOrders";
import ManageAdmin from "../pages/dashboard/Admin/ManageAdmin";
import PrivacyPolicy from "../pages/home/PrivacyPolicy";
import TermsOfService from "../pages/home/TermsOfService";
import Contact from "../pages/home/Contact";
import About from "../pages/home/About";

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
                path: "/privacy",
                element: <PrivacyPolicy/>
            },
            {
                path: "/terms",
                element: <TermsOfService/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/about",
                element: <About/>
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
       element:<AdminRoute><DashboardLayout/></AdminRoute>, 
       children:[
        {
        path: "",
        element: <AdminRoute><Dashboard/></AdminRoute>
       },
    
       {
        path: "add-new-book",
        element: <AdminRoute><AddBook/></AdminRoute>
       },
       {
        path: "edit-book/:id",
        element: <AdminRoute><UpdateBook/></AdminRoute>
       },
       {
        path: "manage-books",
        element: <AdminRoute><ManageBooks/></AdminRoute>
       },
       {
            path: "manage-orders",
            element: <AdminRoute><ManageOrders/></AdminRoute>
        },

                {
            path: "manage-users",
            element: <AdminRoute><ManageAdmin/></AdminRoute>
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
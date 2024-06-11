import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import MemberShip from "../Pages/MemberShip/MemberShip";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Dashboard/UserDashbooard/MyProfile";
import AddPost from "../Pages/Dashboard/UserDashbooard/AddPost";
import MyPosts from "../Pages/Dashboard/UserDashbooard/MyPosts";
import ManageUsers from "../Pages/Dashboard/AdminDashBoard/ManageUsers";
import Activities from "../Pages/Dashboard/AdminDashBoard/Activities";
import MakeAnnouncement from "../Pages/Dashboard/AdminDashBoard/MakeAnnouncement";
import PostDetails from "../Pages/PostDetails";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>,
            loader:()=>fetch('http://localhost:5000/postsCount')
            
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/registration',
          element:<Register></Register>
        },
        {
          path:'/membership',
          element:<PrivateRoute><MemberShip></MemberShip></PrivateRoute>
        },
        {
          path:'/posts/:id',
          element:<PostDetails></PostDetails>
        }

      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        // User dashboard
        {
          path:'myProfile',
          element:<MyProfile></MyProfile>
        },
        {
          path:'addPost',
          element:<AddPost></AddPost>
        },
        {
          path:'myPosts',
          element:<MyPosts></MyPosts>
        },

        // Admin Dashboard
        {
          path:'adminProfile',
          element:<></>,
        },
        {
          path:'manageUsers',
          element:<ManageUsers></ManageUsers>
        },
        {
          path:'activities',
          element:<Activities></Activities>
        },
        {
          path:'makeAnnouncement',
          element:<MakeAnnouncement></MakeAnnouncement>
        }

      ]
    }
  ]);
  
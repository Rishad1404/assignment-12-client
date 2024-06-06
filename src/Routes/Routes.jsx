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

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
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
        }

      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
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
        }
      ]
    }
  ]);
  
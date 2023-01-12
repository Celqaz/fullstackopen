import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Blogs from "../components/Blogs";
import React from "react";
import Users from "../components/Users";
import User from "../components/User";
import BlogInfo from "../components/BlogInfo";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Blogs/>,
            },
            {
                path: "users",
                element: <Users/>
            },
            {
                path: "users/:id",
                element: <User/>
            },
            {
                path: "blogs/:id",
                element: <BlogInfo/>
            },
        ]
    }
]);

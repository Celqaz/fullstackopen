import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Blogs from "../components/Blogs";
import React from "react";
import Users from "../components/Users";


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
        ]
    }
]);

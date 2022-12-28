// routers
import {createBrowserRouter} from "react-router-dom";
import React from "react";
import App from "./App";
import Notes from "./components/Notes";
import Users from "./components/Users";
import Note from "./components/Note";

// const match = useMatch('/notes/:id')
// const note = match
//     ? notes.find(note => note.id === Number(match.params.id))
//     : null

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/notes/:id",
        element: <Note/>,
    },
    {
        path: "/notes",
        element: <Notes/>,
    },
    {
        path: "/users",
        element: <Users/>,
    },
]);

export default router

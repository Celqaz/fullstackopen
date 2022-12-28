import {createBrowserRouter} from "react-router-dom";
// components
import App from '../App'
import About from "../components/About";
import AnecdotesForm from "../components/AnecdotesForm";
import Anecdote from "../components/Anecdote";
import AnecdotesList from "../components/AnecdotesList";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children :[
            {
                index: true,
                element: <AnecdotesList/>,
            },
            {
                path: "about",
                element: <About/>,
            },
            {
                path: "anecdotes/:id",
                element: <Anecdote/>,
            },
            {
                path: "create",
                element: <AnecdotesForm/>,
            },
        ]
    },

]);

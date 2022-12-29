import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {initializeAnecdotes} from "./features/anecdotes/anecdotesSlice";
import Notification from "./components/Notification";
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

function App() {
    const dispatch = useAppDispatch()
    const notification = useAppSelector(state => state.notification)
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    return (
        <div>
            <h1>Software Anecdotes</h1>
            <Menu/>
            {/*notification 不为空时，才显示 通知内容*/}
            {notification && <Notification/>}
            {/*<AnecdotesList/>*/}
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default App;

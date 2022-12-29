import React from 'react';
import './App.css';
// routers
import { Link } from "react-router-dom";
function App() {
    return (
        <div>
            <div>
                <Link className={'nav_link'} to="/">home</Link>
                <Link className={'nav_link'} to="/notes">notes</Link>
                <Link className={'nav_link'} to="/users">users</Link>
            </div>
        </div>
    );
}

export default App;

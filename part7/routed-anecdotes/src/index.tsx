import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import './index.css';
// router
import {RouterProvider} from "react-router-dom";
import {router} from "./routers/router";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<h1>Software Anecdotes</h1>*/}
            {/*<Menu/>*/}
            <RouterProvider router={router}/>
            {/*<Footer/>*/}
        </Provider>
    </React.StrictMode>
);

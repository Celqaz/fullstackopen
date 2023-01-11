import React from 'react'
import ReactDOM from 'react-dom/client'
// redux
import {Provider} from "react-redux";
import store from '../src/app/store'
// router
// import route
import {RouterProvider} from "react-router-dom";
import {router} from './router/router'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

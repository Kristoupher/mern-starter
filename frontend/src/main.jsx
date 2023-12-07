import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx'
import './assets/styles/normalize.scss'
import './assets/styles/scss/main.scss'
import HomeScreen from "./screens/HomeScreen";
import {HelmetProvider} from "react-helmet-async";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} >
            <Route index={true} path={"/"} element={<HomeScreen />}  />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </HelmetProvider>
)
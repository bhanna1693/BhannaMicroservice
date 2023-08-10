import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/Error";
import {AboutPage} from "./pages/About";
import {HappyHourPage} from "./pages/happyhour";
import {PokemonPage} from "./pages/Pokemon";
import {SignInPage} from "./pages/auth/SignIn";
import {SignupPage} from "./pages/auth/SignUp";
import {HomePage} from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import {HappyHourDetailsPage} from "./pages/happyhour/[yelpId]";
import {HappyHourSearchPage} from "./pages/happyhour/HappyHourSearch";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <HomePage/>
            },
            {
                path: "about",
                element: <AboutPage/>
            },
            {
                path: "happyhour",
                element: <PrivateRoute><HappyHourPage/></PrivateRoute>,
                children: [
                    {
                        path: "",
                        element: <PrivateRoute><HappyHourSearchPage/></PrivateRoute>,
                    },
                    {
                        path: ":yelpId/:yelpName",
                        element: <PrivateRoute><HappyHourDetailsPage/></PrivateRoute>
                    },
                ]
            },
            {
                path: "pokemon",
                element: <PrivateRoute><PokemonPage/></PrivateRoute>
            },
            {
                path: "auth",
                children: [
                    {
                        path: "signin",
                        element: <SignInPage/>
                    },
                    {
                        path: "signup",
                        element: <SignupPage/>
                    },

                ]
            }
        ]
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

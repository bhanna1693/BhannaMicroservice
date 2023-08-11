import {createBrowserRouter, Outlet} from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/Error";
import {HomePage} from "./pages/Home";
import {AboutPage} from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import {HappyHourSearchPage} from "./pages/happyhour/HappyHourSearch";
import {HappyHourDetailsPage} from "./pages/happyhour/[yelpId]/[yelpName]";
import {PokemonPage} from "./pages/Pokemon";
import {SignInPage} from "./pages/auth/SignIn";
import {SignUpPage} from "./pages/auth/SignUp";
import PageLayout from "./layouts/PageLayout";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <HomePage/>,
                hasErrorBoundary: true
            },
            {
                path: "about",
                element: <AboutPage/>
            },
            {
                path: "happyhour",
                element: <PrivateRoute children={<PageLayout children={<Outlet/>}/>}/>,
                children: [
                    {
                        path: "",
                        element: <HappyHourSearchPage/>,
                    },
                    {
                        path: ":yelpId/:yelpName",
                        element: <HappyHourDetailsPage/>
                    },
                ]
            },
            {
                path: "pokemon",
                element: <PrivateRoute children={<PokemonPage/>}/>
            },
            {
                path: "auth",
                children: [
                    {
                        path: "signin",
                        element: <PageLayout children={<SignInPage/>}/>
                    },
                    {
                        path: "signup",
                        element: <PageLayout children={<SignUpPage/>}/>
                    },
                ]
            }
        ]
    },
]);

export default router

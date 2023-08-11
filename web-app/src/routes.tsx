import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/Error";
import {HomePage} from "./pages/Home";
import {AboutPage} from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import {HappyHourPage} from "./pages/happyhour";
import {HappyHourSearchPage} from "./pages/happyhour/HappyHourSearch";
import {HappyHourDetailsPage} from "./pages/happyhour/[yelpId]/[yelpName]";
import {PokemonPage} from "./pages/Pokemon";
import {SignInPage} from "./pages/auth/SignIn";
import {SignupPage} from "./pages/auth/SignUp";

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

export default router

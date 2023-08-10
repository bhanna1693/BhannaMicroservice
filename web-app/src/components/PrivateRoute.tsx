import {Navigate, useLocation} from "react-router-dom";
import {useGlobalState} from "../context/GlobalStateContext";
import {environment} from "../environment";
import React, {ReactElement} from "react";

const PrivateRoute: React.FC<{ children: ReactElement }> = ({children}) => {
    const {state} = useGlobalState();
    let location = useLocation();

    if (environment.isProd && !state.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/auth/signin" state={{from: location}} replace/>;
    }

    return children;
};

export default PrivateRoute;

import {FunctionComponent} from "react";
import {Link, useRouteError} from "react-router-dom";

const ErrorPage: FunctionComponent = () => {
    const error: any | null = useRouteError();
    if (error?.status === 404) {
        return <div className="error-page container mx-auto">
            <h1>Error</h1>
            <p>Oops! Something went wrong.</p>
            <p>Error Status: {error.status}</p>
            <p>Error Message: {error.statusText}</p>
            <p>Error Message: {error.data}</p>
            {/* You can add more error-specific information here */}

            <Link className={"btn btn-secondary"} to={"/"}>Go home</Link>
        </div>
    }

    return (
        <div>
            <h1>Error</h1>
            <p>Oops! Something went wrong.</p>
            <p>Error Message: {JSON.stringify(error)}</p>
            {/* You can add more error-specific information here */}

            <Link className={"btn btn-secondary"} to={"/"}>Go home</Link>
        </div>
    );
};

export default ErrorPage;

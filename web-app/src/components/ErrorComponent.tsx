import React, {ReactElement} from "react";

const ErrorComponent: React.FunctionComponent<{ children?: ReactElement, errorMessage?: string }> = ({children, errorMessage}) => {
    return <div className="text-center py-5">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {errorMessage ?? (
            <p>
                <i>{JSON.stringify(errorMessage)}</i>
            </p>)
        }
        {children}
    </div>
}

export default ErrorComponent

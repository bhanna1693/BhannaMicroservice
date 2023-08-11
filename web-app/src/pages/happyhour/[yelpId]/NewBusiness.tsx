import React, {ReactElement} from "react";

export const NewBusiness: React.FunctionComponent<{ children: ReactElement, businessName: string }> = ({
                                                                                                           children,
                                                                                                           businessName
                                                                                                       }) => {

    return <div>
        <h1>We've never checked specials for <br/> {businessName}</h1>
        <h3>Would you like us to check?</h3>
        <p>Please provide the website url where we can find the specials for {businessName}</p>
        <p>Be as specific as possible! We can only find what is found on that page.</p>

        {children}
    </div>;
};

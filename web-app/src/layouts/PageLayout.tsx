import {FunctionComponent, ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({children}) => {
    return (
        <div className={"container mx-auto pt-5 prose"}>
            {children}
        </div>
    );
};

export default Layout;

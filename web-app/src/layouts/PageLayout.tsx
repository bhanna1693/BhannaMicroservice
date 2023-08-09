import React, {ReactNode} from 'react';
import styles from './PageLayout.module.css'; // Import the scoped CSS module

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    );
};

export default Layout;

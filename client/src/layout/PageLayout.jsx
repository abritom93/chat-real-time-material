import React, {useState} from 'react';
import Header from "./header/Header.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";
import Main from "./main/Main.jsx";
import styles from "./Layout.module.css";

const PageLayout = ({children}) => {
    const [isOpenNavigation, setIsOpenNavigation] = useState(false);

    return (
        <div className={styles.Layout}>
            <Header
                setIsOpenNavigation={setIsOpenNavigation}
            />
            <Sidebar
                isOpenNavigation={isOpenNavigation}
                setIsOpenNavigation={setIsOpenNavigation}
            />
            <Main>
                {children}
            </Main>
        </div>
    );
};

export default PageLayout;
import React from 'react';
import styles from "./Main.module.css"

const Main = ({children}) => {
    return (
        <main className={styles.Main}>
            {children}
        </main>
    );
};

export default Main;
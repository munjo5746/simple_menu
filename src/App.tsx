import React from 'react';
import styles from './App.module.scss';

const App: React.FC = () => {
    return (
        <div className={styles.App}>
            <div className={styles.Header}></div>
            <div className={styles.MenuItemWrapper}></div>
            <div className={styles.Menu}></div>
        </div>
    );
};

export default App;

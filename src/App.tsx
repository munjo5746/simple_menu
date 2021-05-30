import React from 'react';
import styles from './App.module.scss';

const App: React.FC = () => {
    return (
        <div className={styles.App}>
            <div className={styles.Header}>
                <div className={styles.Title}>Cafe Terrace</div>
            </div>
            <div className={styles.MenuItemWrapper}></div>
            <div className={styles.Menu}>
                {['Coffee', 'Tea', 'Tart', 'Cake'].map((menuType) => {
                    return (
                        <span key={`menu-type-${menuType}`}>{menuType}</span>
                    );
                })}
            </div>
        </div>
    );
};

export default App;

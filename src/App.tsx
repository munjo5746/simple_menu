import React from 'react';
import styles from './App.module.scss';

const App: React.FC = () => {
    const [itemsUnderSelectedMenu, setItemsUnderSelectedMenu] = React.useState<
        string[]
    >(['item1', 'item2']);
    return (
        <div className={styles.App}>
            <div className={styles.Header}>
                <div className={styles.Title}>Cafe Terrace</div>
                <div className={styles.Address}>
                    <div>208-17 Northern Blvd</div>
                    <div>Bayside, NY, 11361</div>
                </div>
            </div>
            <div className={styles.Menu}>
                {['Coffee', 'Tea', 'Tart', 'Cake', 'Misc'].map((menuType) => {
                    return (
                        <span key={`menu-type-${menuType}`}>{menuType}</span>
                    );
                })}
            </div>
            <div className={styles.MenuItemWrapper}>
                {itemsUnderSelectedMenu.map((item) => {
                    return (
                        <div
                            key={`item-${item}`}
                            className={`${styles.Card} ${styles.Item}`}
                        >
                            <div className={styles.Name}>Iced Coffee</div>
                            <div className={styles.PriceList}>
                                <span className={styles.Price}>
                                    <span className={styles.Label}>sm:</span>
                                    <span className={styles.Value}>$3.99</span>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default App;

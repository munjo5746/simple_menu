import React from 'react';
import styles from './App.module.scss';
import * as utils from './utils';

import storeJson from './store.json';

export interface Store {
    name: string;
    address: Address;
    menu: Menu;
}

interface Address {
    line1: string;
    city: string;
    state: string;
    zip: string;
}

interface Menu {
    categories: Category[];
}
interface Category {
    name: string;
    items: Item[];
}

interface Item {
    name: string;
    prices: Price[];
}

interface Price {
    for: string; // this could be size, ex) sm, md, lg or some type of small sub-entity, ex) syrup
    value: number;
}

const App: React.FC = () => {
    const [store, setStore] = React.useState<Store>(storeJson);
    const [selectedCategory, setSelectedCategory] = React.useState<Category>(
        store.menu.categories[0],
    );

    const address = React.useMemo(() => utils.getStoreAddress(store), [store]);
    return (
        <div className={styles.App}>
            <div className={styles.Header}>
                <div className={styles.Title}>{store.name}</div>
                {address && (
                    <div className={styles.Address}>
                        <div>{address?.line1}</div>
                        <div>{address?.line2}</div>
                    </div>
                )}
            </div>
            <div className={styles.Menu}>
                {store.menu.categories.map((category) => {
                    return (
                        <span key={`category-${category.name}`}>
                            {category.name}
                        </span>
                    );
                })}
            </div>
            <div className={styles.MenuItemWrapper}>
                {selectedCategory?.items.map((item) => {
                    return (
                        <div
                            key={`item-${item.name}`}
                            className={`${styles.Card} ${styles.Item}`}
                        >
                            <div className={styles.Name}>{item.name}</div>
                            <div className={styles.PriceList}>
                                {item.prices.map((price) => (
                                    <span
                                        key={`menu-item-${item.name}-price-for-${price.for}`}
                                        className={styles.Price}
                                    >
                                        <span className={styles.Label}>
                                            {`${price.for}:`}
                                        </span>
                                        <span className={styles.Value}>
                                            {utils.toCurrency(price.value)}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default App;

import React from 'react';
import styles from './App.module.scss';
import * as utils from './utils';

import storeJson from './store.json';

interface Store {
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
    // const [categories, setCategories] = React.useState<Category[]>(
    //     categoryJson,
    // );
    const [selectedCategory, setSelectedCategory] = React.useState<Category>(
        store.menu.categories[0],
    );
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

import React from 'react';
import styles from './App.module.scss';
import * as utils from './utils';

interface Category {
    name: string;
    menus: Menu[];
}

interface Menu {
    name: string;
    prices: Price[];
}

interface Price {
    for: string; // this could be size, ex) sm, md, lg or some type of small sub-entity, ex) syrup
    value: number;
}

const categoryJson = [
    {
        name: 'Coffee',
        menus: [
            {
                name: 'Iced Coffee',
                prices: [
                    {
                        for: 'sm',
                        value: 3.99,
                    },
                    {
                        for: 'md',
                        value: 4.99,
                    },
                    {
                        for: 'lg',
                        value: 5.99,
                    },
                ],
            },
        ],
    },
];

const App: React.FC = () => {
    const [categories, setCategories] = React.useState<Category[]>(
        categoryJson,
    );
    const [selectedCategory, setSelectedCategory] = React.useState<Category>(
        categoryJson[0],
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
                {categories.map((category) => {
                    return (
                        <span key={`category-${category.name}`}>
                            {category.name}
                        </span>
                    );
                })}
            </div>
            <div className={styles.MenuItemWrapper}>
                {selectedCategory?.menus.map((menu) => {
                    return (
                        <div
                            key={`item-${menu.name}`}
                            className={`${styles.Card} ${styles.Item}`}
                        >
                            <div className={styles.Name}>{menu.name}</div>
                            <div className={styles.PriceList}>
                                {menu.prices.map((price) => (
                                    <span
                                        key={`menu-item-${menu.name}-price-for-${price.for}`}
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

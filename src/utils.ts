import { Store } from './App';

const numberFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
export const toCurrency = (value: number) => {
    return numberFormatter.format(value);
};

export const getStoreAddress = (store: Store) => {
    const { address } = store || {};
    const hasValidAddress =
        !!address &&
        !!address.line1 &&
        !!address.city &&
        !!address.state &&
        !!address.zip;
    if (!hasValidAddress) return null;

    const { line1, city, state, zip } = address;

    return {
        line1: `${line1}`,
        line2: `${city}, ${state}, ${zip}`,
    };
};

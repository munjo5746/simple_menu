const numberFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
export const toCurrency = (value: number) => {
    return numberFormatter.format(value);
};

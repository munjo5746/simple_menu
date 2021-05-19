export const fromCentToDollar = (cents: number) => {
    return cents / 100;
};

export const fromDollarToCent = (dollar: number) => {
    return dollar * 100;
};

export const ftToInch = (ft: number) => {
    return ft * 12;
};

export const fractionToInch = (frac: string) => {
    const parts = frac.split('/');
    const numerator = Number.parseInt(parts[0]);
    const denominator = Number.parseInt(parts[1]);

    if (denominator === 0) return null;

    return numerator / denominator;
};

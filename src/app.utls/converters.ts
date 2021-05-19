export const fromCentToDollar = (cents: number | undefined) => {
    return cents ? cents / 100 : NaN;
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

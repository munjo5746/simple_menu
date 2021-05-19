import { FormFieldKey, FormType } from '../App';

export const calcuateLength = (ft: number, inch: number, frac: number) =>
    ft + inch + frac;

export const calculateWidth = (form: FormType) => {
    return calcuateLength(form.width_ft, form.width_inch, form.width_frac);
};

export const calculateHeight = (form: FormType) => {
    return calcuateLength(form.height_ft, form.height_inch, form.height_frac);
};

export const calculate = (form: FormType, priceTable: any) => {
    const width = calculateWidth(form);
    const height = calculateHeight(form);

    if (form.temper_only) {
        return width * height * (priceTable?.temper_only || NaN);
    }

    let total = 0;

    // annealed or tempered
    const annealedOrTempered: FormFieldKey = form.anneal_sq_ft
        ? 'anneal_sq_ft'
        : 'tempered_sq_ft';
    total += priceTable?.[annealedOrTempered] || 0;

    // polish

    // miter

    // hole < 1"
    if (form.hole_1_inch_or_less)
        total += priceTable?.['hole_1_inch_or_less'] || 0;

    // notch
    if (form.notch) total += priceTable?.['notch'] || 0;

    // hinge
    if (form.hinge) total += priceTable?.['hinge'] || 0;

    // patch
    if (form.patch) total += priceTable?.['patch'] || 0;

    return total;
};

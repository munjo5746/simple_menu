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
    console.log(form, priceTable);
    if (form.temper_only) {
        const width = calculateWidth(form);
        const height = calculateHeight(form);

        console.log(typeof priceTable.temper_only);
        return width * height * (priceTable?.temper_only || NaN);
    }

    return NaN;
};

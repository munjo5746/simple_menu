import React from 'react';
import './App.scss';
import {
    Button,
    Drawer,
    Input,
    InputNumber,
    message,
    PageHeader,
    Popover,
    Radio,
    Select,
    Statistic,
} from 'antd';
import { Form, Checkbox } from 'antd';
import json from './data.json';
import PriceTable from './app/PriceTable';
import * as converters from './app.utls/converters';
import * as calc from './app.utls/calc';

export const TitleMap: Record<FieldKey, string> = {
    glass_type: 'Glass Type',
    thickness: 'Thickness',
    anneal_sq_ft: 'Anneal Sq ft',
    tempered_sq_ft: 'Tempered Sq ft',
    polish_per_1_inch: 'Polish per 1 inch',
    miter_1_inch: 'Miter 1 inch',
    hole_1_inch_or_less: 'Hole < 1"',
    notch: 'Notch',
    patch: 'Patch',
    hinge: 'Hinge',
    temper_only: 'Temper Only',
};

type LabelValue = {
    label: string;
    value: GlassTypeKey | string;
};

export type DataType = Record<FieldKey, DataValueType>;
export type DataValueType = string | number | GlassTypeKey;

export type FormType = { [key in FormFieldKey]?: any };
export type FieldKey =
    | 'glass_type'
    | 'thickness'
    | 'anneal_sq_ft'
    | 'tempered_sq_ft'
    | 'polish_per_1_inch'
    | 'miter_1_inch'
    | 'hole_1_inch_or_less'
    | 'notch'
    | 'hinge'
    | 'patch'
    | 'temper_only';

export type DimensisonKey =
    | 'width_ft'
    | 'width_inch'
    | 'width_frac'
    | 'height_ft'
    | 'height_inch'
    | 'height_frac';

export type FormFieldKey = FieldKey | DimensisonKey;

export type GlassTypeKey =
    | 'clear_glass'
    | 'bronze_gray'
    | 'low_iron'
    | 'optiwhite'
    | 'single_side_acid'
    | 'acid_starphire'
    | 'low_e'
    | 'mirror'
    | 'starphire_mirror'
    | 'mirrorpane';

export enum LongShortOptions {
    NONE,
    S1,
    L1,
    S2,
    L2,
    SL1,
    SL2,
}

export const PolishOptions: LongShortOptions[] = [
    LongShortOptions.NONE,
    LongShortOptions.S1,
    LongShortOptions.L1,
    LongShortOptions.SL1,
    LongShortOptions.S2,
    LongShortOptions.L2,
    LongShortOptions.SL2,
];

const MiterOptions: LongShortOptions[] = [
    LongShortOptions.NONE,
    LongShortOptions.S1,
    LongShortOptions.L1,
    LongShortOptions.S2,
    LongShortOptions.L2,
    LongShortOptions.SL2,
];

function App() {
    const glassTypes = React.useMemo(
        () =>
            [
                { label: 'CLEAR TYPE', value: 'clear_glass' },
                { label: 'BRONZE/GRAY', value: 'bronze_gray' },
                { label: 'LOW-IRON', value: 'low_iron' },
                { label: 'OPTIWHITE', value: 'optiwhite' },
                { label: 'SINGLE SIDE ACID', value: 'single_side_acid' },
                { label: 'ACID/STARPHIRE', value: 'acid_starphire' },
                { label: 'LOW-E', value: 'low_e' },
                { label: 'MIRROR', value: 'mirror' },
                { label: 'STARPHIRE MIRROR', value: 'starphire_mirror' },
                { label: 'MIRRORPANE', value: 'mirrorpane' },
            ] as LabelValue[],
        [],
    );

    const getOptionTitle = React.useCallback((option: LongShortOptions) => {
        switch (option) {
            case LongShortOptions.NONE:
                return 'NONE';
            case LongShortOptions.L1:
                return '1 LONG';
            case LongShortOptions.L2:
                return '2 LONG';
            case LongShortOptions.S1:
                return '1 SHORT';
            case LongShortOptions.S2:
                return '2 SHORT';
            case LongShortOptions.SL1:
                return '1 SHORT + 1 LONG';
            case LongShortOptions.SL2:
                return '2 SHORT + 2 LONG';
        }
    }, []);

    const availableGlassTypes = React.useMemo(
        () => json.map((data) => data.glass_type),
        [json],
    );

    const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    const [calcForm, setCalcForm] = React.useState<FormType>({
        // glass type
        glass_type: glassTypes[0].value,

        // annealed or tempered selection
        anneal_sq_ft: true,
        tempered_sq_ft: false,

        // polish
        polish_per_1_inch: LongShortOptions.NONE,
        miter_1_inch: LongShortOptions.NONE,
    });

    const [selectedGlassType, setSelectedGlassType] = React.useState<
        LabelValue | undefined
    >(glassTypes[0]);
    const [selectedThickness, setSelectedThickness] = React.useState<string>();
    const [thicknessSelections, setThicknessSelections] = React.useState<
        string[]
    >();
    const reset = React.useCallback(() => {
        setThicknessSelections(undefined);
    }, []);

    const [priceTable, setPriceTable] = React.useState<any>();
    React.useEffect(() => {
        reset();

        const data = json.filter(
            (jsonData) => jsonData.glass_type === selectedGlassType?.value,
        );
        if (!data || data.length === 0) {
            message.warning('Data cannot be found for selected glass type.');
            return;
        }

        setThicknessSelections(
            data.map((d) => d.thickness).filter((thickness) => !!thickness),
        );
        setSelectedThickness(undefined);
    }, [selectedGlassType]);

    React.useEffect(() => {
        const data = json.find(
            (jsonData) =>
                jsonData.glass_type === selectedGlassType?.value &&
                jsonData.thickness === selectedThickness,
        );
        if (!data) {
            message.warning('Data cannot be found for selected thickness.');
            return;
        }
        // maybe, validate if all "data" has same attributes

        setPriceTable(data);
    }, [selectedThickness]);

    const onChange = (key: FormFieldKey) => (e: any) => {
        const { target: { value } = { value: e } } = e;

        switch (key) {
            case 'width_ft':
            case 'height_ft':
                const ft = Number.parseInt(value);
                setCalcForm((prev) => ({
                    ...prev,
                    [key]: converters.ftToInch(ft),
                }));
                break;
            case 'width_inch':
            case 'height_inch':
                const inch = Number.parseInt(value);
                setCalcForm((prev) => ({
                    ...prev,
                    [key]: inch,
                }));
                break;
            case 'width_frac':
            case 'height_frac':
                const fracFloat = converters.fractionToInch(value);
                console.log(key, fracFloat);
                if (fracFloat === null) {
                    message.warning('The denominator cannot be 0.');

                    return;
                }
                setCalcForm((prev) => ({
                    ...prev,
                    [key]: fracFloat,
                }));
                break;
            default:
                setCalcForm((prev) => ({
                    ...prev,
                    [key]: value,
                }));

                break;
        }
    };

    const [estimate, setEstimate] = React.useState<number>();
    React.useEffect(() => {
        setEstimate(calc.calculate(calcForm, priceTable) || undefined);
    }, [calcForm]);

    const [temperOnly, setTemperOnly] = React.useState<boolean>(false);

    console.log(calcForm);
    return (
        <PageHeader
            className="page"
            title="(¬‿¬ ) Price Estimator"
            subTitle="Something that describes this tool!!!"
            extra={[
                <Button
                    key="drawer-button"
                    onClick={() => {
                        setOpenDrawer(!openDrawer);
                    }}
                >
                    Price Table
                </Button>,
            ]}
        >
            <div className="app">
                <div className="form">
                    <Form form={form} layout="vertical">
                        <Form.Item label="Glass Type">
                            <Radio.Group
                                defaultValue={selectedGlassType?.value}
                                onChange={(e) => {
                                    reset();

                                    const fieldKey: FieldKey = 'glass_type';
                                    const value: string = e.target.value;

                                    setCalcForm({
                                        [fieldKey]: value,
                                    });

                                    const foundGlassType = glassTypes.find(
                                        (glassType) =>
                                            glassType.value === value,
                                    );

                                    setSelectedGlassType(foundGlassType);
                                }}
                            >
                                {glassTypes.map((glassType) => (
                                    <Radio
                                        key={`glass-type-option-${glassType.value}`}
                                        disabled={
                                            !availableGlassTypes.includes(
                                                glassType.value,
                                            )
                                        }
                                        value={glassType.value}
                                    >
                                        {glassType.label}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            style={{ minWidth: '20em' }}
                            label="THICKNESS"
                        >
                            <Select
                                defaultValue={thicknessSelections?.[0]}
                                value={selectedThickness}
                                onChange={(selected) => {
                                    if (!selected) {
                                        message.error(
                                            'Unable to select thickness. This is most likely system error.',
                                        );
                                        return;
                                    }
                                    const fieldKey: FieldKey = 'thickness';
                                    const value: string = selected as string;
                                    setCalcForm({
                                        ...calcForm,
                                        [fieldKey]: value,
                                    });

                                    setSelectedThickness(value);
                                }}
                            >
                                {thicknessSelections?.map((thickness) => (
                                    <Select.Option
                                        key={`thickness-key-${thickness}`}
                                        value={thickness}
                                    >
                                        {thickness}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Dimension" name="dimension">
                            <div className="dimension">
                                <div className="dimension-container">
                                    <div className="title">WIDTH</div>
                                    <div className="width">
                                        <Input
                                            suffix="ft"
                                            onChange={onChange('width_ft')}
                                        />
                                        <Input
                                            suffix="inch"
                                            onChange={onChange('width_inch')}
                                        />
                                        <Input
                                            suffix="frac"
                                            onChange={onChange('width_frac')}
                                        />
                                    </div>
                                </div>
                                <div className="dimension-container">
                                    <div className="title">HEIGHT</div>
                                    <div className="height">
                                        <Input
                                            suffix="ft"
                                            onChange={onChange('height_ft')}
                                        />
                                        <Input
                                            suffix="inch"
                                            onChange={onChange('height_inch')}
                                        />
                                        <Input
                                            suffix="frac"
                                            onChange={onChange('height_frac')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form.Item>

                        <Form.Item label="ANNEALED OR TEMPERED">
                            {
                                <Radio.Group
                                    defaultValue={'ANNEALED'}
                                    disabled={temperOnly}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const field: FormFieldKey =
                                            value === 'ANNEALED'
                                                ? 'anneal_sq_ft'
                                                : 'tempered_sq_ft';

                                        setCalcForm((prev) => ({
                                            ...prev,
                                            ...{
                                                [field]: true,
                                                [field === 'anneal_sq_ft'
                                                    ? 'tempered_sq_ft'
                                                    : 'anneal_sq_ft']: false,
                                            },
                                        }));
                                    }}
                                >
                                    {['ANNEALED', 'TEMPERED'].map((value) => (
                                        <Radio
                                            key={`polish-type-${value}`}
                                            value={value}
                                        >
                                            {value}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            }
                        </Form.Item>

                        <Form.Item label="Polish">
                            {
                                <Radio.Group
                                    disabled={temperOnly}
                                    defaultValue={LongShortOptions.NONE}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        setCalcForm((prev) => ({
                                            ...prev,
                                            polish_per_1_inch: value,
                                        }));
                                    }}
                                >
                                    {PolishOptions.map((option) => (
                                        <Radio
                                            key={`polish-type-${option}`}
                                            value={option}
                                        >
                                            {getOptionTitle(option)}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            }
                        </Form.Item>

                        <Form.Item label="Miter">
                            {
                                <Radio.Group
                                    disabled={temperOnly}
                                    defaultValue={LongShortOptions.NONE}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        setCalcForm((prev) => ({
                                            ...prev,
                                            miter_1_inch: value,
                                        }));
                                    }}
                                >
                                    {MiterOptions.map((option) => (
                                        <Radio
                                            key={`polish-type-${option}`}
                                            value={option}
                                        >
                                            {getOptionTitle(option)}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            }
                        </Form.Item>

                        <div className="inline">
                            {([
                                'hole_1_inch_or_less',
                                'notch',
                                'hinge',
                                'patch',
                            ] as FieldKey[]).map((key) => (
                                <Form.Item key={key} label={TitleMap[key]}>
                                    <InputNumber
                                        onChange={onChange(key)}
                                        disabled={temperOnly}
                                    />
                                </Form.Item>
                            ))}
                            <Form.Item label="TEMPER ONLY">
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Checkbox
                                        onChange={(e) => {
                                            const {
                                                target: { checked },
                                            } = e;
                                            setTemperOnly(checked);
                                            setCalcForm((prev) => ({
                                                ...prev,
                                                temper_only: checked,
                                            }));
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className="summary">
                    <Statistic
                        title="Estimate"
                        prefix="$"
                        value={converters.fromCentToDollar(estimate) || '-'}
                    />
                </div>
            </div>

            <Drawer
                title="Price Table"
                width={1000}
                visible={openDrawer}
                onClose={() => {
                    setOpenDrawer(false);
                }}
            >
                <PriceTable />
            </Drawer>
        </PageHeader>
    );
}

export default App;

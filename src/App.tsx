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
import { Form } from 'antd';
import json from './data.json';
import PriceTable from './app/PriceTable';
import Checkbox from 'antd/lib/checkbox/Checkbox';

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

export type FormFieldKey = FieldKey | 'width' | 'height';

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
    const [calcForm, setCalcForm] = React.useState<
        { [key in FormFieldKey]?: string | number }
    >({
        glass_type: glassTypes[0].value,
    });

    const [selectedGlassType, setSelectedGlassType] = React.useState<
        LabelValue | undefined
    >(glassTypes[0]);
    const [selectedThickness, setSelectedThickness] = React.useState<string>();
    const [enabledFieldKeys, setEnabledFieldKeys] = React.useState<string[]>();
    const [thicknessSelections, setThicknessSelections] = React.useState<
        string[]
    >();
    const reset = React.useCallback(() => {
        setThicknessSelections(undefined);
    }, []);

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
    }, [selectedGlassType]);
    React.useEffect(() => {
        const data = json.filter(
            (jsonData) => jsonData.thickness === selectedThickness,
        );
        if (!data || data.length === 0) {
            message.warning('Data cannot be found for selected thickness.');
            return;
        }
        // maybe, validate if all "data" has same attributes

        // set fields to enable
        setEnabledFieldKeys(Object.keys(data[0]));
    }, [selectedThickness]);

    const onChange = (key: FieldKey) => (value: number) => {
        // on change
    };

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
                                        <Input suffix="ft" />
                                        <Input suffix="inch" />
                                        <Input suffix="frac" />
                                    </div>
                                </div>
                                <div className="dimension-container">
                                    <div className="title">HEIGHT</div>
                                    <div className="height">
                                        <Input suffix="ft" />
                                        <Input suffix="inch" />
                                        <Input suffix="frac" />
                                    </div>
                                </div>
                            </div>
                        </Form.Item>

                        <Form.Item label="ANNEALED OR TEMPERED">
                            {
                                <Radio.Group>
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
                                    defaultValue={LongShortOptions.NONE}
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
                                    defaultValue={LongShortOptions.NONE}
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
                                    <InputNumber onChange={onChange(key)} />
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
                                    <Checkbox />
                                </div>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className="summary">
                    <Statistic title="Estimate" prefix="$" value="50000" />
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

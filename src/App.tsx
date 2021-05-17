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
    const polishTypes = React.useMemo(
        () => [
            { label: '2 SHORT', value: '2_short' },
            { label: '2 LONG', value: '2_long' },
            { label: '2 SHORT + 2 LONG', value: '2s_2l' },
        ],
        [],
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
                                        value={glassType.value}
                                    >
                                        {glassType.label}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>

                        <div className="inline">
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
                                    <InputNumber
                                        placeholder="width"
                                        onChange={(value) => {
                                            const fieldKey: FormFieldKey =
                                                'width';
                                            const width: number =
                                                (value as number) || 0;

                                            setCalcForm({
                                                ...calcForm,
                                                [fieldKey]: width,
                                            });
                                        }}
                                    />
                                    <div>x</div>
                                    <InputNumber
                                        placeholder="height"
                                        onChange={(value) => {
                                            const fieldKey: FormFieldKey =
                                                'height';
                                            const height: number =
                                                (value as number) || 0;

                                            setCalcForm({
                                                ...calcForm,
                                                [fieldKey]: height,
                                            });
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </div>

                        <Form.Item label="Polish">
                            {
                                <Radio.Group>
                                    {polishTypes.map((polishType) => (
                                        <Radio
                                            key={`polish-type-${polishType.value}`}
                                            value={polishType.value}
                                        >
                                            {polishType.label}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            }
                        </Form.Item>

                        <div className="inline">
                            <Form.Item label="ANNEAL OR TP">
                                <Select>
                                    {[
                                        {
                                            label: 'TEMPERED',
                                            value: 'tempered',
                                        },
                                        { label: 'ANNEAL', value: 'anneal' },
                                    ].map((type) => (
                                        <Select.Option
                                            key={`${type.value}`}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            {([
                                'miter_1_inch',
                                'hole_1_inch_or_less',
                                'notch',
                                'hinge',
                                'patch',
                                'temper_only',
                            ] as FieldKey[]).map((key) => (
                                <Form.Item key={key} label={TitleMap[key]}>
                                    <InputNumber onChange={onChange(key)} />
                                </Form.Item>
                            ))}
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

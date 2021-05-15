import React from 'react';
import './App.scss';
import {
    Input,
    InputNumber,
    message,
    PageHeader,
    Radio,
    Select,
    Statistic,
} from 'antd';
import { Form } from 'antd';
import json from './data.json';
type LabelValue = {
    label: string;
    value: string;
};

type FieldKey =
    | 'glass_type'
    | 'thickness'
    | 'anneal_sq_ft'
    | 'tempered_sq_ft'
    | 'polish_per_1_inch'
    | 'meter_1_inch'
    | 'hole_1_inch_or_less'
    | 'notch'
    | 'hinge'
    | 'patch'
    | 'temper_only';

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

    const [form] = Form.useForm();
    const [calcForm, setCalcForm] = React.useState<any>(glassTypes[0]);

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

    console.log(calcForm);

    return (
        <PageHeader title="Title" subTitle="Calculator">
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
                                    onChange={(value) => {
                                        if (!value) {
                                            message.error(
                                                'Unable to select thickness. This is most likely system error.',
                                            );
                                            return;
                                        }

                                        setSelectedThickness(value as string);
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
                                    <Input placeholder="width" />
                                    <div>x</div>
                                    <Input placeholder="height" />
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
                            <Form.Item label="MITER">
                                <InputNumber name="miter" />
                            </Form.Item>
                            <Form.Item label='HOLE<1"'>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="NOTCH">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="HINGE">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="PATCH">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="TEMPER ONLY">
                                <InputNumber />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className="summary">
                    <Statistic title="Estimate" prefix="$" value="50000" />
                </div>
            </div>
        </PageHeader>
    );
}

export default App;

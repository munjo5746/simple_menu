import React from 'react';
import './App.scss';
import { Input, InputNumber, PageHeader, Radio, Select, Statistic } from 'antd';
import { Form } from 'antd';

function App() {
    const [form] = Form.useForm();
    const glassTypes = React.useMemo(
        () => [
            { label: 'CLEAR TYPE', value: 'clear_type' },
            { label: 'BRONZE/GRAY', value: 'bronze_gray' },
            { label: 'OPTIWHITE', value: 'optiwhite' },
            { label: 'SINGLE SIDE ACID', value: 'single_side_acid' },
            { label: 'ACID/STARPHIRE', value: 'acid_starphire' },
            { label: 'LOW-E', value: 'low_e' },
            { label: 'MIRROR', value: 'mirror' },
            { label: 'STARPHIRE MIRROR', value: 'starphire_mirror' },
            { label: 'MIRRORPANE', value: 'mirrorpane' },
        ],
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
    return (
        <PageHeader title="Title" subTitle="Calculator">
            <div className="app">
                <div className="form">
                    <Form form={form} layout="vertical">
                        <Form.Item label="Glass Type">
                            <Radio.Group>
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

                        <Form.Item label="THICKNESS">
                            <Select>
                                <Select.Option value={'3/16'}>
                                    3/16
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Dimension" name="dimension">
                            <div className="dimension">
                                <Input placeholder="width" />
                                <div>x</div>
                                <Input placeholder="height" />
                            </div>
                        </Form.Item>

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
                                <Input disabled={true} suffix={'inch'} />
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

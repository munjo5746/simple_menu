import React from 'react';
import './App.scss';
import { Input, PageHeader, Select } from 'antd';
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
    return (
        <PageHeader title="Title" subTitle="Calculator">
            <div className="app">
                <div className="form">
                    <Form form={form} layout="vertical">
                        <Form.Item label="Glass Type">
                            <Select>
                                {glassTypes.map((glassType) => (
                                    <Select.Option
                                        key={`glass-type-option-${glassType.value}`}
                                        value={glassType.value}
                                    >
                                        {glassType.label}
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
                    </Form>
                </div>
                <div className="summary">aaa</div>
            </div>
        </PageHeader>
    );
}

export default App;

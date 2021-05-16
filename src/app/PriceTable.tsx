import { Input, Table, Form } from 'antd';
import React from 'react';
import { DataType, FieldKey } from '../App';
import json from '../data.json';

interface EditableCellProps {
    title: React.ReactNode;
    data: DataType;
    dataIndex: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
    data,
    title,
    children,
    dataIndex,
    ...rest
}) => {
    const [editing, setEditing] = React.useState<boolean>(false);
    const node = editing ? (
        <Form.Item name={dataIndex}>
            <Input />
        </Form.Item>
    ) : (
        <div
            onClick={() => {
                setEditing(true);
            }}
        >
            {children}
        </div>
    );

    return <td {...rest}>{node}</td>;
};

const PriceTable: React.FC = () => {
    const [form] = Form.useForm();
    const TitleMap: Record<FieldKey, string> = React.useMemo(
        () => ({
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
        }),
        [],
    );

    const columns = Object.keys(json[0]).map((key) => {
        const title = TitleMap[key as FieldKey];
        return {
            dataIndex: key,
            title,
            onCell: (data: DataType) => ({
                data,
                title,
                dataIndex: key,
            }),
        };
    });

    const dataSource = json.map((data, idx) => {
        return {
            key: idx,
            ...data,
        };
    });

    return (
        <Form form={form}>
            <Table
                columns={columns}
                dataSource={dataSource}
                components={{
                    body: { cell: EditableCell },
                }}
            />
        </Form>
    );
};

export default PriceTable;

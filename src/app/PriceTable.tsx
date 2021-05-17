import { Input, Table, Form } from 'antd';
import React from 'react';
import { DataType, FieldKey, TitleMap } from '../App';
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
        <div>{children}</div>
    );

    return <td {...rest}>{node}</td>;
};

const PriceTable: React.FC = () => {
    const [form] = Form.useForm();

    const fixedColumnKeys: FieldKey[] = React.useMemo(
        () => ['glass_type', 'thickness'],
        [],
    );

    const columns = Object.keys(json[0]).map((key) => {
        const title = TitleMap[key as FieldKey];
        return {
            dataIndex: key,
            title,
            fixed: fixedColumnKeys.includes(key as FieldKey)
                ? ('left' as any)
                : undefined,
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
                scroll={{ x: 1500 }}
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

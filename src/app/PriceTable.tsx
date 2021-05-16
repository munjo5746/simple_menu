import { Table } from 'antd';
import React from 'react';
import { FieldKey } from '../App';
import json from '../data.json';

const PriceTable: React.FC = () => {
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
            width: '',
            height: '',
        }),
        [],
    );

    const columns = Object.keys(json[0]).map((key) => {
        return {
            title: TitleMap[key as FieldKey],
            dataIndex: key,
            render: (value: any) => {
                return value || '-';
            },
        };
    });

    const dataSource = json.map((data, idx) => {
        return {
            key: idx,
            ...data,
        };
    });

    return <Table columns={columns} dataSource={dataSource}></Table>;
};

export default PriceTable;

/**
 * Created by Sherlock on 07.11.2021.
 */

import React from 'react';
import {Select} from "antd";

const {Option} = Select;

const SearchFlat = ({flats, onChange}) => {
    return (
        <Select
            showSearch
            style={{width: "24%"}}
            placeholder="Кв./офис"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {flats?.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
        </Select>
    );
};

export default SearchFlat;
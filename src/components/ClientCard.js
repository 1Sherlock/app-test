/**
 * Created by Sherlock on 07.11.2021.
 */

import React from 'react';
import {DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import {Card} from "antd";

const ClientCard = ({data, showDelete, showEdit}) => {
    return (
        <Card
            actions={[
                <DeleteOutlined key="delete" onClick={showDelete}/>,
                <EditOutlined key="edit" onClick={showEdit}/>
            ]}
            onTabChange={(v) => console.log(v)}
        >
            <div className="card-content">
                <UserOutlined style={{fontSize: "25px", color: "#40a9ff"}}/>
                <div className="client-data">
                    <b>{data.name}</b>
                    <p>{data.phone}</p>
                    <span>{data.email}</span>
                </div>
            </div>
        </Card>
    );
};

export default ClientCard;
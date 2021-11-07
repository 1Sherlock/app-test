/**
 * Created by Sherlock on 07.11.2021.
 */

import React, {useRef, useState} from 'react';
import {Form, Input, Modal} from "antd";
import {connect} from "react-redux";
import {addClient, getClients, getFlats, getHouses, getStreets, updateState} from "../redux/actions/allAction";
import {UserAddOutlined} from '@ant-design/icons';

const AddModal = (props) => {
    let form = useRef();

    return (
        <Modal title={<><UserAddOutlined style={{color: "#1890ff", fontSize: 30}}/> Добавить Жилца</>}
               destroyOnClose={true} visible={props.modalShow} onOk={() => form.submit()}
               onCancel={() => props.updateState({modalShow: false})} cancelText='Отмена' okText="Добавить"
               confirmLoading={props.isLoading}
        >
            <h3>
                {props.streets.filter(item => item.id === props.selectedStreet)[0]?.name}{', '}
                {props.houses.filter(item => item.id === props.selectedHouse)[0]?.name}{', '}
                {props.flats.filter(item => item.id === props.selectedFlat)[0]?.name}
            </h3>


            <Form
                name="basic"
                initialValues={{Phone: props.selectedClient?.phone.substr(2), Email: props.selectedClient?.email, Name: props.selectedClient?.name}}
                onFinish={(v) => props.addClient(v)}
                layout='vertical'
                autoComplete="off"
                ref={(c) => form = c}
            >
                <div className="d-flex mt-3">

                    <Form.Item

                        label="Телефон"
                        name="Phone"
                        rules={[{required: true, message: 'Пожалуйста, заполните это поля!'}]}
                    >
                        <Input addonBefore="+7" placeholder="Телефон" type="phone"/>
                    </Form.Item>

                    <Form.Item
                        label="e-mail"
                        name="Email"
                    >
                        <Input type="email"/>
                    </Form.Item>
                </div>
                <Form.Item
                    label="Ф.И.О"
                    name="Name"
                >
                    <Input type="text"/>
                </Form.Item>
            </Form>
        </Modal>
    );
};


const mapStateToProps = (state) => {
    return {
        streets: state.all.streets,
        houses: state.all.houses,
        flats: state.all.flats,
        clients: state.all.clients,
        selectedStreet: state.all.selectedStreet,
        selectedHouse: state.all.selectedHouse,
        selectedFlat: state.all.selectedFlat,
        selectedClient: state.all.selectedClient,
        modalShow: state.all.modalShow,
    }
}

export default connect(mapStateToProps, {
    getStreets,
    updateState,
    getHouses,
    getFlats,
    getClients,
    addClient
})(AddModal);
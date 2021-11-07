/**
 * Created by Sherlock on 07.11.2021.
 */

import React from 'react';
import {Modal} from "antd";
import {connect} from "react-redux";
import {UserDeleteOutlined} from '@ant-design/icons';
import {deleteClient, updateState} from "../redux/actions/allAction";

const DeleteModal = (props) => {

    return (
        <Modal title={<><UserDeleteOutlined style={{color: "#1890ff", fontSize: 30}}/> Удаление Жилца</>}
               destroyOnClose={true} visible={props.showDelete} onOk={props.deleteClient}
               onCancel={() => props.updateState({showDelete: false})} cancelText='Отмена' okText="Удалить"
               confirmLoading={props.isLoading}>

            <h2>Вы действительно хотите удалить?</h2>

        </Modal>
    );
};


const mapStateToProps = (state) => {
    return {
        showDelete: state.all.showDelete,
    }
}

export default connect(mapStateToProps, {deleteClient, updateState})(DeleteModal);
import React, {useEffect} from 'react';
import SearchStreet from "./components/SearchStreet";
import {connect} from "react-redux";
import {getClients, getFlats, getHouses, getStreets, updateState} from "./redux/actions/allAction";
import {Button, Card, Col, Row, Tooltip} from "antd";
import SearchHouse from "./components/SearchHouse";
import SearchFlat from "./components/SearchFlat";
import {UserAddOutlined} from '@ant-design/icons';
import ClientCard from "./components/ClientCard";
import AddModal from "./components/AddModal";
import DeleteModal from "./components/DeleteModal";
import {ToastContainer} from "react-toastify";

const App = (props) => {

    useEffect(() => {
        props.getStreets();
    }, [])

    return (
        <Row>
            <Col md={{span: 8, offset: 8}}>
                <Card>
                    <div className="d-flex">
                        <SearchStreet streets={props.streets} onChange={props.getHouses}/>
                        <SearchHouse houses={props.houses} onChange={props.getFlats}/>
                        <SearchFlat flats={props.flats} onChange={props.getClients}/>
                    </div>

                    {props.selectedFlat ?

                        <div className="d-flex mt-3">
                            <h4>
                                {props.streets.filter(item => item.id === props.selectedStreet)[0]?.name}{', '}
                                {props.houses.filter(item => item.id === props.selectedHouse)[0]?.name}{', '}
                                {props.flats.filter(item => item.id === props.selectedFlat)[0]?.name}
                            </h4>
                            {props.flats.filter(item => item.id === props.selectedFlat)[0]?.typeId === 3 &&
                            <div>
                                <Tooltip title="Добавить жильца">
                                    <Button shape="circle" icon={<UserAddOutlined/>}
                                            onClick={() => props.updateState({modalShow: true, selectedClient: null})}/>
                                </Tooltip>
                            </div>
                            }

                        </div> : ""
                    }
                    <div className="cards">
                        {props.clients?.length > 0 ?
                            props.clients.map(item => (
                                    <ClientCard
                                        data={item}
                                        showDelete={() => props.updateState({
                                            selectedForDelete: item.bindId,
                                            showDelete: true
                                        })}
                                        showEdit={() => props.updateState({modalShow: true, selectedClient: item})}
                                    />
                                )
                            ) : ""}
                    </div>
                </Card>
            </Col>

            <AddModal/>
            <DeleteModal/>


            <ToastContainer/>
        </Row>
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
    }
}

export default connect(mapStateToProps, {getStreets, updateState, getHouses, getFlats, getClients})(App);
/**
 * Created by Sherlock on 07.11.2021.
 */
import {UPDATE_STATE} from "../types/allType";
import axios from "axios";
import {API_PATH} from "../../utils/constants";
import {toast} from "react-toastify";

export function updateState(data){
    return {
        type: UPDATE_STATE,
        payload: data
    }
}

export const getStreets = () => (dispatch) => {
    axios.get(API_PATH + "Request/streets")
        .then(res => {
            if (res.data){
                dispatch(updateState({streets: res.data.filter(item => item.cityId === 1)}))
            }
        })
        .catch(err => {
            toast.error("Ощибка");
        })
}

export const getHouses = (streetId) => (dispatch) => {
    axios.get(API_PATH + "Request/houses/" + streetId)
        .then(res => {
            if (res.data){
                dispatch(updateState({houses: res.data, selectedStreet: streetId, selectedHouse: null, selectedFlat: null}))
            }
        })
        .catch(err => {
            toast.error("Ощибка");
        })
}

export const getFlats = (houseId) => (dispatch) => {
    axios.get(API_PATH + "Request/house_flats/" + houseId)
        .then(res => {
            if (res.data){
                dispatch(updateState({flats: res.data, selectedHouse: houseId, selectedFlat: null}))
            }
        })
        .catch(err => {
            toast.error("Ощибка");
        })
}

export const getClients = (flatId) => (dispatch) => {
    axios.get(API_PATH + "HousingStock/clients?addressId=" + flatId)
        .then(res => {
            if (res.data){
                dispatch(updateState({clients: res.data}))
            }
        })
        .catch(err => {
            toast.error("Ощибка");
        })
        .finally(() =>{
            dispatch(updateState({selectedFlat: flatId}))
        })
}

export const addClient = (data) => (dispatch, getState) => {
    axios.post(API_PATH + "HousingStock/client", {...data, "BindId": getState().all.selectedFlat, Phone: "+7" + data.Phone, Id: getState().all.selectedClient ? getState().all.selectedClient.id : null})
        .then(res => {
            if (res.data.id && getState().all.selectedClient === null){
                axios.put(API_PATH + "HousingStock/bind_client", {AddressId: getState().all.selectedFlat, ClientId: res.data.id})
                    .then(response => {
                        if (response.status === 200){
                            toast.success("Выполнено")
                            dispatch(updateState({modalShow: false}))
                            dispatch(getClients(getState().all.selectedFlat));
                        } else {
                            toast.error("Ощибка");
                        }
                    })
            } else if (res.status === 200) {
                toast.success("Выполнено")
                dispatch(updateState({modalShow: false}))
                dispatch(getClients(getState().all.selectedFlat));
            }
        })
        .catch(err => {
            toast.error("Ощибка");
        })
}

export const deleteClient = () => (dispatch, getState) => {
    axios.delete(API_PATH + "HousingStock/bind_client/" + getState().all.selectedForDelete)
        .then(res => {
            if (res.status === 200){
                toast.success("Выполнено")
                dispatch(updateState({showDelete: false}))
                dispatch(getClients(getState().all.selectedFlat));
            } else {
                toast.error("Ощибка");
            }
        })
        .catch(err => {
            toast.error("Ощибка");
        })
}
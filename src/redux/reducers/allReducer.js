/**
 * Created by Sherlock on 07.11.2021.
 */
import {UPDATE_STATE} from "../types/allType";

const initialState = {
    streets: [],
    houses: [],
    flats: [],
    clients: [],
    selectedStreet: null,
    selectedHouse: null,
    selectedFlat: null,
    selectedClient: null,
    modalShow: false,
    selectedForDelete: null
}

export const allReducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state;
    }
}
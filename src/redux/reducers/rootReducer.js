/**
 * Created by Sherlock on 07.11.2021.
 */
import {combineReducers} from "redux";
import {allReducer} from "./allReducer";


export const rootReducer = combineReducers({
    all: allReducer
});
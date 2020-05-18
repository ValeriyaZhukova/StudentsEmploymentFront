import {combineReducers} from "redux";
import authReeducer from "./authReducer";

export default combineReducers({
    auth: authReeducer
})
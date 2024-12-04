import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAuth, handleResponse } from "./userAction";

import {
    createAdvertiseRequest,
    createAdvertisSuccess,
    createAdvertisFailure,
    getAdvertiseRequest,
    getAdvertiseSuccess,
    getAdvertiseFailure,
    updateAdvertiseRequest,
    updateAdvertiseSuccess,
    updateAdvertiseFailure,
    deleteAdvertiseRequest,
    deleteAdvertiseSuccess,
    deleteAdvertiseFailure,
    readSingleAdvertiseRequest,
    readSingleAdvertiseSuccess,
    readSingleAdvertiseFailure,
    getClientAdvertiseRequest,
    getClientAdvertiseSuccess,
    getClientAdvertiseFailure,
    resetAdvertiseReducerRequest,
    resetAdvertiseReducerSuccess,
    resetAdvertiseReducerFailure,
} from '../Reducers/advertiseReducer'

// export const getCookie = (key) => {
//     const isServer = (typeof window === 'undefined') ? false : true;
//     if(isServer){
//         return Cookie.get(key);
//     }
// }

// create advertise action
export const createAdvertiseAction = (title, link, body, type, mode, images) => async (dispatch) => {
    try{
        // dispatch(createAdvertiseRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/advertise/create/advertise`, {title, link, body, type, mode, images, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            // dispatch(createAdvertisSuccess(data));
        }
    }catch(error){
        // dispatch(createAdvertisFailure(error));
    }
}
// create advertise action
// update advertise actions
export const updateAdvertiseActions = (title, link, body, type, mode, images, advertiseId, closeImages) => async (dispatch) => {
    try{
        dispatch(updateAdvertiseRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/advertise/update/advertise`, {title, link, body, type, mode, images, advertiseId, closeImages, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateAdvertiseSuccess(data));
        }
    }catch(error){
        dispatch(updateAdvertiseFailure(error));
    }
}
// update advertise actions
// get advertise actions
export const getAdvertiseActions = () => async (dispatch) =>  {
    try{
        dispatch(getAdvertiseRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/advertise/get-advertise`, {token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getAdvertiseSuccess(data));
        }
    }catch(error){
        // dispatch(getAdvertiseFailure(error));
    }
}
// get advertise actions
// read single advertise action sarts
export const readSingleAdvertiseAction = (advertiseId) => async (dispatch) => {
    try{
        dispatch(readSingleAdvertiseRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/advertise/get-update-advertise`, {advertiseId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(readSingleAdvertiseSuccess(data));
        }
    }catch(error){
        dispatch(readSingleAdvertiseFailure(error));
    }
}
// read single advertise action ends
// delete advertise actions
export const deleteAdvertiseActions = (advertiseId) => async (dispatch) => {
    try{
        dispatch(deleteAdvertiseRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/advertise/delete/advertise`, {advertiseId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteAdvertiseSuccess(data));
        }
    }catch(error){
        dispatch(deleteAdvertiseFailure(error));
    }
}
// delete advertise actions

// get client advertise action
export const getClientAdvertiseActions = () => async (dispatch) =>  {
    try{
        dispatch(getClientAdvertiseRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/advertise/get-client-advertise`, {token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getClientAdvertiseSuccess(data));
        }
    }catch(error){
        dispatch(getClientAdvertiseFailure(error));
    }
}
// get client advertise action

// reset advertise actions



export const resetAdvertiseActions = (status) => async (dispatch) =>  {
    try{
        dispatch(resetAdvertiseReducerRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        let data = status;
        dispatch(resetAdvertiseReducerSuccess(data));
    }catch(error){
        dispatch(resetAdvertiseReducerFailure(error));
    }
}
// reset advertise actions

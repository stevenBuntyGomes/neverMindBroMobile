import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    createTagRequest,
    createTagSuccess,
    createTagFailure,
    getTagsRequest,
    getTagsSuccess,
    getTagsFailure,
    getTagRequest,
    getTagSuccess,
    getTagFailure,
    deleteTagRequest,
    deleteTagSuccess,
    deleteTagFailure,
 } from "../Reducers/tagReducer";


export const createTags = (name) => async (dispatch) => {
    try{
        dispatch(createTagRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/tag/createTag`, {name, token}, config);
        dispatch(createTagSuccess(data));
    }catch(error){
        dispatch(createTagFailure(error));
    }
}

export const getTags = () => async (dispatch) => {
    try{
        dispatch(getTagsRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/tag/tags`, {token}, config);
        dispatch(getTagsSuccess(data));
    }catch(error){
        dispatch(getTagsFailure(error.message));
    }
}
// get tags timeline
export const getTagsTimeline = () => async (dispatch) => {
    try{
        dispatch(getTagsRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/tag/tags-timeline`, {token}, config);
        dispatch(getTagsSuccess(data));
    }catch(error){
        dispatch(getTagsFailure(error.message));
    }
}
// get tags timeline

export const singleTag = (slug) => async (dispatch) => {
    try{
        dispatch(getTagRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/tag/tag/${slug}`, config);
        dispatch(getTagSuccess(data));
    }catch(error){
        dispatch(getTagFailure(error));
    }
}


export const deleteTag = (slug) => async (dispatch) => {
    try{
        dispatch(deleteTagRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/tag/deleteTag/${slug}`, {token}, config);
        dispatch(deleteTagSuccess(data));
    }catch(error){
        dispatch(deleteTagFailure(error));
    }
}
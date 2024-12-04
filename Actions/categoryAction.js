import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    createCategoryRequest,
    createCategorySuccess,
    createCategoryFailure,
    getCategoriesRequest,
    getCategoriesSuccess,
    getCategoriesFailure,
    getCategoryRequest,
    getCategorySuccess,
    getCategoryFailure,
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFailure, 
} from "../Reducers/categoryReducer";

// export const getCookie = (key) => {
//     const isServer = (typeof window === 'undefined') ? false : true;
//     if(isServer){
//         return Cookie.get(key);
//     }
// }


export const createCategory = (name) => async (dispatch) => {
    try{
        dispatch(createCategoryRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/category/createCategory`, {name, token}, config);
        dispatch(createCategorySuccess(data));
    }catch(error){
        dispatch(createCategoryFailure(error));
    }
}

export const getCategory = () => async (dispatch) => {
    try{
        dispatch(getCategoriesRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/category/categories`, {token}, config);
        dispatch(getCategoriesSuccess(data));
    }catch(error){
        dispatch(getCategoriesFailure(error));
    }
}
// get categories for timeline
export const getCategoryTimeline = () => async (dispatch) => {
    try{
        dispatch(getCategoriesRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/category/categories-timeline`, {token}, config);
        dispatch(getCategoriesSuccess(data));
    }catch(error){
        dispatch(getCategoriesFailure(error));
    }
}
// get categories for timeline

export const singleCategory = (slug) => async (dispatch) => {
    try{
        dispatch(getCategoryRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/category/category/${slug}`, {token}, config);
        dispatch(getCategorySuccess(data));
    }catch(error){
        dispatch(getCategoryFailure(error));
    }
}


export const deleteCategory = (slug) => async (dispatch) => {
    try{
        dispatch(deleteCategoryRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/category/deleteCategory/${slug}`, {token}, config);
        dispatch(deleteCategorySuccess(data));
    }catch(error){
        dispatch(deleteCategoryFailure(error));
    }
}
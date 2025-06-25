import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    getUserRequest,
    getUserSuccess,
    getUserFailure,
    getPublicProfileRequest,
    getPublicProfileSuccess,
    getPublicProfileFailure,
    getPublicProfileUpdateRequest,
    getPublicProfileUpdateSuccess,
    getPublicProfileUpdateFailure,
    userImageUpdateRequest,
    userImageUpdateSuccess,
    userImageUpdateFailure,
    getAuthUserRequest,
    getAuthUserSuccess,
    getAuthUserFailure,
    getPublicUserForFollowRequest,
    getPublicUserForFollowSuccess,
    getPublicUserForFollowFailure,
    getProfileInformationsRequest,
    getProfileInformationsSuccess,
    getProfileInformationsFailure,
    userPasswordUpdateRequest,
    userPasswordUpdateSuccess,
    userPasswordUpdateFailure,
    getUserFilterUpdateRequest,
    getUserFilterUpdateSuccess,
    getUserFilterUpdateFailure,
 } from "../Reducers/userReducer";

// set local storage starts
export const setLocalStorage = (key, value) => {
    const isServer = (typeof window === 'undefined') ? false : true;
    if(isServer){
        localStorage.setItem(key, JSON.stringify(value));
    }
}
// set local storage ends


// public profile starts
export const userPublicProfile = (username) => async (dispatch) => {
    try{
        dispatch(getUserRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/auth/publicUserProfile`, {token}, config);
        dispatch(getUserSuccess(data));
    }catch(error){
        dispatch(getUserFailure(error));
    }
};
// public profile ends

// get public profile
export const getProfile = () => async (dispatch) => {
    try{
        dispatch(getPublicProfileRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/auth/publicUserProfile`, {token}, config);
        dispatch(getPublicProfileSuccess(data));
    }catch(error){
        dispatch(getPublicProfileFailure(error));
    }
}

// get profile information with question answers and blogs
export const getProfileInformationAction = (username) => async (dispatch) => {
    try{
        dispatch(getProfileInformationsRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/auth/user/ProfileInformation/${username}`, config);
        dispatch(getProfileInformationsSuccess(data));
    }catch(error){
        dispatch(getProfileInformationsFailure(error.message));
    }
}
// get profile information with question answers and blogs


// user update 
export const userUpdate = (username, name, email, about = '') => async (dispatch) => {
    try{
        dispatch(getPublicProfileUpdateRequest());
        
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/auth/publicUser/update`, {token, username, name, email, about}, config);
        setLocalStorage('user', data.user);
        dispatch(getPublicProfileUpdateSuccess(data));
    }catch(error){
        dispatch(getPublicProfileUpdateFailure(error));
    }
}

// user image update starts
export const userImageUpdateAciton = (profileImage) => async (dispatch) => {
    try{
        dispatch(userImageUpdateRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data} = await axios.post(`${API}/auth/publicUser/image/update`, {profileImage, token}, config);
        dispatch(userImageUpdateSuccess(data));
    }catch(error){
        dispatch(userImageUpdateFailure(error));
    }
}
// user image update ends

// update user password
export const updateUserPassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try{
        dispatch(userPasswordUpdateRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data} = await axios.post(`${API}/auth/publicUser/password/update`, {oldPassword, newPassword, confirmPassword}, config);
        dispatch(userPasswordUpdateSuccess(data));
    }catch(error){
        dispatch(userPasswordUpdateFailure(error.message));
    }
}
// update user password


// get Public user for Followers starts
export const publicUserForFollow = (username) => async (dispatch) => {
    try{
        dispatch(getPublicUserForFollowRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.get(`${API}/auth/user/${username}`, config);
        dispatch(getPublicUserForFollowSuccess(data));
    }catch(error){
        dispatch(getPublicUserForFollowFailure(error.message));
    }
};
// get Public user for Followers ends

// update content filter action starts
export const updateContentFilter = (filterFrequency) => async (dispatch) => {
    try{
        dispatch(getUserFilterUpdateRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/auth/publicUser/update/contentFilter`, {token, filterFrequency}, config);
        dispatch(getUserFilterUpdateSuccess(data));
    }catch(error){
        dispatch(getUserFilterUpdateFailure(error));
    }
};
// update content filter action ends

// get auth user in public action starts
export const getAuthUserInPublic = (username) => async (dispatch) => {
    try{
        dispatch(getAuthUserRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${API}/auth/publicUserProfile`, {token}, config);
        dispatch(getAuthUserSuccess(data));
    }catch(error){
        dispatch(getAuthUserFailure(error.message));
    }
};
// get auth user in public action ends
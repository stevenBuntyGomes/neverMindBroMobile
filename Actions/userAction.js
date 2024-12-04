import axios from "axios";
import {API} from '../config'
// import Cookies from "js-cookie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    signupRequest,
    preSignupRequest,
    preSignupSuccess,
    preSignupFailure,
    checkSignupCodeRequest,
    checkSignupCodeSuccess,
    checkSignupCodeFailure,
    signupSuccess,
    signupFailure,
    signinRequest,
    signinSuccess,
    signinFailure,
    getUserRequest,
    getUserSuccess,
    getUserFailure,
    getPublicProfileRequest,
    getPublicProfileSuccess,
    getPublicProfileFailure,
    getPublicProfileUpdateRequest,
    getPublicProfileUpdateSuccess,
    getPublicProfileUpdateFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
    resetPasswordCodeRequest,
    resetPasswordCodeSuccess,
    resetPasswordCodeFailure,
    signoutRequest,
    signoutSuccess,
    signoutFailure,
    userImageUpdateRequest,
    userImageUpdateSuccess,
    userImageUpdateFailure,
    followUserRequest,
    followUserSuccess,
    followUserFailure,
    getAuthUserRequest,
    getAuthUserSuccess,
    getAuthUserFailure,
    getPublicUserForFollowRequest,
    getPublicUserForFollowSuccess,
    getPublicUserForFollowFailure,
    getProfileInformationsRequest,
    getProfileInformationsSuccess,
    getProfileInformationsFailure,
    setTokenAppRequest,
    setTokenAppSuccess,
    setTokenAppFailure,
 } from "../Reducers/userReducer";


// export handle response starts
const handleResponse = async (res) => {
    if(res.status == 401){
            await AsyncStorage.removeItem('@token');
            dispatch(signoutRequest());
            const config = {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            };
            const {data} = await axios.post(`${API}/auth/signout`, config);
            dispatch(signoutSuccess(data));
            
            next();
            
        }else{
            return;
        }
}
// export handle response ends
// signup
// get profile
export const getUserProfile = () => async (dispatch) => {
    try{
        dispatch(getUserRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        // console.log(token);
        const {data, status} = await axios.post(`${API}/auth/profile`, {token}, config);
        if(status == 401){
            console.log("status is:", status);
            handleResponse(status);
        }else{
            dispatch(getUserSuccess(data));
        }
        
    }catch(error){
        if(error.response.status == 401){
            handleResponse(error.response.status);
            // removeCookie('token');
            // removeLocalStorage('user');
            // dispatch({type: "signoutRequest"});
            // const config = {
            //     headers: {
            //         "Accept": "application/json",
            //         "Content-Type": "application/json",
            //     },
            // };
            // const {data} = await axios.post(`${API}/auth/signout`, config);
            // dispatch({
            //     type: "signoutSuccess",
            //     payload: data,
            // });
        }
        dispatch(getUserFailure(error));
    }
}
// get profile
// pre signup method starts
export const preSignup = (name, email, password, profileImage) => async (dispatch) => {
    try{
        dispatch(preSignupRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/auth/pre-signup`, {name, email, password, profileImage}, config);
        dispatch(preSignupSuccess(data));
    }catch(error){
        let errorMessage = 'pre signuop error'
        dispatch(preSignupFailure(errorMessage));
    }
}
// pre signup method ends
// check signup code of user
export const checkSignupCodeAction = (token, code) => async (dispatch) => {
    try{
        dispatch(checkSignupCodeRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/auth/check-signup-code`, {token, code}, config);
        dispatch(checkSignupCodeSuccess(data));
    }catch(error){
        dispatch(checkSignupCodeFailure(error));
    }
}
// check signup code of user

// sign up method starts
export const signup = (token) => async (dispatch) => {
    try{
        dispatch(signupRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/auth/signup`, {token}, config);
        await AsyncStorage.setItem('@token', data.token);
        dispatch(signupSuccess(data));

    } catch(error){
        let signupErrorMsg = 'there is an error in signup';
        dispatch(signupFailure(signupErrorMsg));
    }
}

// signin
export const signin = (email, password) => async (dispatch) => {
    try{
        dispatch(signinRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data, status} = await axios.post(`${API}/auth/signin`, {email, password}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            await AsyncStorage.setItem('@token', data.token);
            dispatch(signinSuccess(data));
        }
        
    } catch(error){
        let errorMessage = 'sign in failure';
        dispatch(signinFailure(errorMessage));
    }
}

// set token for mobile app
export const setTokenApp = (authToken) => async (dispatch) => {
    try{
        dispatch(setTokenAppRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        dispatch(setTokenAppSuccess(authToken));
    }catch(error){
        dispatch(setTokenAppFailure(data));
    }
}
// set token for mobile app

// cookie
// export const setCookie = (key, value) => {
//     console.log('cookies is about to set');
//     Cookie.set(key, value, {
//         expires: 1,
//     })
// }

// get cookies
// export const removeCookie = async (key) => {
//     const isServer = (typeof window === 'undefined') ? false : true;
//     if(isServer){
//         Cookie.remove(key);
//     }
// }
// get cookies
// export const getCookie = (key) => {
//     const isServer = (typeof window === 'undefined') ? false : true;
//     if(isServer){
//         console.log('cookies is about to get');
//         return Cookie.get(key);
//     }
// }
// set local storagte
export const setLocalStorage = (key, value) => {
    const isServer = (typeof window === 'undefined') ? false : true;
    if(isServer){
        localStorage.setItem(key, JSON.stringify(value));
    }
}
// remove local storagte
export const removeLocalStorage = (key) => {
    const isServer = (typeof window === 'undefined') ? false : true;
    if(isServer){
        localStorage.removeItem(key);
    }
}

// authenticate user by passing data to cookie and localstorage
// export const authenticate = (token, user, next) => {
//     setCookie('token', token, { maxAge: 60 * 6 * 24 });
//     console.log('token is set here => ', token);
//     setLocalStorage('user', user);
//     next();
// }

export const isAuth = () => {
    // const isServer = (typeof window === 'undefined') ? false : true;
    // if(isServer){
    //     const cookieChecked = getCookie('token');
    //     if(cookieChecked !== null || cookieChecked !== undefined){
    //         if(localStorage.getItem('user') !== null || localStorage.getItem('user') !== undefined){
    //             // return JSON.parse(localStorage.getItem('user'));
    //             return cookieChecked;
    //         }else{
    //             return false;
    //         }
    //     }
    // }else{
    //     return;
    // }
}

// signout
export const signout = (next) => async (dispatch) => {
    try{
        await AsyncStorage.removeItem('@token');
        dispatch(signoutRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/auth/signout`, config);
        dispatch(signoutSuccess(data));
        
        next();

    }catch(error){
        dispatch(signoutFailure(error.message));
    }
    
}


// forgot password starts
export const forgotPasswordAction = (email) => async (dispatch) => {
    try{
        dispatch(forgotPasswordRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/auth/forgot-password`, {email}, config);
        dispatch(forgotPasswordSuccess(data));
    } catch(error){
        dispatch(forgotPasswordFailure(error));
    }
}
// forgot password ends
// reset password starts
export const resetPasswordAction = (resetPasswordLink, newPassword) => async (dispatch) => {
    try{
        dispatch(resetPasswordRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/auth/reset-password`, {resetPasswordLink, newPassword}, config);
        dispatch(resetPasswordSuccess(data));
    } catch(error){
        dispatch(resetPasswordFailure(error));
    }
}
// reset password ends
export const resetPasswordCodeAction = (fpToken, code) => async (dispatch) => {
    try{
        dispatch(resetPasswordCodeRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/auth/reset-password-code`, {fpToken, code}, config);
        dispatch(resetPasswordCodeSuccess(data));
    } catch(error){
        dispatch(resetPasswordCodeFailure(error));
    }
}
// reset password code

// login with google method starts
export const loginWithGoogle = (idToken) => async (dispatch) => {
    try{
        dispatch(signinRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/auth/google-login`, {idToken}, config);
        dispatch(signinSuccess(data));
    }catch(error){
        dispatch(signinFailure(error));
    }
}
// login with google method ends

// follow unfollow user action starts
export const followAndUnfollowUser = (id) => async (dispatch) => {
    try{
        dispatch(followUserRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        // console.log(token);
        const {data, status} = await axios.post(`${API}/auth/profile/follow`, {id, token}, config);
        if(status == 401){
            console.log("status is:", status);
            handleResponse(status);
        }else{
            dispatch(followUserSuccess(data));
        }
    } catch(error){
        dispatch(followUserFailure(error.response.data.message));
    }
}
// follow unfollow user action ends



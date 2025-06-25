import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    updatedUser: null,
    FollowUser: {},
    error: null,
    emailInfo: null,
    loading: false,
    token: null,
    message: null,
    success: false,
    auth: null,
    blogs: [],
    questions: [],
    answers: [],
    preToken: null,
    fpToken: null,
    codeActivation: 0,
};

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        registerSignError: (state, action) => {
            state.error = action.payload;
        },
        nullifySignError: (state, action) => {
            state.error = null;
            state.emailInfo = null;
        },
        nullifyMessage: (state, action) => {
            state.message = null;
        },
        nullifyPreToken: (state, action) => {
            state.error = null;
            state.preToken = null;
        },
        nullifyFpToken: (state, action) => {
            state.error = null;
            state.fpToken = null;
        },
        nullifyUpdatedUser: (state, action) => {
            state.error = null;
            state.updatedUser = null;
            state.message = null;
        },
        registerEmailInfo: (state, action) => {
            state.emailInfo = action.payload.message;
        },
        // pre sign up
        preSignupRequest: (state, action) => {
            state.loading = true;
        },
        preSignupSuccess: (state, action) => {
            state.loading = false;
            // state.user = action.payload.user;
            state.emailInfo = action.payload.message;
            state.preToken = action.payload.preToken;
        },
        preSignupFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // pre sign up
        // check signup code 
        checkSignupCodeRequest: (state, action) => {
            state.loading = true;
        },
        checkSignupCodeSuccess: (state, action) => {
            state.loading = false;
            state.codeActivation = action.payload.codeActivation;
            state.message = action.payload.message;
        },
        checkSignupCodeFailure: (state, action) => {
            state.loading = false;
        },
        // check signup code 
        signupRequest: (state, action) => {
            state.loading = true;
        },
        signupSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        signupFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signinRequest: (state, action) => {
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // user reducer starts
        // token for mobile app reducers
        setTokenAppRequest: (state, action) => {
            state.loading = true;
        },
        setTokenAppSuccess: (state, action) => {
            state.loading = false;
            state.token = action.payload;
        },
        setTokenAppFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // token for mobile app reducers
        getUserRequest: (state, action) => {
            state.loading = true;
        },
        getUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        getUserFailure: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
        },
        // user reducer ends

        // public profile starts
        getPublicProfileRequest: (state, action) => {
            state.loading = true;
        },
        getPublicProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        getPublicProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // public profile ends

        // update public user auth for everyone
        getPublicProfileUpdateRequest: (state, action) => {
            state.loading = true;
        },
        getPublicProfileUpdateSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.updatedUser = action.payload.user;
        },
        getPublicProfileUpdateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // update public user auth for everyone

        // forgot password reducer part starts
        forgotPasswordRequest: (state, action) => {
            state.loading = true;
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.fpToken = action.payload.fpToken;
        },
        forgotPasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // forgot password reducer part ends
        // reset password reducer starts
        resetPasswordRequest: (state, action) => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        resetPasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // reset password reducer ends
        // reset password code reducer starts
        resetPasswordCodeRequest: (state, action) => {
            state.loading = true;
        },
        resetPasswordCodeSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.codeActivation = action.payload.codeActivation;
        },
        resetPasswordCodeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        userPasswordUpdateRequest: (state, action) => {
            state.loading = true;
        },
        userPasswordUpdateSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.codeActivation = action.payload.codeActivation;
        },
        userPasswordUpdateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // reset password code reducer ends
        // sign out starts
        signoutRequest: (state, action) => {
            state.loading = true;
        },
        signoutSuccess: (state, action) => {
            state.loading = false;
            state.token = null;
            state.auth = null;
            state.user = null;
        },
        signoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // sign out ends
        userImageUpdateRequest: (state, action) => {
            state.loading = true;
        },
        userImageUpdateSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        userImageUpdateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        followUserRequest: (state, action) => {
            state.loading = true;
        },
        followUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.FollowUser = action.payload.user;
        },
        followUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        acceptFollowUserRequest: (state, action) => {
            state.loading = true;
        },
        acceptFollowUserSuccess: (state, action) => {
            state.loading = false;
            // state.user = action.payload;
            state.FollowUser = action.payload.user;
        },
        acceptFollowUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        rejectFollowUserRequest: (state, action) => {
            state.loading = true;
        },
        rejectFollowUserSuccess: (state, action) => {
            state.loading = false;
            // state.user = action.payload;
            state.FollowUser = action.payload.user;
        },
        rejectFollowUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        cancelFollowUserRequest: (state, action) => {
            state.loading = true;
        },
        cancelFollowUserSuccess: (state, action) => {
            state.loading = false;
            // state.user = action.payload;
            state.FollowUser = action.payload.user;
        },
        cancelFollowUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get user for follwo request
        // get auth user reducer starts
        getAuthUserRequest: (state, action) => {
            state.loading = true;
        },
        getAuthUserSuccess: (state, action) => {
            state.loading = false;
            state.auth = action.payload.user;
        },
        getAuthUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get auth user reducer ends

        // get public user for follwo starts
        getPublicUserForFollowRequest: (state, action) => {
            state.loading = true;
        },
        getPublicUserForFollowSuccess: (state, action) => {
            state.loading = false;
            state.FollowUser = action.payload.user;
        },
        getPublicUserForFollowFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get public user for follwo ends
        // get profile user information
        getProfileInformationsRequest: (state, action) => {
            state.loading = true;
        },
        getProfileInformationsSuccess: (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
            // state.questions = action.payload.questions;
            // state.answers = action.payload.answers;
        },
        getProfileInformationsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get profile user information 
        getUserFilterUpdateRequest: (state, action) => {
            state.loading = true;
        },
        getUserFilterUpdateSuccess: (state, action) => {
            state.loading = false;
            state.auth = action.payload.user;
            state.message = action.payload.message;
            // state.questions = action.payload.questions;
            // state.answers = action.payload.answers;
        },
        getUserFilterUpdateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get user filter update
    }
});
export const {
    registerSignError,
    nullifySignError,
    nullifyPreToken,
    nullifyFpToken,
    nullifyUpdatedUser,
    preSignupRequest,
    preSignupSuccess,
    preSignupFailure,
    checkSignupCodeRequest,
    checkSignupCodeSuccess,
    checkSignupCodeFailure,
    userPasswordUpdateRequest,
    userPasswordUpdateSuccess,
    userPasswordUpdateFailure,
    signupRequest,
    signupSuccess,
    signupFailure,
    signinRequest,
    signinSuccess,
    signinFailure,
    setTokenAppRequest,
    setTokenAppSuccess,
    setTokenAppFailure,
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
    acceptFollowUserRequest,
    acceptFollowUserSuccess,
    acceptFollowUserFailure,
    rejectFollowUserRequest,
    rejectFollowUserSuccess,
    rejectFollowUserFailure,
    cancelFollowUserRequest,
    cancelFollowUserSuccess,
    cancelFollowUserFailure,
    getAuthUserRequest,
    getAuthUserSuccess,
    getAuthUserFailure,
    getPublicUserForFollowRequest,
    getPublicUserForFollowSuccess,
    getPublicUserForFollowFailure,
    getProfileInformationsRequest,
    getProfileInformationsSuccess,
    getProfileInformationsFailure,
    getUserFilterUpdateRequest,
    getUserFilterUpdateSuccess,
    getUserFilterUpdateFailure,
    nullifyMessage,
} = userReducer.actions;

export default userReducer.reducer;
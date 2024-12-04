import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    advertise: {},
    newAdvertise: {},
    advertises: [],
    message: null,
    loading: false,
    error: null,
    add01: {},
    add02: {},
    add03: {},
    add04: {},
    resetAdvertise: 0,
};

const AdvertiseReducer = createSlice({
    name: 'advertiseReducer',
    initialState,
    reducers: {
        // create advertise starts
        createAdvertiseRequest: (state, action) => {
            state.loading = true;
        },
        createAdvertisSuccess: (state, action) => {
            state.loading = false;
            state.newAdvertise = action.payload.advertise;
            state.message = action.payload.message;
            state.newAdvertise = action.payload.advertise;
        },
        createAdvertisFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // create advertise ends
        // get advertise starts
        getAdvertiseRequest: (state, action) => {
            state.loading = true;
        },
        getAdvertiseSuccess: (state, action) => {
            state.loading = false;
            state.advertises = action.payload.advertises;
        },
        getAdvertiseFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get advertise ends
        // update advertise starts
        updateAdvertiseRequest: (state, action) => {
            state.loading = true;
        },
        updateAdvertiseSuccess: (state, action) => {
            state.loading = false;
        },
        updateAdvertiseFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // update advertise ends
        // delete advertise starts
        deleteAdvertiseRequest: (state, action) => {
            state.loading = true;
        },
        deleteAdvertiseSuccess: (state, action) => {
            state.loading = false;
            state.advertises = action.payload.advertises;
            state.message = action.payload.message;
        },
        deleteAdvertiseFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // delete advertise ends
        readSingleAdvertiseRequest: (state, action) => {
            state.loading = true;
        },
        readSingleAdvertiseSuccess: (state, action) => {
            state.loading = false;
            state.advertise = action.payload.advertise;
        },
        readSingleAdvertiseFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get advertise for client
        getClientAdvertiseRequest: (state, action) => {
            state.loading = true;
        },
        getClientAdvertiseSuccess: (state, action) => {
            state.loading = false;
            state.add01 = action.payload.add01;
            state.add02 = action.payload.add02;      
            state.add03 = action.payload.add03;      
            state.add04 = action.payload.add04; 
            state.advertises = action.payload.advertises;
        },
        getClientAdvertiseFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get advertise for client
        resetAdvertiseReducerRequest: (state, action) => {
            state.loading = true;
        },
        resetAdvertiseReducerSuccess: (state, action) => {
            state.loading = false;
            state.resetAdvertise = action.payload;
        },
        resetAdvertiseReducerFailure: (state, action) => {
            state.loading = false;
            state.resetAdvertise = action.payload;
        },
    }
});

export const {
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
} = AdvertiseReducer.actions;

export default AdvertiseReducer.reducer;
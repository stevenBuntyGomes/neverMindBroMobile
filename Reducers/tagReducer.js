import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    tag: {},
    tags: [],
    loading: false,
    token: null,
    error: null,
    message: null,
};

const tagReducer = createSlice({
    name: 'tagReducer',
    initialState,
    reducers: {
        createTagRequest: (state, action) => {
            state.loading = true;
        },
        createTagSuccess: (state, action) => {
            state.loading = false;
            state.tags = [action.payload.tag, ...state.tags];
            state.message = "tag created successful";
        },
        createTagFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get tags
        getTagsRequest: (state, action) => {
            state.loading = true;
        },
        getTagsSuccess: (state, action) => {
            state.loading = false;
            state.tags = action.payload.tags;
        },
        getTagsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get single tag
        getTagRequest: (state, action) => {
            state.loading = true;
        },
        getTagSuccess: (state, action) => {
            state.loading = true;
            state.tag = action.payload.tag;
        },
        getTagFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete tag
        deleteTagRequest: (state, action) => {
            state.loading = true;
        },
        deleteTagSuccess: (state, action) => {
            state.loading = false;
            const index = state.tags.findIndex((l) => l._id === action.payload.tagId);
            if(index !== -1){
                state.tags.splice(index, 1); 
            }
            state.message = action.payload.message;
        },
        deleteTagFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
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
} = tagReducer.actions;

export default tagReducer.reducer;
// export const tagReducerOld = createReducer(initialState, {
//     // create tags
//     createTagRequest: (state, action) => {
//         state.loading = true;
//     },
//     createTagSuccess: (state, action) => {
//         state.loading = false;
//         state.tags = [action.payload.tag, ...state.tags];
//         state.message = "tag created successful";
//     },
//     createTagFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // get tags
//     getTagsRequest: (state, action) => {
//         state.loading = true;
//     },
//     getTagsSuccess: (state, action) => {
//         state.loading = false;
//         state.tags = action.payload.tags;
//     },
//     getTagsFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // get single tag
//     getTagRequest: (state, action) => {
//         state.loading = true;
//     },
//     getTagSuccess: (state, action) => {
//         state.loading = true;
//         state.tag = action.payload.tag;
//     },
//     getTagFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // delete tag
//     deleteTagRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteTagSuccess: (state, action) => {
//         state.loading = false;
//         const index = state.tags.findIndex((l) => l._id === action.payload.tagId);
//         if(index !== -1){
//             state.tags.splice(index, 1); 
//         }
//         state.message = action.payload.message;
//     },
//     deleteTagFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
// });
import {createReducer, createSlice} from '@reduxjs/toolkit'

const initialState = {
    category: {},
    categories: [],
    loading: false,
    token: null,
    error: null,
    message: null,
};

const categoryReducer = createSlice({
    name: 'categoryReducer',
    initialState,
    reducers: {
        createCategoryRequest: (state, action) => {
            state.loading = true;
        },
        createCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories = [action.payload.category, ...state.categories];
            state.message = "category created successful";
        },
        createCategoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get categories
        getCategoriesRequest: (state, action) => {
            state.loading = true;
        },
        getCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        },
        getCategoriesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // update categories
        getCategoryRequest: (state, action) => {
            state.loading = true;
        },
        getCategorySuccess: (state, action) => {
            state.loading = false;
            state.category = action.payload.category;
        },
        getCategoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete categories
        deleteCategoryRequest: (state, action) => {
            state.loading = true;
        },
        deleteCategorySuccess: (state, action) => {
            state.loading = false;
            const index = state.categories.findIndex((l) => l._id === action.payload.categoryId);
            if(index !== -1){
                state.categories.splice(index, 1);
            }
            state.message = action.payload.message;
        },
        deleteCategoryFailure: (state, action) => {
            state.loading = false;
            state.category = action.payload.category;
        },
    }
});

export const {
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
} = categoryReducer.actions;

export default categoryReducer.reducer;

// export const categoryReducerOld = createReducer(initialState, {
//     createCategoryRequest: (state, action) => {
//         state.loading = true;
//     },
//     createCategorySuccess: (state, action) => {
//         state.loading = false;
//         state.categories = [action.payload.category, ...state.categories];
//         state.message = "category created successful";
//     },
//     createCategoryFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // get categories
//     getCategoriesRequest: (state, action) => {
//         state.loading = true;
//     },
//     getCategoriesSuccess: (state, action) => {
//         state.loading = false;
//         state.categories = action.payload.categories;
//     },
//     getCategoriesFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // update categories
//     getCategoryRequest: (state, action) => {
//         state.loading = true;
//     },
//     getCategorySuccess: (state, action) => {
//         state.loading = false;
//         state.category = action.payload.category;
//     },
//     getCategoryFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // delete categories
//     deleteCategoryRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteCategorySuccess: (state, action) => {
//         state.loading = false;
//         const index = state.categories.findIndex((l) => l._id === action.payload.categoryId);
//         if(index !== -1){
//             state.categories.splice(index, 1);
//         }
//         state.message = action.payload.message;
//     },
//     deleteCategoryFailure: (state, action) => {
//         state.loading = false;
//         state.category = action.payload.category;
//     },
// });
import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    blogs: [],
    blogsFollowers: [],
    blogsCatTags: [],
    blog:{},
    newBlog: null,
    updatedBlog: null,
    message: null,
    blogDeleteMessage: null,
    newBlogMessage: null,
    updateBlogMessage: null,
    loading: false,
    error: null,
    categories: [],
    tags: [],
    size: 0,
    popularSize: 0,
    tagsSize: 0,
    searchBlog: [],
    searchUser: [],
    searchQuestions: [],
    questionSize: null,
    blogSize: null,
    userSize: null,
};

const blogReducer = createSlice({
    name: 'blogReducer',
    initialState,
    reducers: {
        nullifyBlogMessage: (state, action) => {
            state.newBlogMessage = null;
            state.updateBlogMessage = null;
        },
        nullifyBlog: (state, action) => {
            state.newBlog = null;
            state.updatedBlog = null;
            state.blogDeleteMessage = null;
        },
        createBlogRequest: (state, action) => {
            state.loading = true;
        },
        createBlogSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
            state.message = action.payload.message;
            state.newBlogMessage = action.payload.message;
            state.newBlog = action.payload.blog;
        },
        createBlogFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // create blogs
        // get blogs list with categories and tags
        getBlogsWithCategoryTagsRequest: (state, action) => {
            state.loading = true;
        },
        getBlogsWithCategoryTagsSuccess: (state, action) => {
            state.loading = false;
            state.blogsCatTags = action.payload.blogs;
            state.tagsSize = action.payload.size;
        },
        getBlogsWithCategoryTagsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get blogs
        // get pfofile blogs informations
        getProfileBlogsRequest: (state, action) => {
            state.loading = true;
        },
        getProfileBlogsSuccess: (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
            state.size = action.payload.size;
        },
        getProfileBlogsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get pfofile blogs informations

        // get single blog read
        readSingleBlogRequest: (state, action) => {
            state.loading = true;
        },
        readSingleBlogSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
            state.newBlog = null;
            state.updatedBlog = null;
            state.blogDeleteMessage = null;
        },
        readSingleBlogFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get single blog read

        // get related blogs
        getRelatedBlogsRequest: (state, action) => {
            state.loading = true;
        },
        getRelatedBlogsSuccess: (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
        },
        getRelatedBlogsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get related blogs
        // get blog list without limit
        getBlogListRequest: (state, action) => {
            state.loading = true;
        },
        getBlogListSuccess: (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
        },
        getBlogListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get popular blogs starts
        getBlogPopularRequest: (state, action) => {
            state.loading = true;
        },
        getBlogPopularSuccess: (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
            state.popularSize = action.payload.size;
        },
        getBlogPopularFailure: (state, action) => {
            state.blogs = false;
            state.error = action.payload.error;
        },
        // get popular blogs ends
        // get blogs by followers followings
        getBlogsFollowersFollowingsRequest: (state, action) => {
            state.loading = true;
        },
        getBlogsFollowersFollowingsSuccess: (state, action) => {
            state.loading = false;
            state.blogsFollowers = action.payload.blogs;
            state.size = action.payload.size;
        },
        getBlogsFollowersFollowingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get blogs by followers followings
        // remove blog 
        removeBlogRequest: (state, action) => {
            state.loading = true;
        },
        removeBlogSuccess: (state, action) => {
            state.loading = false;
            state.blogDeleteMessage = action.payload.message;
            const index = state.blogs.findIndex((l) => l._id === action.payload.blogId);
            if(index !== -1){
                state.blogs.splice(index, 1);
            }
            const indexFollowers = state.blogsFollowers.findIndex((l) => l._id === action.payload.blogId);
            if(indexFollowers !== -1){
                state.blogsFollowers.splice(indexFollowers, 1);
            }
            const indexCatTags = state.blogsCatTags.findIndex((l) => l._id === action.payload.blogId);
            if(indexCatTags !== -1){
                state.blogsCatTags.splice(indexCatTags, 1);
            }
        },
        removeBlogFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // remove blog 
                // update blog 
        updateBlogRequest: (state, action) => {
            state.loading = true;
        },
        updateBlogSuccess: (state, action) => {
            state.loading = false;
            // state.message = action.payload.message;
            state.blog = action.payload.blog;
            state.updatedBlog = action.payload.blog;
            const index = state.blogs.findIndex((l) => l._id === action.payload.blog._id);
            if(index !== -1){
                state.blogs[index] = action.payload.blog;
            }
            state.updateBlogMessage = action.payload.message;
        },
        updateBlogFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // update blog 

        // search blog results reducer part starts
        getSearchBlogAllRequest: (state, action) => {
            state.loading = true;
        },
        getSearchBlogAllSuccess: (state, action) => {
            state.loading = false;
            state.searchBlog = action.payload.blogs;
            state.searchUser = action.payload.users;
            state.searchQuestions = action.payload.questions;
            state.questionSize = action.payload.questionSize;
            state.blogSize = action.payload.blogSize;
            state.userSize = action.payload.userSize;
        },
        getSearchBlogAllFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // search blog results reducer part ends
        // empty search blog 
        emptySearchBlogRequest: (state, action) => {
            state.loading = true;
        },
        emptySearchBlogSuccess: (state, action) => {
            state.loading = false;
            state.searchBlog = action.payload;
            state.searchUser = action.payload;
            state.searchQuestions = action.payload;
        },
        emptySearchBlogFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // empty search blog 

        // like unlike blog by user starts
        likeUnlikeBlogRequest: (state, action) => {
            state.loading = true;
        },
        likeUnlikeBlogSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        likeUnlikeBlogFailure: (state, action) => {
            state.loading = false;
        },
        // like unlike blog by user ends

        // add comment on blog reducer starts
        addCommentOnBlogRequest: (state, action) => {
            state.loading = true;
        },
        addCommentOnBlogSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        addCommentOnBlogFailure: (state, action) => {
            state.loading = false;
            state.error = "error on adding comment on blog";
        },
        // add comment on blog reducer ends
        // add remove likes on blog comments start
        addRemoveCommentLikeRequest: (state, action) => {
            state.loading = true;
        },
        addRemoveCommentLikeSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        addRemoveCommentLikeFailure: (state, action) => {
            state.loading = false;
            state.error = "error on adding removing likes on blog comment";
        },
        // add remove likes on blog comments ends
        // add replies on blog comments starts
        addReplyOnBlogCommentActionRequest: (state, action) => {
            state.loading = true;
        },
        addReplyOnBlogCommentActionSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        addReplyOnBlogCommentActionFailure: (state, action) => {
            state.loading = false;
            state.error = "error on adding replies on blog comment";
        },
        // add replies on blog comments ends
        // addremove likes on blog reply starts
        addRemoveReplyLikeActionRequest: (state, action) => {
            state.loading = true;
        },
        addRemoveReplyLikeActionSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        addRemoveReplyLikeActionFailure: (state, action) => {
            state.loading = false;
            state.error = "error on adding replies on blog comment";
        },
        // addremove likes on blog reply ends
        // delete reply from comment on blog starts
        deleteReplyOnCommentRequest: (state, action) => {
            state.loading = true;
        },
        deleteReplyOnCommentSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        deleteReplyOnCommentFailure: (state, action) => {
            state.loading = false;
            state.error = "error on adding replies on blog comment";
        },
        // delete reply from comment on blog ends
        // delete comments on blog reducer starts
        deleteCommentOnBlogRequest: (state, action) => {
            state.loading = true;
        },
        deleteCommentOnBlogSuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        deleteCommentOnBlogFailure: (state, action) => {
            state.loading = false;
            state.error = "error on adding replies on blog comment";
        },
        // delete comments on blog reducer ends
        // update blog comment reducer starts
        updateCommentOnBlogRequest: (state, action) => {
            state.loading = true;
        },
        updateCommentOnBloguccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        updateCommentOnBlogFailure: (state, action) => {
            state.loading = false;
            state.error = "error on adding replies on blog comment";
        },
        // update blog comment reducer ends
        // update reply in blog comment starts
        updateReplyOnBlogCommentRequest: (state, action) => {
            state.loading = true;
        },
        updateReplyOnBlogCommentsuccess: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },
        updateReplyOnBlogCommentFailure: (state, action) => {
            state.loading = false;
            state.error = "error on adding replies on blog comment";
        },
    }
});

export const {
    nullifyBlogMessage,
    nullifyBlog,
    createBlogRequest,
    createBlogSuccess,
    createBlogFailure,
    getBlogsWithCategoryTagsRequest,
    getBlogsWithCategoryTagsSuccess,
    getBlogsWithCategoryTagsFailure,
    getProfileBlogsRequest,
    getProfileBlogsSuccess,
    getProfileBlogsFailure,
    readSingleBlogRequest,
    readSingleBlogSuccess,
    readSingleBlogFailure,
    getRelatedBlogsRequest,
    getRelatedBlogsSuccess,
    getRelatedBlogsFailure,
    getBlogListRequest,
    getBlogListSuccess,
    getBlogListFailure,
    getBlogPopularRequest,
    getBlogPopularSuccess,
    getBlogPopularFailure,
    getBlogsFollowersFollowingsRequest,
    getBlogsFollowersFollowingsSuccess,
    getBlogsFollowersFollowingsFailure,
    updateBlogRequest,
    updateBlogSuccess,
    updateBlogFailure,
    removeBlogRequest,
    removeBlogSuccess,
    removeBlogFailure,
    getSearchBlogAllRequest,
    getSearchBlogAllSuccess,
    getSearchBlogAllFailure,
    emptySearchBlogRequest,
    emptySearchBlogSuccess,
    emptySearchBlogFailure,
    likeUnlikeBlogRequest,
    likeUnlikeBlogSuccess,
    likeUnlikeBlogFailure,
    addCommentOnBlogRequest,
    addCommentOnBlogSuccess,
    addCommentOnBlogFailure,
    addRemoveCommentLikeRequest,
    addRemoveCommentLikeSuccess,
    addRemoveCommentLikeFailure,
    addReplyOnBlogCommentActionRequest,
    addReplyOnBlogCommentActionSuccess,
    addReplyOnBlogCommentActionFailure,
    addRemoveReplyLikeActionRequest,
    addRemoveReplyLikeActionSuccess,
    addRemoveReplyLikeActionFailure,
    deleteReplyOnCommentRequest,
    deleteReplyOnCommentSuccess,
    deleteReplyOnCommentFailure,
    deleteCommentOnBlogRequest,
    deleteCommentOnBlogSuccess,
    deleteCommentOnBlogFailure,
    updateCommentOnBlogRequest,
    updateCommentOnBloguccess,
    updateCommentOnBlogFailure,
    updateReplyOnBlogCommentRequest,
    updateReplyOnBlogCommentsuccess,
    updateReplyOnBlogCommentFailure,
} = blogReducer.actions;

export default blogReducer.reducer;

// export const blogReducerOld = createReducer(initialState, {
//     // create blogs
//     createBlogRequest: (state, action) => {
//         state.loading = true;
//     },
//     createBlogSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//         state.message = action.payload.message;
//         state.newBlog = action.payload.blog;
//     },
//     createBlogFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // create blogs
//     // get blogs list with categories and tags
//     getBlogsWithCategoryTagsRequest: (state, action) => {
//         state.loading = true;
//     },
//     getBlogsWithCategoryTagsSuccess: (state, action) => {
//         state.loading = false;
//         state.blogsCatTags = action.payload.blogs;
//         state.size = action.payload.size;
//     },
//     getBlogsWithCategoryTagsFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // get blogs
//     // get pfofile blogs informations
//     getProfileBlogsRequest: (state, action) => {
//         state.loading = true;
//     },
//     getProfileBlogsSuccess: (state, action) => {
//         state.loading = false;
//         state.blogs = action.payload.blogs;
//         state.size = action.payload.size;
//     },
//     getProfileBlogsFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // get pfofile blogs informations

//     // get single blog read
//     readSingleBlogRequest: (state, action) => {
//         state.loading = true;
//     },
//     readSingleBlogSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     readSingleBlogFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // get single blog read

//     // get related blogs
//     getRelatedBlogsRequest: (state, action) => {
//         state.loading = true;
//     },
//     getRelatedBlogsSuccess: (state, action) => {
//         state.loading = false;
//         state.blogs = action.payload.blogs;
//     },
//     getRelatedBlogsFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // get related blogs
//     // get blog list without limit
//     getBlogListRequest: (state, action) => {
//         state.loading = true;
//     },
//     getBlogListSuccess: (state, action) => {
//         state.loading = false;
//         state.blogs = action.payload.blogs;
//     },
//     getBlogListFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // get blogs by followers followings
//     getBlogsFollowersFollowingsRequest: (state, action) => {
//         state.loading = true;
//     },
//     getBlogsFollowersFollowingsSuccess: (state, action) => {
//         state.loading = false;
//         state.blogsFollowers = action.payload.blogs;
//         state.size = action.payload.size;
//     },
//     getBlogsFollowersFollowingsFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // get blogs by followers followings
//     // remove blog 
//     removeBlogRequest: (state, action) => {
//         state.loading = true;
//     },
//     removeBlogSuccess: (state, action) => {
//         state.loading = false;
//         state.message = action.payload.message;
//         const index = state.blogs.findIndex((l) => l._id === action.payload.blogId);
//         if(index !== -1){
//             state.blogs.splice(index, 1);
//         }
//     },
//     removeBlogFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // remove blog 

//     // search blog results reducer part starts
//     getSearchBlogAllRequest: (state, action) => {
//         state.loading = true;
//     },
//     getSearchBlogAllSuccess: (state, action) => {
//         state.loading = false;
//         state.searchBlog = action.payload.blogs;
//         state.searchUser = action.payload.users;
//         state.searchQuestions = action.payload.questions;
//         state.questionSize = action.payload.questionSize;
//         state.blogSize = action.payload.blogSize;
//         state.userSize = action.payload.userSize;
//     },
//     getSearchBlogAllFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // search blog results reducer part ends
//     // empty search blog 
//     emptySearchBlogRequest: (state, action) => {
//         state.loading = true;
//     },
//     emptySearchBlogSuccess: (state, action) => {
//         state.loading = false;
//         state.searchBlog = action.payload;
//         state.searchUser = action.payload;
//         state.searchQuestions = action.payload;
//     },
//     emptySearchBlogFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // empty search blog 

//     // like unlike blog by user starts
//     likeUnlikeBlogRequest: (state, action) => {
//         state.loading = true;
//     },
//     likeUnlikeBlogSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     likeUnlikeBlogFailure: (state, action) => {
//         state.loading = false;
//     },
//     // like unlike blog by user ends

//     // add comment on blog reducer starts
//     addCommentOnBlogRequest: (state, action) => {
//         state.loading = true;
//     },
//     addCommentOnBlogSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     addCommentOnBlogFailure: (state, action) => {
//         state.loading = false;
//         state.error = "error on adding comment on blog";
//     },
//     // add comment on blog reducer ends
//     // add remove likes on blog comments start
//     addRemoveCommentLikeRequest: (state, action) => {
//         state.loading = true;
//     },
//     addRemoveCommentLikeSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     addRemoveCommentLikeFailure: (state, action) => {
//         state.loading = false;
//         state.error = "error on adding removing likes on blog comment";
//     },
//     // add remove likes on blog comments ends
//     // add replies on blog comments starts
//     addReplyOnBlogCommentActionRequest: (state, action) => {
//         state.loading = true;
//     },
//     addReplyOnBlogCommentActionSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     addReplyOnBlogCommentActionFailure: (state, action) => {
//         state.loading = false;
//         state.error = "error on adding replies on blog comment";
//     },
//     // add replies on blog comments ends
//     // addremove likes on blog reply starts
//     addRemoveReplyLikeActionRequest: (state, action) => {
//         state.loading = true;
//     },
//     addRemoveReplyLikeActionSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     addRemoveReplyLikeActionFailure: (state, action) => {
//         state.loading = false;
//         state.error = "error on adding replies on blog comment";
//     },
//     // addremove likes on blog reply ends
//     // delete reply from comment on blog starts
//     deleteReplyOnCommentRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteReplyOnCommentSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     deleteReplyOnCommentFailure: (state, action) => {
//         state.loading = false;
//         state.error = "error on adding replies on blog comment";
//     },
//     // delete reply from comment on blog ends
//     // delete comments on blog reducer starts
//     deleteCommentOnBlogRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteCommentOnBlogSuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     deleteCommentOnBlogFailure: (state, action) => {
//         state.loading = false;
//         state.error = "error on adding replies on blog comment";
//     },
//     // delete comments on blog reducer ends
//     // update blog comment reducer starts
//     updateCommentOnBlogRequest: (state, action) => {
//         state.loading = true;
//     },
//     updateCommentOnBloguccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     updateCommentOnBlogFailure: (state, action) => {
//         state.loading = false;
//         state.error = "error on adding replies on blog comment";
//     },
//     // update blog comment reducer ends
//     // update reply in blog comment starts
//     updateReplyOnBlogCommentRequest: (state, action) => {
//         state.loading = true;
//     },
//     updateReplyOnBlogCommentsuccess: (state, action) => {
//         state.loading = false;
//         state.blog = action.payload.blog;
//     },
//     updateReplyOnBlogCommentFailure: (state, action) => {
//         state.loading = false;
//         state.error = "error on adding replies on blog comment";
//     },
//     // update reply in blog comment ends
// });

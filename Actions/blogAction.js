import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import queryString from 'query-string';
import { isAuth, handleResponse } from "./userAction"; 
import {
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
    getSearchUserChatRequest,
    getSearchUserChatSuccess,
    getSearchUserChatFailure,
    emptySearchBlogRequest,
    emptySearchBlogSuccess,
    emptySearchBlogFailure,
    likeUnlikeBlogRequest,
    likeUnlikeBlogSuccess,
    likeUnlikeBlogFailure,
} from '../Reducers/blogReducer' 


// export const getCookie = (key) => {
//     const isServer = (typeof window === 'undefined') ? false : true;
//     if(isServer){
//         return Cookie.get(key);
//     }
// }

// create blogs
// export const createBlog = (formData) => async (dispatch) => {
export const createBlog = (title, body, checked, checkedTag, featureImage, images) => async (dispatch) => {
    try{
        dispatch(createBlogRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/createBlog`, {title, body, categories: checked, tags: checkedTag, featureImage, images}, config);
        // const {data, status} = await axios.post(`${API}/blog/createBlog`, formData, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createBlogSuccess(data));
            // dispatch({
            //     type: "createBlogSuccess",
            //     payload: data,
            // });
        }
        
    }catch(error){ 
        dispatch(createBlogFailure(error.response.data.message));
    }
}

// get blogs list
export const blogListWithCategoryTags = (skip, limit, selectedCategories, selectedTags) => async (dispatch) => {
    try{
        dispatch(getBlogsWithCategoryTagsRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/blogs-categories-tags`, {skip, limit, selectedCategories, selectedTags}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getBlogsWithCategoryTagsSuccess(data));
        }
    }catch(error){
        dispatch(getBlogsWithCategoryTagsFailure(error.message));
    }
}

// blogs of followers and followings
export const getBlogsPopular = (skip, limit) => async (dispatch) => {
    try{
        dispatch(getBlogPopularRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/blogs-popular`, {skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getBlogPopularSuccess(data));
        }
    }catch(error){
        dispatch(getBlogPopularFailure(error.message));
    }
}
// blogs of followers and followings
// blogs of followers and followings
export const getBlogsFollowersFollowings = (skip, limit) => async (dispatch) => {
    try{
        dispatch(getBlogsFollowersFollowingsRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/blogs-followers-followings`, {skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getBlogsFollowersFollowingsSuccess(data));
        }
    }catch(error){
        dispatch(getBlogsFollowersFollowingsFailure(error));
    }
}
// blogs of followers and followings

// read single blog
export const readSingleBlog = (slug) => async (dispatch) => {
    try{
        dispatch(readSingleBlogRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/blog/${slug}`, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(readSingleBlogSuccess(data));
        }    
    }catch(error){
        dispatch(readSingleBlogFailure(error.message));
    }
}

// get related blogs

export const getRelatedBlogs = (blog, limit = 3) => async (dispatch) => {
    try{
        dispatch(getRelatedBlogsRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/blogs/related`, {blog, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getRelatedBlogsSuccess(data));
        }    
        
    }catch(error){
        dispatch(getRelatedBlogsFailure(error));
    }
}

// get blog list without categories and tags
export const getListBlogs = (username) => async (dispatch) => {
    try{
        dispatch(getBlogListRequest());
        let listBlogEndpoint;
        if(username){
            listBlogEndpoint = `${API}/blog/${username}/blogs`;
        }else{
            listBlogEndpoint = `${API}/blog/blogs`;
        }

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${listBlogEndpoint}`, {token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getBlogListSuccess(data));
        } 
        
    }catch(error){
        dispatch(getBlogListFailure(error));
    }
}

// remove/delete blogs
export const removeBlogs = (slug, role) => async (dispatch) => {
    try{
        dispatch(removeBlogRequest());
        let removeBlogEndpoint;
        if(role == 0){
            removeBlogEndpoint = `${API}/blog/removeBlog/user/${slug}`;
        }else if(role == 1){
            removeBlogEndpoint = `${API}/blog/removeBlog/${slug}`;
        }

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${removeBlogEndpoint}`, {token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(removeBlogSuccess(data));
        } 
        
    }catch(error){
        dispatch(removeBlogFailure(error));
    }
}

// update blogs
export const updateBlog = (title, body, selectedCategories, selectedTags, featureImage, images, closeFeatureImage, closeImages, slug, role) => async (dispatch) => {
    try{
        dispatch(updateBlogRequest());

        let updateUserEndpoint;
        if(role == 1){
            updateUserEndpoint = `${API}/blog/updateBlog/${slug}`;
        }else if(role == 0){
            updateUserEndpoint = `${API}/blog/updateBlog/user/${slug}`;
        }

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${updateUserEndpoint}`, {title, body, categories: selectedCategories, tags: selectedTags, featureImage, images, closeFeatureImage, closeImages}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateBlogSuccess(data));
        } 
    }catch(error){
        dispatch(updateBlogFailure(error.message));
    }
}


// search blogs nurmal without login
export const searchBlogsAll = (params) => async (dispatch) => {
    try{
        dispatch(getSearchBlogAllRequest());

        let query = queryString.stringify(params);

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.get(`${API}/blog/blogs/search?${query}`, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getSearchBlogAllSuccess(data));
        } 
    }catch(error){
        dispatch(getSearchBlogAllFailure(error.message));
    }
}

// searchh user for chat starts
export const searchUserChats = (params) => async (dispatch) => {
    try{
        dispatch(getSearchUserChatRequest());
        let query = queryString.stringify(params);
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.get(`${API}/blog/blogs/search_user_chat?${query}`, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getSearchUserChatSuccess(data));
        } 
    }catch(error){
        dispatch(getSearchUserChatFailure(error.message));
    }
}
// searchh user for chat ends

// empty search blog
export const emptySearchBlog = () => async (dispatch) => {
    try{
        dispatch(emptySearchBlogRequest());

        const data = '';
        dispatch(emptySearchBlogSuccess(data));
    }catch(error){
        dispatch(emptySearchBlogFailure(error));
    }
}
// empty search blog

// public user create blog starts
export const createBlogPublicUser = (title, body, checked, checkedTag, featureImage, images) => async (dispatch) => {
    try{
        dispatch(createBlogRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/createBlog/user`, {title, body, categories: checked, tags: checkedTag, featureImage, images}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createBlogSuccess(data));
        }  
    }catch(error){
        dispatch(createBlogFailure(error.response.data.message));
    }
}
// public user create blog startsends
// update blog public user starts
export const updateBlogPublicUser = (title, body, selectedCategories, selectedTags, featureImage, images, slug) => async (dispatch) => {
    try{
        dispatch(updateBlogRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/updateBlog/user/${slug}`, {title, body, categories: selectedCategories, tags: selectedTags, featureImage, images}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateBlogSuccess(data));    
        }  
    }catch(error){
        dispatch(updateBlogFailure(error.message));
    }
}
// update blog public user ends

// like and unlike blogs start
export const likeUnlikeBlogs = (slug) => async (dispatch) => {
    try{
        dispatch(likeUnlikeBlogRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/like/user/${slug}`, {token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(likeUnlikeBlogSuccess(data));
        }  
    }catch(error){
        dispatch(likeUnlikeBlogFailure(error));
    }
}
// like and unlike blogs ends

// get profile blogs
export const getProfileBlogsAction = (username, skip, limit) => async (dispatch) => {
    try{
        dispatch(getProfileBlogsRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/get/blogs/profile`, {username, skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getProfileBlogsSuccess(data));
        }  
    }catch(error){
        dispatch(getProfileBlogsFailure(error));
    }
}
// get profile blogs


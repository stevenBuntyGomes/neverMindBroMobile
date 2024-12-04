import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    createQuestionRequest,
    createQuestionSuccess,
    createQuestionFailure,
    updateQuestionRequest,
    updateQuestionSuccess,
    updateQuestionFailure,
    getQuestionRequest,
    getQuestionSuccess,
    getQuestionFailure,
    getQuestionPopularRequest,
    getQuestionPopularSuccess,
    getQuestionPopularFailure,
    getQuestionCatTagsRequest,
    getQuestionCatTagsSuccess,
    getQuestionCatTagsFailure,
    addAnswerRequest,
    addAnswerSuccess,
    addAnswerFailure,
    updateAnswerRequest,
    updateAnswerSuccess,
    updateAnswerFailure,
    readSingleQuestionRequest,
    readSingleQuestionSuccess,
    readSingleQuestionFailure,
    likeUnlikeAnswerRequest,
    likeUnlikeAnswerSuccess,
    likeUnlikeAnswerFailure,
    getReactionAnswerRequest,
    getReactionAnswerSuccess,
    getReactionAnswerFailure,
    followUnfollowQuestionRequest,
    followUnfollowQuestionSuccess,
    followUnfollowQuestionFailure,
    getProfileQuestionRequest,
    getProfileQuestionSuccess,
    getProfileQuestionFailure,
    getProfileAnswerRequest,
    getProfileAnswerSuccess,
    getProfileAnswerFailure,
    deleteQuestionRequest,
    deleteQuestionSuccess,
    deleteQuestionFailure,
    deleteAnswerRequest,
    deleteAnswerSuccess,
    deleteAnswerFailure,
 } from "../Reducers/QuestionAnswerReducer";

export const createQuestion = (question, categories, tags) => async (dispatch) => {
    try{
        dispatch(createQuestionRequest());
        let skip = 0;
        let limit = 2;
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/create-question`, {
            question, 
            categories, 
            tags, 
            skip, 
            limit,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createQuestionSuccess(data));
        }
    }catch(error){
        dispatch(createQuestionFailure(error));
    }
}

export const getQiuestionPopular = (skip, limit) => async (dispatch) => {
    try{
        dispatch(getQuestionPopularRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/get-question-user`, {skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getQuestionPopularSuccess(data));
        }
    }catch(error){
        dispatch(getQuestionPopularFailure(error.message));
    }
}

// get question action
export const getQuestion = (skip, limit) => async (dispatch) => {
    try{
        dispatch(getQuestionRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/get-question-following-followers`, {skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getQuestionSuccess(data));
        }
    }catch(error){
        dispatch(getQuestionFailure(error.message));
    }
}
// get question action
// get questions with categories and tags
export const getQuestionsCategoriesTags = (skip, limit, selectedCategories, selectedTags) => async (dispatch) => {
    try{
        dispatch(getQuestionCatTagsRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/get-question-categories-tags`, {skip, limit, selectedCategories, selectedTags}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getQuestionCatTagsSuccess(data));
        }
    }catch(error){
        dispatch(getQuestionCatTagsFailure(error.message));
    }
}
// get questions with categories and tags
// add answer to a question starts
export const answerToQuestionAction = (question_id, body, images) => async (dispatch) => {
    try{
        dispatch(addAnswerRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/answer-to-question-user`, {question_id, body, images, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addAnswerSuccess(data));
        }

    }catch(error){
        dispatch(addAnswerFailure(error.message));
    }
}
// add answer to a question ends

// read single question starts
export const readSingleQuestion = (slug, skip, limit) => async (dispatch) => {
    try{
        dispatch(readSingleQuestionRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data, status} = await axios.post(`${API}/question/get-question/${slug}`, {skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(readSingleQuestionSuccess(data));
        }
    }catch(error){
        dispatch(readSingleQuestionFailure(error));
    }
}
// read single question ends
// get reaction answer action
export const getReactionAnswer = (answerId) => async (dispatch) => {
    try{
        dispatch(getReactionAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`,
            },
        };
        const {data, status} = await axios.post(`${API}/question/reaction/answer/user`, {answerId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getReactionAnswerSuccess(data));
        }
    }catch(error){
        dispatch(getReactionAnswerFailure(error));
    }
}
// get reaction answer action
// like unlike user action
export const likeUnlikeAnswersAction = (answerId) => async (dispatch) => {
    try{
        dispatch(likeUnlikeAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`,
            },
        };
        const {data, status} = await axios.post(`${API}/question/like/answer/user`, {answerId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(likeUnlikeAnswerSuccess(data));
        }
    }catch(error){
        dispatch(likeUnlikeAnswerFailure(error));
    }
}
// like unlike user action

// follow unfollow question action
export const followUnfollowQuestionAction = (questionId) => async (dispatch) => {
    try{
        dispatch(followUnfollowQuestionRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`,
            },
        };
        const {data, status} = await axios.post(`${API}/question/follow/user`, {questionId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(followUnfollowQuestionSuccess(data));
        }
    }catch(error){
        dispatch(followUnfollowQuestionFailure(error.message));
    }
}
// follow unfollow question action

// get Profile question action
export const getProfileQuestionAction = (username, skip, limit) => async (dispatch) => {
    try{
        dispatch(getProfileQuestionRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`,
            },
        };
        const {data, status} = await axios.post(`${API}/question/profileQuestion/get`, {username, skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getProfileQuestionSuccess(data));
        }
    }catch(error){
        dispatch(getProfileQuestionFailure(error.message));
    }
}

// get profile answers
export const getProfileAnswerAction = (username, skip, limit) => async (dispatch) => {
    try{
        dispatch(getProfileAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`,
            },
        };
        const {data, status} = await axios.post(`${API}/question/get/profileAnswer`, {username, skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getProfileAnswerSuccess(data));
        }
    }catch(error){
        dispatch(getProfileAnswerFailure(error));
    }
}

// get profile answers

// delete question action start
export const deleteQuestionAction = (questionId) => async (dispatch) => {
    try{
        dispatch(deleteQuestionRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`,
            },
        };
        const {data, status} = await axios.post(`${API}/question/delete/question`, {questionId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteQuestionSuccess(data));
        }
    }catch(error){
        dispatch(deleteQuestionFailure(error.message));
    }
}
// delete question action ends
// delete answer action starts
export const deleteAnswerAction = (answerId) => async (dispatch) => {
    try{
        dispatch(deleteAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`,
            },
        };
        const {data, status} = await axios.post(`${API}/question/delete/answer`, {answerId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteAnswerSuccess(data));
        }
    }catch(error){
        dispatch(deleteAnswerFailure(error.message));
    }
}
// delete answer action ends
// update question start
export const updateQuestionAction = (questionId, question, categories = [], tags = []) => async (dispatch) => {
    try{
        dispatch(updateQuestionRequest());
        let skip = 0;
        let limit = 2;
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/update/question`, {
            questionId,
            question, 
            categories, 
            tags, 
            skip, 
            limit,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateQuestionSuccess(data));
        }
    }catch(error){
        dispatch(updateQuestionFailure(error));
    }
}
// update question ends
// update answer action starts
export const updateAnswerAction = (answer_id, answerBody, images) => async (dispatch) => {
    try{
        dispatch(updateAnswerRequest());

        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/update-answer-to-question-user`, {answer_id, answerBody, images, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateAnswerSuccess(data));
        }

    }catch(error){
        dispatch(updateAnswerFailure(error));
    }
}
// update answer action ends
import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAuth, handleResponse } from "./userAction"; 
import {
    userChatRequest,
    userChatSuccess,
    userChatFailure,
    fetchChatsRequest,
    fetchChatsSuccess,
    fetchChatsFailure,
    createGroupChatRequest,
    createGroupChatSuccess,
    createGroupChatFailure,
    selectedChatRequest,
    selectedChatSuccess,
    selectedChatFailure,
    renameGroupChatRequest,
    renameGroupChatSuccess,
    renameGroupChatFailure,
    groupChatAddMemberRequest,
    groupChatAddMemberSuccess,
    groupChatAddMemberFailure,
    groupChatRemoveMemberRequest,
    groupChatRemoveMemberSuccess,
    groupChatRemoveMemberFailure,
    searchUserRequest,
    searchUserSuccess,
    searchUserFailuer,  
} from '../Reducers/chatReducer'
import {     
    markMessageNotificationRequest,
    markMessageNotificationSuccess,
    markMessageNotificationFailure
} from '../Reducers/messageReducer'


export const userChat = (userId) => async (dispatch) => {
    try{
        dispatch(userChatRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };


        const {data, status} = await axios.post(`${API}/chat/chats`, {userId}, config);
        // const {data, status} = await axios.post(`${API}/blog/createBlog`, formData, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(userChatSuccess(data));
        }
    }catch(error){
        dispatch(userChatFailure(error.response.data.message));
    }
}

export const fetchChats = (skip, limit) => async (dispatch) => {
    try{
        dispatch(fetchChatsRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };

        const {data, status} = await axios.post(`${API}/chat/fetchChats`, {skip, limit}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(fetchChatsSuccess(data));
        }
    }catch(error){
        dispatch(fetchChatsFailure(error.message));
    }
}

// create group chat action
export const createGroupChat = ({name, users}) => async (dispatch) => {
    try{
        dispatch(createGroupChatRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/chat/group`, {
            name: name, 
            users: users,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createGroupChatSuccess(data));
        }
    }catch(error){
        dispatch(createGroupChatFailure(error.response.data.message));
    }
}

// set selectedChat
export const setSelectedChat = (chat) => async (dispatch) => {
    try{
        dispatch(selectedChatRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/chat/mark_unread_chats`, {chat}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            await dispatch(selectedChatSuccess(data));
        }
       
    }catch(error){
        dispatch(selectedChatFailure(error.response.data.message));
    }
}

// read notifications
export const setReadNotifications = () => async (dispatch) => {
    try{
        dispatch(markMessageNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/messages/read_message_notification`, {token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            await dispatch(markMessageNotificationSuccess(data));
        }
    }catch(error){
        dispatch(markMessageNotificationFailure(error));
    }
}
// read notifications


export const groupChatRename = (setSelectedChat, groupChatName) => async (dispatch) => {
    try{
        dispatch(renameGroupChatRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/chat/rename`, {
            chatId: setSelectedChat._id,
            chatName: groupChatName, 
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(renameGroupChatSuccess(data));
        }
    }catch(error){
        dispatch(renameGroupChatFailure(error));
    }
}

// 
export const groupChatAddMember = (setSelectedChat, user) => async (dispatch) => {
    try{
        dispatch(groupChatAddMemberRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/chat/groupadd`, {
            chatId: setSelectedChat._id,
            userId: user._id, 
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(groupChatAddMemberSuccess(data));
        }
    }catch(error){
        dispatch(groupChatAddMemberFailure(error));
    }
}

export const groupChatRemoveMember = (setSelectedChat, user) => async (dispatch) => {
    try{
        dispatch(groupChatRemoveMemberRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/chat/groupremove`, {
            chatId: setSelectedChat._id,
            userId: user._id, 
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(groupChatRemoveMemberSuccess(data));
        }
    }catch(error){
        dispatch(groupChatRemoveMemberFailure(error));
    }
}


// search user
export const searchUserAction = (search) => async (dispatch) => {
    try{
        const token = await AsyncStorage.getItem('@token');
        dispatch(searchUserRequest());
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const { data, status } = await axios.post(`${API}/chat/search_chat_user/search`, {search, token}, config);
        
        if(status == 401){
            console.log("status is:", status);
            handleResponse(status);
        }else{
            dispatch(searchUserSuccess(data));
        }
    }catch(error){
        dispatch(searchUserFailuer(error));
        //     type: "searchUserFailuer",
        //     payload: error.response.data.message,
        // });
    }
} 
// search user
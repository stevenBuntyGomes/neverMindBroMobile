import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    userChats: [],
    error: null,
    chat: null,
    newChat: null,
    chatSize: 0,
    searchChatUsers: [],
    userSize: 0,
};

export const userChatReducer = createSlice({
    name: 'userChatReducer',
    initialState,
    reducers: {
        userChatRequest: (state, action) => {
            state.loading= true;
        },
        userChatSuccess: (state, action) => {
            state.chat = action.payload.chat;
            state.userChats = [action.payload.chat, ...state.userChats];
        },
        userChatFailure: (state, action) => {

        },

        // fetch Chats
        fetchChatsRequest: (state, action) =>{
            state.loading = true;
        },
        fetchChatsSuccess: (state, action) => {
            state.loading = false;
            state.userChats = action.payload.chats;
            state.chatSize = action.payload.size;
        },
        fetchChatsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // createGroupChatRequest
    // createGroupChatSuccess
    // createGroupChatFailure
        createGroupChatRequest: (state, action) => {
            state.loading = true;
        },
        createGroupChatSuccess: (state, action) => {
            state.loading = false;
            state.userChats.chats = [action.payload.fullGroupChat, ...state.userChats.chats];
        },
        createGroupChatFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // selected chat reducer part
        selectedChatRequest: (state) => {
            state.loading = true;
        },
        selectedChatSuccess: (state, action) => {
            state.loading = false;
            state.chat = action.payload.chat;
            // const filteredChats = state.userChats.filter(chat => chat._id !== action.payload.chat._id);
            // // Add the chat to the top of the array
            // state.userChats = [action.payload.chat, ...filteredChats];
        },
        nullifyChatsuccess: (state, action) => {
            state.loading = false;
            state.chat = null;
        },
        selectedChatFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        notificationChatSuccess: (state, action) => {
            state.loading = false;
            state.newChat = action.payload;
        },
        // group chat rename reducer
        renameGroupChatRequest: (state, action) => {
            state.loading = true;
        },
        renameGroupChatSuccess: (state, action) => {
            state.loading = false;
            state.chat = action.payload.updatedChat;
            const index = state.userChats.findIndex((l) => l._id === action.payload.updatedChat._id);
            if(index !== -1){
                state.userChats[index].chatName = action.payload.updatedChat.chatName;

            }
        },
        renameGroupChatFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // group chat add member reducers
        groupChatAddMemberRequest: (state, action) => {
            state.loading = true;
        },
        groupChatAddMemberSuccess: (state, action) => {
            state.loading = false;
            // state.chat = null;
            state.chat= action.payload.updatedChat; 
            // const index = state.userChats.chats.findIndex((l) => l._id === action.payload.updatedChat._id);
            // if(index !== -1){
            //     // state.userChats.chats[index].users = action.payload.updatedChat.users;
                
            // }
        },
        groupChatAddMemberFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // remove members from group chat
        groupChatRemoveMemberRequest: (state, action) => {
            state.loading = true;
        },
        groupChatRemoveMemberSuccess: (state, action) => {
            state.loading = false;
            // state.chat = null;
            state.chat= action.payload.updatedChat; 
            // const index = state.userChats?.chats.findIndex((l) => l._id === action.payload.updatedChat._id);
            // if(index !== -1){
            //     state.userChats.chats[index].users = action.payload.updatedChat.users;
            //     state.chat= action.payload.updatedChat; 
            // }
        },
        groupChatRemoveMemberFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // search user reducer starts
        searchUserRequest: (state, action) => {
            state.loading = true;
        },
        searchUserSuccess: (state, action) => {
            state.loading = false;
            state.searchChatUsers = action.payload.users;
            state.userSize = action.payload.size;
            // state.questions = action.payload.questions;
            // state.answers = action.payload.answers;
        },
        searchUserFailuer: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // search user reducer ends
        emptySearchUser: (state, action) => {
            state.loading = false;
            state.searchChatUsers = [];
        },
        
    }


    
});

export const {
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
    nullifyChatsuccess,
    selectedChatFailure,
    notificationChatSuccess,
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
    emptySearchUser,
} = userChatReducer.actions;

export default userChatReducer.reducer;
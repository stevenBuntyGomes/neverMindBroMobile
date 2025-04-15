import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    messages: [],
    error: null,
    messageSocket: null,
    messageSocketSuccess: false,
    messageNotifications: [],
    lastMessage: null,
    messageReceivedNotify: null,
    typingState: false,
    deleteMessageId: null,
    newMessageReceived: null,
}

export const messageReducer = createSlice({
    name: 'messageReducer',
    initialState,
    reducers: {
            nulifyNewMessageSuccess: (state, action) => {
                state.newMessageReceived = null;
            },
            messageReceivedSuccess: (state, action) => {
                state.messageReceivedNotify = action.payload;
            },
            messageTypingSuccess: (state, action) => {
                state.typingState = action.payload;
            },
            sendMessageRequest: (state, action) => {
                state.loading = true;
            },
            
            sendMessageSuccess: (state, action) => {
                state.loading = false;
                state.lastMessage = action.payload.message;
                // state.messages = [...state.messages, action.payload]; 
                state.newMessageReceived = action.payload;
            },

            sendMessageSocketFalse: (state, action) => {
                state.messageSocket = null;
                state.messageSocketSuccess = false;
            },

            sendMessageFailure: (state, action) => {
                state.loading = true;
                state.error = action.payload;
            },

            // fetchMessages reducer
            fetchMessageRequest: (state, action) => {
                state.loading = true;
            },
            fetchMessageSuccess: (state, action) => {
                state.loading = false;
                state.messages = action.payload.messages;
            },
            fetchMessageFailure: (state, action) => {
                state.loading = false;
            },
            receivedMessageRequest: (state, action) => {
                state.loading = true;
            },
            receivedMessageSuccess: (state, action) => {
                state.loading = false;
                state.messages = [...state.messages, action.payload];
            },
            receivedMessageFailure: (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },

            sendMessageNotificationRequest: (state, action) => {
                state.loading = true;
            },
            sendMessageNotificationSuccess: (state, action) => {
                state.loading = false;
                state.messageNotifications = [...action.payload.notifications];
            },
            sendMessageNotificationfailure: (state, action) => {
                state.loading = false;
            },
            markMessageNotificationRequest: (state, action) => {
                state.loading = true;
            },
            markMessageNotificationSuccess: (state, action) => {
                state.loading = false;
                state.messageNotifications = [...action.payload.notifications];
            },
            markMessageNotificationFailure: (state, action) => {
                state.loading = false;
            },
            deleteMessageRequest: (state, action) => {
                state.loading = true;
            },
            deleteMessageSuccess: (state, action) => {
                state.loading = false;
                state.deleteMessageId = action.payload.messageId;
            },
            nullifyDelMesageIdSuccess: (state, action) => {
                state.loading = false;
                state.deleteMessageId = null;
            },
            deleteMessagefailure: (state, action) => {
                state.loading = false;
            },
    }

});
export const {
    nulifyNewMessageSuccess,
    messageReceivedSuccess,
    messageTypingSuccess,
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageSocketFalse,
    sendMessageFailure,
    fetchMessageRequest,
    fetchMessageSuccess,
    fetchMessageFailure,
    receivedMessageRequest,
    receivedMessageSuccess,
    receivedMessageFailure,
    sendMessageNotificationRequest,
    sendMessageNotificationSuccess,
    sendMessageNotificationfailure,
    markMessageNotificationRequest,
    markMessageNotificationSuccess,
    markMessageNotificationFailure,
    deleteMessageRequest,
    deleteMessageSuccess,
    deleteMessagefailure,
    nullifyDelMesageIdSuccess,
} = messageReducer.actions;
export default messageReducer.reducer;


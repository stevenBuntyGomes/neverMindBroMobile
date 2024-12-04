import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    notifications: [],
    deleteNotifications: [],
    notification: null,
    loading: false,
    error: null,
    notificationSize: null,
    loadNotificationToken: null,
    delNotifyId: null,
    removeNotifyId: null,
    newNotificationCount: 0,
    unreadNotifications: null,
}

const notificationReducer = createSlice({
    name: 'notificationReducer',
    initialState,
    reducers: {
        nullifyNotifications: (state, action) => {
            state.unreadNotifications ; null;
        },
        createQuestionRequest: (state, action) => {
            state.loading = true;
        },
        createLikeNotificationRequest: (state, action) => {
            state.loading = true;
        },
        createLikeNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.notification = action.payload.notification;
            state.notifications = [notification, ...state.notifications];
        },
        createLikeNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // create comment like notification action starts
        createCommentLikeNotificationRequest: (state, action) => {
            state.loading = true;
        },
        createCommentLikeNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.notification = action.payload.notification;
            state.notifications = [notification, ...state.notifications];
        },
        createCommentLikeNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // create comment like notification action ends
        createQuestionNotificationRequest: (state, action) => {
            state.loading = true;
        },
        createQuestionNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.notification = action.payload.notification;
            state.notifications = [notification, ...state.notifications];
        },
        createQuestionNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // create answer notification starts
        createAnswerNotificationRequest: (state, action) => {
            state.loading = true;
        },
        createAnswerNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.notification = action.payload.notification;
            state.notifications = [notification, ...state.notifications];
        },
        createAnswerNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // create answer notification ends
        // create reply on comment notification reducer starts
        createreplyCommentNotificationRequest: (state, action) => {
            state.loading = true;
        },
        createreplyCommentNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.notification = action.payload.notification;
            state.notifications = [notification, ...state.notifications];
        },
        createreplyCommentNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // create reply on comment notification reducer ends
        // get user notifications reducer
        getUserNotificationRequest: (state, action) => {
            state.loading = true;
        },
        getUserNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.notifications = action.payload.notifications;
            state.unreadNotifications = null;
            state.notificationSize = action.payload.size;
            state.loadNotificationToken = action.payload.token;
        },
        getUserNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get user notifications reducer
        // get unread notifications
        getUnreadNotificationRequest: (state, action) => {
            state.loading = true;
        },
        getUnreadNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.unreadNotifications = action.payload.notifications;
            state.notificationSize = action.payload.size;
            // state.loadNotificationToken = action.payload.token;
        },
        getUnreadNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get unread notifications
        // get read all user notifications 
        readAllUserNotificationsRequest: (state, action) => {
            state.loading = true;
        },
        readAllUserNotificationsSuccess: (state, action) => {
            state.loading = false;  
            state.unreadNotifications = null;
            // state.loadNotificationToken = action.payload.token;
        },
        readAllUserNotificationsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get read all user notifications 
        // get user delete notification reducer
        getDeleteNotificationRequest: (state, action) => {
            state.loading = true;
        },
        getDeleteNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.deleteNotifications = action.payload.notifications;
            state.notificationSize = action.payload.size;
            state.loadNotificationToken = action.payload.token;
        },
        getDeleteNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get user delete notification reducer
        // notification bar update
        notificationBarUpdateRequest: (state, action) => {
            state.loading = true;
        },
        notificationBarUpdateSuccess: (state, action) => {
            state.loading = false;  
            state.notification = action.payload;
            state.notifications = [action.payload, ...state.notifications];
        },
        notificationBarUpdateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // notification bar update
        // notification count update handler
        notificationCountUpdateRequest: (state, action) => {
            state.loading = true;
        },
        notificationCountUpdateSuccess: (state, action) => {
            state.loading = false;  
            state.notification = null;
        },  
        notificationCountUpdateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // notification count update handler
        // remove user notification reducer starts
        removeUserNotificationRequest: (state, action) => {
            state.loading = true;
        },
        removeUserNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.notification = action.payload.notification;
            const index = state.notifications.findIndex((l) => l._id == action.payload.notification._id);
            state.removeNotifyId = action.payload.notification._id;
            if(index !== -1){
                state.notifications.splice(index, 1);
            }
        },
        removeUserNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // remove user notification reducer ends
        // delete user notification permanently
        deleteUserNotificationPermanentlyRequest: (state, action) => {
            state.loading = true;
        },
        deleteUserNotificationPermanentlySuccess: (state, action) => {
            state.loading = false;
            state.delNotifyId = action.payload.notifyId;  
            const index = state.deleteNotifications.findIndex((l) => l._id == action.payload.notifyId);
            if(index !== -1){
                state.deleteNotifications.splice(index, 1);
            }
        },
        deleteUserNotificationPermanentlyFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete user notification permanently
        // create answer comment notification action starts
        createAnswerCommentNotificationRequest: (state, action) => {
            state.loading = true;
        },
        createAnswerCommentNotificationSuccess: () => {
            state.loading = false;  
            state.notification = action.payload.notification;
            state.notifications = [notification, ...state.notifications];
        },
        createAnswerCommentNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    // create answer comment notification action ends
        // create blog like notification
        blogLikeNotificationRequest: (state, action) => {
            state.loading = true;
        },
        blogLikeNotificationSuccess: (state, action) => {
            state.loading = false;  
            state.notification = action.payload.notification;
            state.notifications = [notification, ...state.notifications];
        },
        blogLikeNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        }, 
        // create blog like notification 
    }
});

export const {
    createQuestionRequest,
    createLikeNotificationRequest,
    createLikeNotificationSuccess,
    createLikeNotificationFailure,
    createCommentLikeNotificationRequest,
    createCommentLikeNotificationSuccess,
    createCommentLikeNotificationFailure,
    createQuestionNotificationRequest,
    createQuestionNotificationSuccess,
    createQuestionNotificationFailure,
    createAnswerNotificationRequest,
    createAnswerNotificationSuccess,
    createAnswerNotificationFailure,
    createreplyCommentNotificationRequest,
    createreplyCommentNotificationSuccess,
    createreplyCommentNotificationFailure,
    getUserNotificationRequest,
    getUserNotificationSuccess,
    getUserNotificationFailure,
    getDeleteNotificationRequest,
    getDeleteNotificationSuccess,
    getDeleteNotificationFailure,
    notificationBarUpdateRequest,
    notificationBarUpdateSuccess,
    notificationBarUpdateFailure,
    notificationCountUpdateRequest,
    notificationCountUpdateSuccess,
    notificationCountUpdateFailure,
    removeUserNotificationRequest,
    removeUserNotificationSuccess,
    removeUserNotificationFailure,
    deleteUserNotificationPermanentlyRequest,
    deleteUserNotificationPermanentlySuccess,
    deleteUserNotificationPermanentlyFailure,
    createAnswerCommentNotificationRequest,
    createAnswerCommentNotificationSuccess,
    createAnswerCommentNotificationFailure,
    blogLikeNotificationRequest,
    blogLikeNotificationSuccess,
    blogLikeNotificationFailure,
    getUnreadNotificationRequest,
    getUnreadNotificationSuccess,
    getUnreadNotificationFailure,
    readAllUserNotificationsRequest,
    readAllUserNotificationsSuccess,
    readAllUserNotificationsFailure,
    nullifyNotifications,
} = notificationReducer.actions;

export default notificationReducer.reducer;

// export const notificationReducerOld = createReducer(initialState, {
//     createQuestionRequest: (state, action) => {
//         state.loading = true;
//     },
//     createLikeNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     createLikeNotificationSuccess: (state, action) => {
//         state.loading = false;  
//         state.notification = action.payload.notification;
//         state.notifications = [notification, ...state.notifications];
//     },
//     createLikeNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // create comment like notification action starts
//     createCommentLikeNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     createCommentLikeNotificationSuccess: (state, action) => {
//         state.loading = false;  
//         state.notification = action.payload.notification;
//         state.notifications = [notification, ...state.notifications];
//     },
//     createCommentLikeNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // create comment like notification action ends
//     createQuestionNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     createQuestionNotificationSuccess: (state, action) => {
//         state.loading = false;  
//         state.notification = action.payload.notification;
//         state.notifications = [notification, ...state.notifications];
//     },
//     createQuestionNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // create answer notification starts
//     createAnswerNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     createAnswerNotificationSuccess: (state, action) => {
//         state.loading = false;  
//         state.notification = action.payload.notification;
//         state.notifications = [notification, ...state.notifications];
//     },
//     createAnswerNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // create answer notification ends
//     // create reply on comment notification reducer starts
//     createreplyCommentNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     createreplyCommentNotificationSuccess: (state, action) => {
//         state.loading = false;  
//         state.notification = action.payload.notification;
//         state.notifications = [notification, ...state.notifications];
//     },
//     createreplyCommentNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // create reply on comment notification reducer ends
//     // get user notifications reducer
//     getUserNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     getUserNotificationSuccess: (state, action) => {
//         state.loading = false;  
//         state.notifications = action.payload.notifications;
//         state.notificationSize = action.payload.size;
//         state.loadNotificationToken = action.token;
//     },
//     getUserNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // get user notifications reducer
//     // get user delete notification reducer
//     getDeleteNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     getDeleteNotificationSuccess: (state, action) => {
//         state.loading = false;  
//         state.deleteNotifications = action.payload.notifications;
//         state.notificationSize = action.payload.size;
//         state.loadNotificationToken = action.token;
//     },
//     getDeleteNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // get user delete notification reducer
//     // notification bar update
//     notificationBarUpdateRequest: (state, action) => {
//         state.loading = true;
//     },
//     notificationBarUpdateSuccess: (state, action) => {
//         state.loading = false;  
//         state.notification = action.payload;
//         state.notifications = [action.payload, ...state.notifications];
//     },
//     notificationBarUpdateFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // notification bar update
//     // notification count update handler
//     notificationCountUpdateRequest: (state, action) => {
//         state.loading = true;
//     },
//     notificationCountUpdateSuccess: (state, action) => {
//         state.loading = false;  
//         state.notification = null;
//     },  
//     notificationCountUpdateFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // notification count update handler
//     // remove user notification reducer starts
//     removeUserNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     removeUserNotificationSuccess: (state, action) => {
//         state.loading = false;  
//         state.notification = action.payload.notification;
//         const index = state.notifications.findIndex((l) => l._id == action.payload.notification._id);
//         state.removeNotifyId = action.payload.notification._id;
//         if(index !== -1){
//             state.notifications.splice(index, 1);
//         }
//     },
//     removeUserNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // remove user notification reducer ends
//     // delete user notification permanently
//     deleteUserNotificationPermanentlyRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteUserNotificationPermanentlySuccess: (state, action) => {
//         state.loading = false;
//         state.delNotifyId = action.payload.notifyId;  
//         const index = state.deleteNotifications.findIndex((l) => l._id == action.payload.notifyId);
//         if(index !== -1){
//             state.deleteNotifications.splice(index, 1);
//         }
//     },
//     deleteUserNotificationPermanentlyFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // delete user notification permanently
//     // create answer comment notification action starts
//     createAnswerCommentNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     createAnswerCommentNotificationSuccess: () => {
//         state.loading = false;  
//         state.notification = action.payload.notification;
//         state.notifications = [notification, ...state.notifications];
//     },
//     createAnswerCommentNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     // create answer comment notification action ends
// });
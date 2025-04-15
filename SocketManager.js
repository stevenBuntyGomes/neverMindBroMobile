import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSocket } from './SocketClient';
import { ENDPOINT } from './config';
import { notificationBarUpdateAction } from './Actions/NotificationAction';
import { sendMessageNotifications } from './Actions/messageAction';
import { getAuthUserInPublic } from './Actions/publicUserAction';
import { messageReceivedSuccess, messageTypingSuccess } from './Reducers/messageReducer';
import ScreensNav from './Components/nav/ScreensNav';

let socket;

export default function SocketManager({ isNavReady, currentScreen, navigationRef }) {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.user);
    const [socketConnected, setSocketConnected] = useState(false);

    const getAuthUserHandler = async () => {
        await dispatch(getAuthUserInPublic());
    };

    useEffect(() =>{
        getAuthUserHandler();
    }, [dispatch]);

    useEffect(() => {
        if (!navigationRef?.isReady()) return; // ✅ Guard added
        socket = initializeSocket(ENDPOINT);
        const currentScreen = navigationRef?.getCurrentRoute()?.name; // Track screen changes

        if (auth && auth.name !== undefined && !socketConnected) {
        setSocketConnected(true);
        console.log("Authenticated User:", auth.name);
        socket.emit("setup", auth);
        }
    }, [auth?.name, socketConnected, isNavReady, dispatch]);


    useEffect(() => {
        if (!navigationRef?.isReady()) return; // ✅ Guard added
        if (!socket) return;

        // Listen for global socket events
        socket?.on('connected', () => {
            console.log('auth user connected and joined socket io');
        });
        socket?.on('liked post', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                targetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
                _id: notifier.targetId,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });

        // liked comment of answer
        socket?.on('liked comment post', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                targetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        // liked comment of answer
        // comment answer
        socket?.on('comment answer', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                targetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        // comment answer
        // reply on comment answer
        socket?.on('reply on comment answer', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                targetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        // reply on comment answer
        // answer question notification
        socket?.on('receive answer notification', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                targetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        // answer question notification
        // receive question notification
        socket?.on('receive question notification', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                targetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        // receive question notification
        // <<--BLOG NOTIFICATION-->>
        socket?.on('new blog notification', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                blogTargetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        socket?.on('liked blog', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                blogTargetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        socket?.on('liked comment on blog', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                blogTargetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        socket?.on('comment on blog', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                blogTargetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
                // link: notifier.link,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        socket?.on('reply comment on blog', (notifier, notification) => {
            let notificationObj = {
                title: notification,
                blogTargetType: notifier.targetType,
                targetId: notifier.targetId,
                sender: notifier.sender,
            }
            dispatch(notificationBarUpdateAction(notificationObj));
        });
        // <<--BLOG NOTIFICATION-->>
        // message part starts
        socket.on("message received", async (newMessageReceived) => {
            const currentScreen = navigationRef?.getCurrentRoute()?.name;
            console.log('current screen =>', currentScreen);
            if (currentScreen !== 'Chats') {
                if(currentScreen !== 'ResponsiveChatBox'){
                    await dispatch(sendMessageNotifications(newMessageReceived));
                }else if(currentScreen == 'ResponsiveChatBox'){
                    console.log('message received and I am at Single chat page =>', newMessageReceived);
                    await dispatch(messageReceivedSuccess(newMessageReceived));
                }
            } else if(currentScreen == 'Chats') {
                // console.log('message received and I am at general chat page =>', newMessageReceived);
                await dispatch(messageReceivedSuccess(newMessageReceived));
                await dispatch(sendMessageNotifications(newMessageReceived));
            }
        });

        socket.on("typing", () => {
            if (navigationRef?.getCurrentRoute()?.name !== 'Chats') {
                return;
            }else if (navigationRef?.getCurrentRoute()?.name === 'Chats'){
                dispatch(messageTypingSuccess(true));
            }
        });

        socket.on("stop typing", () => {
            if (navigationRef?.getCurrentRoute()?.name !== 'Chats') {
                return;
            }else if (navigationRef?.getCurrentRoute()?.name === 'Chats'){
                dispatch(messageTypingSuccess(false));
            }
        });

        return () => {
            socket.off('connected');
            socket.off('liked post');
            socket.off('liked comment post');
            socket.off('comment answer');
            socket.off('reply on comment answer');
            socket.off('receive answer notification');
            socket.off('receive question notification');
            socket.off('new blog notification');
            socket.off('liked blog');
            socket.off('liked comment on blog');
            socket.off('comment on blog');
            socket.off('reply comment on blog');
            socket.off('message received');
            socket.off('typing');
            socket.off('stop typing');
        };
    }, [auth?.name, socketConnected, isNavReady, currentScreen]);


    return <ScreensNav />;

}
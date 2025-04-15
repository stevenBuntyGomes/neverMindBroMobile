import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { initializeSocket } from './SocketClient';
import { ENDPOINT } from './config';
import { notificationBarUpdateAction } from './Actions/NotificationAction';
import { sendMessageNotifications } from './Actions/messageAction';
import { fetchChats } from './Actions/chatAction';
import { getAuthUserInPublic } from './Actions/publicUserAction';
import { messageReceivedSuccess, messageTypingSuccess } from './Reducers/messageReducer';
import { useDispatch, useSelector } from 'react-redux';
import SocketManager from './SocketManager';
let socket;

export default function RootNavigation () {
    const dispatch = useDispatch();
    const [socketConnected, setSocketConnected] = useState(false);
    const navigationRef = useNavigationContainerRef(); // For tracking screen changes
    const [isNavReady, setIsNavReady] = useState(false);
    const [currentScreen, setCurrentScreen] = useState(null);


    const getAuthUserHandler = async () => {
        await dispatch(getAuthUserInPublic());
    };
    
    useEffect(() =>{
        getAuthUserHandler();
    }, [dispatch]);

    return (
        <NavigationContainer
            ref={navigationRef && navigationRef}
            onReady={() => {
                setIsNavReady(true);
                setCurrentScreen(navigationRef.getCurrentRoute()?.name);
            }}
            onStateChange={() => {
                setCurrentScreen(navigationRef.getCurrentRoute()?.name);
            }}
        >
            <SocketManager
                isNavReady={isNavReady}
                currentScreen={currentScreen}
                navigationRef={navigationRef}
            />

        </NavigationContainer>
    )
}


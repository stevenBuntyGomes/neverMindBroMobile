import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MyChat from '../../Components/Chats/MyChat';
import FooterTabs from '../../Components/nav/FooterTabs';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import { 
    setReadNotifications
 } from '../../Actions/chatAction';
import { io } from 'socket.io-client';
import { API, ENDPOINT } from '../../config';

// Initialize socket
let socket = null;

const Chats = () => {
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state.user);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const getAuthUserHandler = async () => {
    await dispatch(getAuthUserInPublic());
  };

  const readChatNotificationsHandler = async () => {
    await dispatch(setReadNotifications());
  };

  useEffect(() => {
    getAuthUserHandler();
    readChatNotificationsHandler();
  }, [dispatch]);

  // Setup Socket.IO connection
  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'], // Ensuring better performance
    });

    if (auth && auth.name !== undefined && !socketConnected) {
      setSocketConnected(true);
      // console.log(`User ${auth.name} connected to socket.`);
      // socket.emit('setup', auth);
    }

    socket.on('connected', () => {
      // console.log('User connected to chat socket.');
    });

    socket.on('new chat notification', (notifier, notification) => {
      let notificationObj = {
        title: notification,
        targetType: notifier.targetType,
        targetId: notifier.targetId,
        sender: notifier.sender,
      };
      dispatch(setReadNotifications(notificationObj));
    });

    return () => {
      socket.disconnect();
    };
  }, [auth?.name]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatContainer}>
        {/* MyChat Component taking full width */}
        <MyChat fetchAgain={fetchAgain} user={user && user} />
      </View>
      {/* Footer Navigation */}
      <View style={styles.footer}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatContainer: {
    flex: 1,
    width: '100%', // Ensuring MyChat takes full width
  },
  footer: {
    backgroundColor: '#333',
    justifyContent: 'flex-end',
  },
});

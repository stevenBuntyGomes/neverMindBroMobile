import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenApp } from '../../Actions/userAction';
import { deleteMessageAction } from '../../Actions/messageAction';
import { nullifyDelMesageIdSuccess } from '../../Reducers/messageReducer';
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from './chatConfig';
import { API } from '../../config';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { nulifyNewMessageSuccess } from '../../Reducers/messageReducer';

const ScrollableChat = ({ chatId, messages, auth }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const { deleteMessageId, newMessageReceived } = useSelector((state) => state.messages);
  const [allMessages, setAllMessages] = useState([]);
  const [limit, setLimit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
  const scrollViewRef = useRef(null);
  const isAtTop = useRef(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const getToken = async () => {
      const authToken = await AsyncStorage.getItem('@token');
      await dispatch(setTokenApp(authToken));
  };

  const newMessageIncomingHandler = async () => {
    if (newMessageReceived) {
      await setAllMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      console.log(newMessageReceived);
      await dispatch(nulifyNewMessageSuccess());

      // Ensure scroll moves to the bottom when a new message arrives
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 300); // Small delay to allow UI to update
    }
  };

  useEffect(() => {
    newMessageIncomingHandler();
  }, [newMessageReceived]);


  const loadMoreMessagesHandler = async () => {
    if (!chatId || loadingMoreMessages || size < limit) return;
    setLoadingMoreMessages(true);
    
    const toSkip = skip + limit;

    const config = {
        headers: {
            "Accept": "application/json",
            "token": `${token}`
        },
    };

    const { data } = await axios.post(`${API}/messages/`, { chatId, skip: toSkip, limit }, config);
    setAllMessages((prevMessages) => [...data.messages, ...prevMessages]);
    setSkip(toSkip);
    setSize(data.size);
    setLoadingMoreMessages(false);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    setAllMessages([...messages]);
    setSize(messages.length);
    setSkip(0);
    
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (deleteMessageId) {
      setAllMessages((prevMessages) => prevMessages.filter((message) => message._id !== deleteMessageId));
      dispatch(nullifyDelMesageIdSuccess());
    }
  }, [deleteMessageId]);

  const handleDeleteMessage = async (message) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await dispatch(deleteMessageAction(message._id));
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {loadingMoreMessages && (
        <ActivityIndicator size="large" color="gray" style={styles.loader} />
      )}
      <ScrollView 
        ref={scrollViewRef} 
        onScroll={(event) => {
          const { contentOffset } = event.nativeEvent;

          // Trigger load more when the user is near the top (5px instead of 0.1px)
          if (contentOffset.y < 8) {
            if (!isAtTop.current) {
              isAtTop.current = true;
              loadMoreMessagesHandler();
            }
          } else {
            isAtTop.current = false;
          }
        }}
        scrollEventThrottle={16} // Optimized for smooth scrolling
        showsVerticalScrollIndicator={false}
        onTouchStart={() => setSelectedMessage(null)} // Added this line
      >
        {allMessages.map((message, index) => (
          <View
            key={message?._id}
            style={styles.messageWrapper}
          >
            {(isSameSender(allMessages, message, index, auth?._id) || isLastMessage(allMessages, index, auth?._id)) && (
              <Text style={styles.senderName}>{message.sender?.name}</Text>
            )}
            <View
              style={[
                styles.messageContainer,
                {
                  alignSelf: message?.sender?._id === auth?._id ? 'flex-end' : 'flex-start',
                  backgroundColor: message?.sender?._id === auth?._id ? '#BEE3F8' : '#B9F5D0',
                  marginLeft: isSameSenderMargin(allMessages, message, index, auth?._id),
                  flexDirection: 'row', // Ensures items align in a row
                  alignItems: 'center',
                },
              ]}
            >
              {/* Three-Dot Menu Button */}
              {message?.sender?._id === auth?._id && (
                <TouchableOpacity
                  style={styles.menuIcon}
                  onPress={() => setSelectedMessage(selectedMessage?._id === message?._id ? null : message)}
                >
                  <FontAwesome5 name="ellipsis-v" size={16} color="gray" />
                </TouchableOpacity>

              )}

              {/* Message Content */}
              <Text style={styles.messageText}>{message?.content}</Text>

              {/* Delete Option (Shown when the menu is selected) */}
              {selectedMessage?._id === message?._id && (
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      handleDeleteMessage(message);
                      setSelectedMessage(null);
                    }}
                  >
                    <Text style={styles.menuText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* {(isSameSender(allMessages, message, index, auth?._id) || isLastMessage(allMessages, index, auth?._id)) && (
              <Image
                source={{ uri: message.sender?.photo?.url || 'https://via.placeholder.com/150' }}
                style={styles.avatar}
              />
            )} */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScrollableChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginVertical: 10,
  },
  messageWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    marginLeft: 5,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    maxWidth: '75%',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 5,
  },
  deleteIcon: {
    marginLeft: 5,
    padding: 5,
  },
  menuIcon: {
  padding: 5,
  marginRight: 5, // Ensure space before the message
},

menuContainer: {
  position: 'absolute',
  right: 0, // Aligns the menu properly
  top: '100%', // Below the message
  backgroundColor: 'white',
  borderRadius: 5,
  padding: 5,
  elevation: 5, // Shadow for Android
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  zIndex: 9999, // Added this line
},

menuItem: {
  paddingVertical: 5,
  paddingHorizontal: 10,
},

menuText: {
  fontSize: 14,
  color: 'red',
},

});

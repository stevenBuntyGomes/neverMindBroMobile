import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import LottieView from 'lottie-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { sendMessage, fetchMessages, sendMessageNotifications } from '../../Actions/messageAction';
import { setSelectedChat, fetchChats } from '../../Actions/chatAction';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import { getSender, getSenderFull } from './chatConfig';
import { filterFunction } from '../Filters/filter';
import { getSocket } from '../../SocketClient';
import ScrollableChat from './ScrollableChat';
import { API } from '../../config';
import axios from 'axios';
import { getCategory } from '../../Actions/categoryAction';
import { notificationChatSuccess } from '../../Reducers/chatReducer';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { setTokenApp } from '../../Actions/userAction';
import UpdateGroupChatModal from './UpdateGroupChatModal';


// Initialize Socket
let socket, selectedChatCompare;

const SingleChat = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { chat: SelectedChat } = useSelector((state) => state.userChat);
  const { messages, loading: loadingMessage, messageNotifications, messageReceivedNotify, typingState } = useSelector((state) => state.messages);
  const { user, auth, token } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const chat = route?.params?.chat; // Retrieve chatId from navigation params
  const [newMessage, setNewMessage] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const getToken = async () => {
      const authToken = await AsyncStorage.getItem('@token');
      dispatch(setTokenApp(authToken));
  }

  const getSelectedChatHandler = async () => {
    await dispatch(setSelectedChat(chat));
  }

  const getAuthUserHandler = async () => {
      await dispatch(getAuthUserInPublic());
  };
  
  useEffect(() => {
    if (chat) {
      getSelectedChatHandler();
    }
  }, [chat]);
  
  useEffect(() => {
    socket = getSocket();
    getAuthUserHandler();
    dispatch(getCategory());
    getToken();
  }, [dispatch]);

  useEffect(() => {
    if (messageReceivedNotify !== null) {
      handleReceivedMessage(messageReceivedNotify);
    }
  }, [messageReceivedNotify]);

  useEffect(() => {
    setIsTyping(typingState);
  }, [typingState]);

  useEffect(() => {
    if (user) {
      socket?.emit('setup', user);
    }
  }, [user]);

  useEffect(() => {
    if (SelectedChat) {
      dispatch(fetchMessages(SelectedChat._id));
      socket?.emit('join chat', SelectedChat._id);
      selectedChatCompare = SelectedChat;
    }
  }, [SelectedChat, dispatch]);

  useEffect(() => {
      if(outputText !== ""){
        const result = filterFunction(outputText, selectedCategory);
        setNewMessage(result);
      }
  }, [selectedCategory, outputText]);

  const handleReceivedMessage = async (message) => {
    if (!selectedChatCompare || selectedChatCompare._id !== message?.chat?._id) {
      if (!messageNotifications?.includes(message)) {
        await dispatch(sendMessageNotifications(message));
        await dispatch(notificationChatSuccess(message));
        console.log('sending notification to notification bar');
      } else {
        await dispatch(notificationChatSuccess(message));
        console.log('sending notification only');
      }
    } else {
      console.log('sending message selected chat =>', message);
      await dispatch(sendMessage(message));
    }
  };

  const handleBackPress = async () => {
    await dispatch(setSelectedChat(null));
    navigation.goBack();
  };

  const sendMessageHandler = async () => {
    if (newMessage.trim() !== '') {
      socket?.emit('stop typing', SelectedChat?._id);
      const config = {
        headers: {
            "Accept": "application/json",
            "token": `${token}`
        },
      };
      try {
        const content = newMessage;
        const chatId = SelectedChat._id;
        const { data } = await axios.post(`${API}/messages/send_message`, {content, chatId}, config);
        await dispatch(sendMessage(data.message));
        socket?.emit('new message', data.message, selectedChatCompare);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const typeHandler = (text) => {
    setNewMessage(text);
    setOutputText(text);
    if (!typing) {
      setTyping(true);
      socket?.emit('typing', SelectedChat._id);
    }

    setTimeout(() => {
      if (typing) {
        socket?.emit('stop typing', SelectedChat._id);
        setTyping(false);
      }
    }, 3000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {SelectedChat ? (
        <View style={styles.chatBox}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <FontAwesome5 name="arrow-left" size={20} color="black" />
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.chatTitle}>
                {SelectedChat?.isGroupChat
                  ? SelectedChat.chatName.toUpperCase()
                  : getSender(auth, SelectedChat.users)}
              </Text>
            </View>

            <View style={{ marginLeft: 'auto' }}>
              <UpdateGroupChatModal 
                SelectedChat = {SelectedChat && SelectedChat}
                user = {auth && auth}
              />
            </View>
          </View>


          {/* Messages List */}
          <View style={styles.messagesContainer}>
            {loadingMessage ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ScrollableChat chatId={SelectedChat?._id} messages={messages} auth = {auth && auth} />
            )}
          </View>

          {/* Typing Animation */}
          {isTyping && (
            <LottieView
              source={require('../Animations/typing.json')}
              autoPlay
              loop
              style={styles.typingIndicator}
            />
          )}

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={styles.iconButton}>
              <FontAwesome5 name="smile" size={22} color="gray" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter a message"
              value={newMessage}
              onChangeText={typeHandler}
              onSubmitEditing={sendMessageHandler}
            />
            <TouchableOpacity onPress={sendMessageHandler} style={styles.sendButton} disabled={!newMessage.trim()}>
              <FontAwesome5 name="paper-plane" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Category Modal */}
          <Modal visible={categoryModalVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category._id}
                      onPress={() => {
                        setSelectedCategory(category.slug);
                        setCategoryModalVisible(false);
                      }}
                      style={styles.modalItem}
                    >
                      <Text style={styles.modalText}>{category?.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity onPress={() => setCategoryModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View style={styles.emptyChat}>
          <Text style={styles.emptyText}>Click on a user to start chatting</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  chatBox: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  backButton: { marginRight: 10 },
  chatTitle: { fontSize: 18, fontWeight: 'bold' },
  messagesContainer: { flex: 1, padding: 10 },
  typingIndicator: { height: 50, width: 70, alignSelf: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  iconButton: { padding: 8 },
  input: { flex: 1, borderBottomWidth: 1, borderColor: '#ccc', marginHorizontal: 10, fontSize: 16 },
  sendButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 20 },
  emptyChat: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: 'gray' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { height: '80%', width: '80%', backgroundColor: '#f8f9fa', borderRadius: 10, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  modalItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc', width: '100%', alignItems: 'center' },
  modalText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  closeButton: { marginTop: 10, padding: 10, backgroundColor: '#007bff', borderRadius: 5 },
  closeButtonText: { fontSize: 16, color: 'white', fontWeight: 'bold' },
  scrollView: { width: '100%' },
});

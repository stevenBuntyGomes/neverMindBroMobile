import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  Modal,
  ScrollView,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { sendMessage, fetchMessages, sendMessageNotifications } from '../../Actions/messageAction';
import { setSelectedChat } from '../../Actions/chatAction';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import { getSender } from './chatConfig';
import { filterFunction } from '../Filters/filter';
import { getSocket } from '../../SocketClient';
import ScrollableChat from './ScrollableChat';
import { API } from '../../config';
import axios from 'axios';
import { getCategory } from '../../Actions/categoryAction';
import { notificationChatSuccess } from '../../Reducers/chatReducer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setTokenApp } from '../../Actions/userAction';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

let socket, selectedChatCompare;

const SingleChat = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { chat: SelectedChat } = useSelector((state) => state.userChat);
  const { messages, loading: loadingMessage, messageReceivedNotify, typingState } = useSelector((state) => state.messages);
  const { user, auth, token } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const chat = route?.params?.chat;
  const textInputRef = useRef(null);


  const [newMessage, setNewMessage] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputModalVisible, setInputModalVisible] = useState(false);

  const getToken = async () => {
    const authToken = await AsyncStorage.getItem('@token');
    dispatch(setTokenApp(authToken));
  };

  useEffect(() => {
    if (chat) dispatch(setSelectedChat(chat));
  }, [chat]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    socket = getSocket();
    dispatch(getAuthUserInPublic());
    dispatch(getCategory());
    getToken();
  }, [dispatch]);

  useEffect(() => {
    if (messageReceivedNotify !== null) handleReceivedMessage(messageReceivedNotify);
  }, [messageReceivedNotify]);

  useEffect(() => setIsTyping(typingState), [typingState]);

  useEffect(() => {
    if (user) socket?.emit('setup', user);
  }, [user]);

  useEffect(() => {
    if (SelectedChat) {
      dispatch(fetchMessages(SelectedChat._id));
      socket?.emit('join chat', SelectedChat._id);
      selectedChatCompare = SelectedChat;
    }
  }, [SelectedChat, dispatch]);

  useEffect(() => {
    if (outputText !== '') {
      const result = filterFunction(outputText, selectedCategory);
      setNewMessage(result);
    }
  }, [selectedCategory, outputText]);

  const handleReceivedMessage = async (message) => {
    if (!selectedChatCompare || selectedChatCompare._id !== message?.chat?._id) {
      await dispatch(sendMessageNotifications(message));
      await dispatch(notificationChatSuccess(message));
    } else {
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
      try {
        const { data } = await axios.post(`${API}/messages/send_message`, {
          content: newMessage,
          chatId: SelectedChat._id,
        }, { headers: { Accept: 'application/json', token } });
        await dispatch(sendMessage(data.message));
        socket?.emit('new message', data.message, selectedChatCompare);
        setNewMessage('');
        setInputModalVisible(false);
      } catch (error) {
        console.error('Send error:', error);
      }
    }
  };

  const clearInput = () => {
    setNewMessage('');
    textInputRef.current && textInputRef.current.clear();
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
    <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        {SelectedChat ? (
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <FontAwesome5 name="arrow-left" size={20} color="black" />
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.chatTitle}>
                  {SelectedChat?.isGroupChat ? SelectedChat.chatName.toUpperCase() : getSender(auth, SelectedChat.users)}
                </Text>
              </View>
              <UpdateGroupChatModal SelectedChat={SelectedChat} user={auth} />
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.messagesContainer}>
                {loadingMessage ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <ScrollableChat chatId={SelectedChat?._id} messages={messages} auth={auth} />
                )}
              </View>
              {isTyping && (
                <LottieView source={require('../Animations/typing.json')} autoPlay loop style={styles.typingIndicator} />
              )}
              <TouchableOpacity onPress={() => setInputModalVisible(true)} style={styles.inputContainer}>
                <Text style={styles.fakeInput}>Tap to type a message...</Text>
              </TouchableOpacity>
            </View>

            <Modal visible={inputModalVisible} transparent animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <TextInput
                    ref={textInputRef}

                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    placeholder="Enter a message"
                    multiline
                    numberOfLines={5}
                    value={newMessage}
                    onChangeText={typeHandler}
                    onSubmitEditing={sendMessageHandler}
                  />
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity onPress={sendMessageHandler} style={styles.iconButton}>
                      <FontAwesome5 name="paper-plane" size={20} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={styles.iconButton}>
                      <FontAwesome5 name="smile" size={22} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clearInput} style={styles.iconButton}>
                      <FontAwesome5 name="times-circle" size={24} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setInputModalVisible(false)} style={[styles.sendButton, { backgroundColor: 'gray', marginLeft: 10}]}>
                      <Text style={{ color: 'white' }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

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
          </>
        ) : (
          <View style={styles.emptyChat}>
            <Text style={styles.emptyText}>Click on a user to start chatting</Text>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  backButton: { marginRight: 10 },
  chatTitle: { fontSize: 18, fontWeight: 'bold' },
  messagesContainer: { flex: 1, padding: 10 },
  typingIndicator: { height: 50, width: 70, alignSelf: 'center' },
  inputContainer: { padding: 12, borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#f0f0f0' },
  fakeInput: { fontSize: 16, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 16, backgroundColor: '#fff' },
  sendButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  emptyChat: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: 'gray' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#f8f9fa', borderRadius: 10, padding: 20, width: '90%', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  modalItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' },
  modalText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  closeButton: { marginTop: 10, padding: 10, backgroundColor: '#007bff', borderRadius: 5 },
  closeButtonText: { fontSize: 16, color: 'white', fontWeight: 'bold' },
  iconButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    height: 40,
    width: 40,
  },
});

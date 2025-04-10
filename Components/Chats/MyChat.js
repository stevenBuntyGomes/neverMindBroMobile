import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SectionList,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, setSelectedChat, deleteSingleChatHandler } from '../../Actions/chatAction';
import { sendMessage, fetchMessages, sendMessageNotifications } from '../../Actions/messageAction';
import { getSender } from './chatConfig';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import { setTokenApp } from '../../Actions/userAction';
import { useNavigation } from '@react-navigation/native';
import { API } from '../../config';
import { notificationChatSuccess } from '../../Reducers/chatReducer';
import axios from 'axios';
import { io } from 'socket.io-client';
import { getSocket } from '../../SocketClient';
import SearchDialogBox from './SearchDialogBox';
import { Badge } from 'react-native-paper';
import GroupChatModal from './GroupChatModal';
// Socket connection
let socket = null;
const ENDPOINT = API; // Ensure this is defined properly in config

const MyChat = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userChats, chat: selectedChat, newChat, chatSize, deleteChatId } = useSelector((state) => state.userChat);
  const { messageNotifications, messageReceivedNotify } = useSelector((state) => state.messages);
  const { token, auth, user } = useSelector((state) => state.user);
  const [allChats, setAllChats] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [loadingMoreChats, setLoadingMoreChats] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const getToken = async () => {
      const authToken = await AsyncStorage.getItem('@token');
      dispatch(setTokenApp(authToken));
  }

  const loadMoreChatsHandler = async () => {
    if (loadingMoreChats) return;
    setLoadingMoreChats(true);
    const toSkip = skip + limit;
    const config = {
        headers: {
            "Accept": "application/json",
            "token": `${token}`
        },
    };
    const { data } = await axios.post(`${API}/chat/fetchChats`, { skip: toSkip, limit }, config);
    setAllChats([...userChats, ...data.chats]);
    setSkip(toSkip);
    setLoadingMoreChats(false);
    setSize(data.size);
  };

  const setSelectedChatHandler = async (chat) => {
    navigation?.navigate('ResponsiveChatBox', { chat: chat }); // Navigate to chat screen
    await dispatch(setSelectedChat(chat));
  };

  const fetchChatHandler = async () => {
    await dispatch(fetchChats(skip, limit));
  };

  const getAuthUserHandler = async () => {
    await dispatch(getAuthUserInPublic());
  };

  // calculate unread messages
    const calculateUnreadMessages = async (chats) => {
      const counts = {};
      console.log('we are inside the function...');

      for (const chat of chats) {
        let unreadMessages = 0;
        if (chat?.latestMessages && Array.isArray(chat?.latestMessages)) {
          console.log('we are inside the function inside array...');
          for (const message of chat.latestMessages) {
            if (!message?.isReadBy?.includes(auth?._id)) {
              unreadMessages++;
            }
          }
        }

        counts[chat?._id] = unreadMessages;
      }

      console.log('Unread Counts:', counts);
      setUnreadCounts(counts);
    };

  // calculate unread messages

  const handleReceivedMessage = async (message) => {
    if (!messageNotifications?.includes(message)) {
      await dispatch(sendMessageNotifications(message));
      await dispatch(notificationChatSuccess(message));
      console.log('sending notification to notification bar');
    } else {
      await dispatch(notificationChatSuccess(message));
      console.log('sending notification only');
    }
  };

  const deleteChatHandler = async (chat) => {
    await dispatch(deleteSingleChatHandler(chat));
    // console.log('delete video has been clicked');
  }

  useEffect(() => {
    getAuthUserHandler();
    getToken();
    fetchChatHandler();
  }, []);

  useEffect(() => {
    fetchChatHandler();
  }, [auth]);

  useEffect(() => {
    if (messageReceivedNotify !== null) {
      handleReceivedMessage(messageReceivedNotify);
    }
  }, [messageReceivedNotify]);

  useEffect(() => {
    console.log(unreadCounts);
  }, [unreadCounts]);

  useEffect(() => {
    setAllChats([...userChats]);
    setSize(chatSize);
  }, [userChats, chatSize]);

  useEffect(() => {
    if (!selectedChat) return;
    setAllChats((prevChats) => {
      const filteredChats = prevChats.filter((chat) => chat?._id !== selectedChat?._id);
      const updated = [selectedChat, ...filteredChats];
      calculateUnreadMessages(updated);
      return updated;
    });
  }, [selectedChat]);

    // delete and remove chat user 
    useEffect(() => {
      if (!deleteChatId) return;

      setAllChats(prevChats => {
        const updatedChats = prevChats.filter(chat => chat?._id !== deleteChatId);
        return updatedChats;
      });

      console.log('Chat deleted from list =>', deleteChatId);
  }, [deleteChatId]);
  // delete and remove chat user 


  useEffect(() => {
    if (!newChat) return;
    setAllChats((prevChats) => {
      const filteredChats = prevChats.filter((chat) => chat?._id !== newChat?.chat?._id);
      var updated = [];
      if(newChat.isGroupChat){
        updated = [newChat, ...filteredChats];
      }else{
        updated = [newChat?.chat, ...filteredChats];
      }
      // console.log('new updated chat is created with new message =>', updated);
      calculateUnreadMessages(updated);
      return updated;
    });
  }, [newChat]);


  useEffect(() => {
    socket = getSocket();
    if (auth && auth.name && !socketConnected) {
      setSocketConnected(true);
      socket.emit('setup', auth);
    }
    socket.on('new chat notification', (notifier, notification) => {
      console.log('New chat notification:', notification);
    });
    return () => socket.disconnect();
  }, [auth?.name]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
          <GroupChatModal auth = {auth && auth}/>
        <SearchDialogBox />
      </View>

      {/* Chat List */}
      <SectionList
        sections={[{ title: 'Chats', data: allChats }]}
        keyExtractor={(chat) => chat?._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.chatItem,
              selectedChat?._id === item?._id && styles?.selectedChat,
            ]}
            onPress={() => setSelectedChatHandler(item)}
          >
            {/* Horizontal row container */}
            <View style={styles.chatRow}>
              {/* Avatar */}
              <Image
                source={{
                  uri:
                    !item?.isGroupChat && item?.users[0]?.photo
                      ? item.users[0].photo.url
                      : 'https://via.placeholder.com/150',
                }}
                style={styles.avatar}
              />

              {/* Chat details */}
              <View style={styles.chatDetails}>
                <Text style={styles.chatText}>
                  {!item?.isGroupChat ? getSender(auth, item?.users) : item?.chatName}
                </Text>
                <Text style={styles.lastMessage}>Last message goes here...</Text>
              </View>

              {/* Trash icon */}
              <TouchableOpacity 
                onPress={() => deleteChatHandler(item)}
                style={styles.trashIcon}>
                <FontAwesome5 name="trash" size={20} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Unread badge */}
            {/* <Badge style={styles.badge}>{unreadCounts[item?._id]}</Badge> */}
            {unreadCounts[item?._id] > 0 && (
              <Badge style={styles.badge}>{unreadCounts[item?._id]}</Badge>
            )}
          </TouchableOpacity>
        )}

        ListFooterComponent={() =>
          loadingMoreChats && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        }
        onEndReached={() => {
          if (size >= limit) {
            loadMoreChatsHandler();
          }
        }}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false} // This hides the scrollbar
      />
    </SafeAreaView>
  );
};

export default MyChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 25,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#ddd',
    backgroundColor: '#ffffff',
  },
  selectedChat: {
    backgroundColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
  },
  chatText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: 'gray',
  },
  unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  badge: {
        position: 'absolute',
        zIndex: 100,
        top: 15,
        right: 60,
        backgroundColor: 'red',
        color: '#fff',
        fontSize: 12,
        height: 20,
        minWidth: 20,
        borderRadius: 10,
        textAlign: 'center',
        paddingHorizontal: 4,
    },

    chatRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },

    trashIcon: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },

    button: {
      borderWidth: 1,
      borderColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 10,
      marginBottom: 10,
    },
    text: {
      color: 'black',
      fontWeight: '500',
    },

});

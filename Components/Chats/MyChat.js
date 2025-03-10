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
import { fetchChats, setSelectedChat } from '../../Actions/chatAction';
import { getSender } from './chatConfig';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import { setTokenApp } from '../../Actions/userAction';
import { useNavigation } from '@react-navigation/native';
import { API } from '../../config';
import axios from 'axios';
import { io } from 'socket.io-client';
import SearchDialogBox from './SearchDialogBox';

// Socket connection
let socket = null;
const ENDPOINT = API; // Ensure this is defined properly in config

const MyChat = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userChats, chat: selectedChat, newChat, chatSize } = useSelector((state) => state.userChat);
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
    navigation.navigate('ResponsiveChatBox', { chat: chat }); // Navigate to chat screen
    await dispatch(setSelectedChat(chat));
  };

  const fetchChatHandler = async () => {
    await dispatch(fetchChats(skip, limit));
  };

  const getAuthUserHandler = async () => {
    await dispatch(getAuthUserInPublic());
  };

  useEffect(() => {
    getAuthUserHandler();
    getToken();
  }, []);
  useEffect(() => {
    fetchChatHandler();
  }, [auth]);

  useEffect(() => {
    setAllChats([...userChats]);
    setSize(chatSize);
  }, [userChats, chatSize]);

  useEffect(() => {
    if (!selectedChat) return;
    setAllChats((prevChats) => {
      const filteredChats = prevChats.filter((chat) => chat?._id !== selectedChat?._id);
      return [selectedChat, ...filteredChats];
    });
  }, [selectedChat]);

  useEffect(() => {
    if (!newChat) return;
    setAllChats((prevChats) => {
      const filteredChats = prevChats.filter((chat) => chat?._id !== newChat?.chat?._id);
      return [newChat?.chat, ...filteredChats];
    });
  }, [newChat]);

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ['websocket'] });
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
            <Image
              source={{
                uri:
                  !item?.isGroupChat && item?.users[0]?.photo
                    ? item.users[0].photo.url
                    : 'https://via.placeholder.com/150',
              }}
              style={styles.avatar}
            />
            <View style={styles.chatDetails}>
              <Text style={styles.chatText}>
                {!item?.isGroupChat ? getSender(auth, item?.users) : item?.chatName}
              </Text>
              <Text style={styles.lastMessage}>Last message goes here...</Text>
            </View>
            {unreadCounts[item?._id] > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{unreadCounts[item?._id]}</Text>
              </View>
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
        showsVerticalScrollIndicator={false} // 🔹 This hides the scrollbar
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
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
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
});

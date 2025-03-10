import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, Modal, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import User from "../User/User";
import { emptySearchUser } from '../../Reducers/chatReducer';
import { searchUserAction } from '../../Actions/chatAction';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchResult from './SearchResult';
import { API } from '../../config';
import { setTokenApp } from '../../Actions/userAction';
import axios from 'axios';

const SearchDialogBox = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState('');
  const { searchChatUsers, userSize } = useSelector((state) => state.userChat);
  const { token, auth, user } = useSelector((state) => state.user);
  const [index, setIndex] = useState(0);
  const [searchUser, setSearchUser] = useState([]);
  const [routes] = useState([{ key: "people", title: "People" }]);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);

  const getToken = async () => {
    const authToken = await AsyncStorage.getItem('@token');
    dispatch(setTokenApp(authToken));
  }

  // Function to handle search
  const searchSubmit = async (search) => {
    if (search !== '') {
      await dispatch(searchUserAction(search));
    }else{
      setSearchUser([]);
      setSkip(0);
    }
  };

  // Function to clear search results
  const emptySearchUserHandler = async () => {
    await dispatch(emptySearchUser());
  };

  
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (search !== '') {
      searchSubmit(search);
    } else if (search === '') {
      console.log('search is empty');
      emptySearchUserHandler();
      setSearchUser([]);
      setSkip(0);
    }
  }, [dispatch, search]);

  useEffect(() => {
      if (searchChatUsers && Array.isArray(searchChatUsers)) {
        setSearchUser([...searchChatUsers]);
        setSize(userSize);
      } else {
        setSearchUser([]);
      }
    }, [searchChatUsers, userSize]);

    const loadMoreSearchUserHandler = async () => {
      // if (loadingMoreUsers) return;
      // setLoadingMoreUsers(true);
      const toSkip = skip + limit;
      console.log(toSkip);
      const config = {
          headers: {
              "Accept": "application/json",
              "token": `${token}`
          },
      };
      console.log("Loading more users now...");
      const { data } = await axios.post(`${API}/chat/search_chat_user/search`, { search, skip: toSkip, limit }, config);
      console.log(data.users.length);
      
      setSearchUser([...searchUser, ...data.users]);
      setSkip(toSkip);
      console.log(toSkip);
      // setLoadingMoreUsers(false);
      setSize(data.size);
    }

  const toggleSearch = () => setOpenSearch(!openSearch);


  const PeopleRoute = () => (
    <View style={{ flex: 1 }}>
      <ScrollView 
        contentContainerStyle={styles.scene}
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        {searchUser.length > 0 ? (
          searchUser.map((user, index) => (
            <User key={user._id} userId={user._id} name={user.name} photo={user.photo?.url} username={user.username} />
          ))
        ) : (
          <Text style={styles.noResults}>No users found.</Text>
        )}
        {size >= limit && (
          <TouchableOpacity
            onPress={() => loadMoreSearchUserHandler()}
            style={styles.searchAllButton}
          >
            <Text style={styles.searchAllText}>Search More Users</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );

  return (
    <View>
      {/* Search Button */}
      <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
        <FontAwesome5 name="search" size={20} color="black" />
      </TouchableOpacity>

      {/* Search Modal */}
      <Modal visible={openSearch} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Search</Text>

            {/* Search Input */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search for anything..."
              value={search}
              onChangeText={setSearch}
              autoFocus
            />

            {/* Search Results */}
            <View style={styles.resultsContainer}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={({ route }) => {
                  switch (route.key) {
                    case "people":
                      return <PeopleRoute />;
                    default:
                      return null;
                  }
                }}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: "black" }}
                    style={styles.tabBar}
                    labelStyle={styles.tabLabel}
                    activeColor="black"
                    inactiveColor="gray"
                  />
                )}
              />
            </View>
            
            {/* Close Button */}
            <Button mode="contained" onPress={toggleSearch} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchDialogBox;

const styles = StyleSheet.create({
  searchButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 10,
  },
  resultsContainer: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#007bff',
  },

  // search results styles
  scene: {
    padding: 5,
  },
  searchAllButton: {
    alignItems: "center",
    marginTop: 10,
  },
  searchAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  tabBar: {
    backgroundColor: "white",
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  // search results styles
});

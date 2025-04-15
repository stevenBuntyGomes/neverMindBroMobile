import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import { userChat, fetchChats } from "../../Actions/chatAction";
import { useNavigation } from "@react-navigation/native";
import User from "../User/User";
import { API } from '../../config';
import { setTokenApp } from '../../Actions/userAction';
import axios from 'axios';
// import Search from "../../Screens/Search/Search";

const SearchResult = ({ search = '' }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { searchChatUsers, userSize } = useSelector((state) => state.userChat);
  const { token, auth, user } = useSelector((state) => state.user);
  const [index, setIndex] = useState(0);
  const [searchUser, setSearchUser] = useState([]);
  const [routes] = useState([{ key: "people", title: "People" }]);
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);

  const getToken = async () => {
    const authToken = await AsyncStorage.getItem('@token');
    dispatch(setTokenApp(authToken));
  }

  const accessChat = (userId) => {
    dispatch(userChat(userId));
    dispatch(fetchChats());
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if(search === '') {
      setSearchUser([]);
      setSkip(0);
      console.log('triggered for empty search');
    }
  }, [search]);

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
  );
};

export default SearchResult;

const styles = StyleSheet.create({
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
});

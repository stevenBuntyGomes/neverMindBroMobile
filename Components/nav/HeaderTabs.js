import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../Actions/userAction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { getUnreadNotification, readAllUserNotifications } from '../../Actions/NotificationAction';
import { nullifyNotifications } from '../../Reducers/NotificationReducer';


const HeaderTabs = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { token, loading } = useSelector((state) => state.user);
  const { notification, unreadNotifications } = useSelector((state) => state.notification);
  const [notificationCount, setNotificationCount] = useState([]);

  const signOut = async () => {
    const tokenGo = await AsyncStorage.getItem('@token');
    console.log(tokenGo);
    await AsyncStorage.removeItem('@token');
    // navigation.navigate('Signup');
    dispatch(signout());
  };

  const handlePress = () => {
    navigation.navigate(nav);
    console.log(nav);
  }


  useEffect(() => {
    if (notification) {
      notificationCount.push(notification);
      setNotificationCount([...notificationCount]);
      if (notificationCount.length > 0) {
        Toast.show({
          type: 'info',
          text1: `You have ${notificationCount.length} new notifications!`,
        });
      }
    }
  }, [notification]);

    
  useEffect(() => {
    if (unreadNotifications !== null) {
      setNotificationCount([...unreadNotifications]);
      if (notificationCount.length > 0) {
       Toast.show({
          type: 'info',
          text1: `You have ${notificationCount.length} new notifications!`,
        }); 
      }
      dispatch(nullifyNotifications());
    }
    // if(unreadNotifications == null){
    //   setNotificationCount([...unreadNotifications]);
    // }
  }, [unreadNotifications]);

  useEffect(() => {
    dispatch(getUnreadNotification());
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPressIn = {() => navigation.navigate('Search')} style={styles.headerElements}>
          <FontAwesome5 name="search" size={25} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPressIn = {() => navigation.navigate('Notifications')} style={styles.headerElements}>
          <View>
            <FontAwesome5 name="bell" size={25} color="#333" />
              {notificationCount.length > 0 && (
                <Badge style={styles.badge}>{notificationCount.length}</Badge>
              )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={signOut} style={styles.headerElements}>
          <FontAwesome5 name="sign-out-alt" size={25} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HeaderTabs;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerElements: {
    padding: 5,
    marginLeft: 15,
  },
  badge: {
    position: 'absolute',
    zIndex: 100,
    top: -4,
    right: -10,
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 12,
    height: 20,
    minWidth: 20,
    borderRadius: 10,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  fontAwesome: {
        marginBottom: 3,
        alignSelf: 'center',
        color: '#333'
    },
});
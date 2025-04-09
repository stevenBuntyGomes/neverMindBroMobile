import React, { useState, useEffect } from 'react';
import {
    Dimensions, SafeAreaView, View, Text, Modal,
    TouchableOpacity, ScrollView, StyleSheet, FlatList 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getUserNotificationAction, readAllUserNotifications } from '../../Actions/NotificationAction';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { API } from '../../config';
// import RemoveNotificationIcons from '../Notification/RemoveNotificationIcons';
import User from '../../Components/User/User';
import FooterTabs from '../../Components/nav/FooterTabs';
import DeleteNotification from '../../Components/Notifications/DeleteNotification';
import { nullifyNotifications } from '../../Reducers/NotificationReducer';

const Notifications = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { notifications, notificationSize, removeNotifyId } = useSelector((state) => state.notification);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(3);
    const [size, setSize] = useState(0);
    const [loadNotifications, setLoadNotifications] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);


    const menuVisibleHandler = () => {
        setMenuVisible(!menuVisible);
    };


    const getNotificationsHandler = async () => {
        await dispatch(getUserNotificationAction(skip, limit));
        await dispatch(readAllUserNotifications());
        await dispatch(nullifyNotifications());
    };

    const loadMoreNotificationHandler = async () => {
        let toSkip = skip + limit;
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`${API}/notification/get-user-notification`, { toSkip, limit }, config);
        setLoadNotifications([...loadNotifications, ...data.notifications]);
        setSkip(toSkip);
        setSize(data.size);
    };

    useEffect(() => {
        setLoadNotifications([...notifications]);
        setSize(notificationSize);
        console.log(loadNotifications);
    }, [notifications, notificationSize]);


    useEffect(() => {
        if (removeNotifyId !== null) {
            const removeIndex = loadNotifications.findIndex((l) => l._id === removeNotifyId);
            if (removeIndex !== -1) {
                loadNotifications.splice(removeIndex, 1);
                setLoadNotifications([...loadNotifications]);
            }
            const loadMoreIndex = loadNotifications.findIndex((l) => l._id === removeNotifyId);
            if (loadMoreIndex !== -1) {
                loadNotifications.splice(loadMoreIndex, 1);
                setLoadNotifications([...loadNotifications]);
            }
        }
    }, [removeNotifyId]);


    const loadMoreButton = () => {
        return (
        <>
            {size > 0 && size >= limit && (
                <TouchableOpacity style={styles.buttonBorderless} onPress={loadMoreNotificationHandler}>
                    <Text style={styles.buttonText}>Load More</Text>
                </TouchableOpacity>
            )}
        </>
        );
    };

    useEffect(() => {
        getNotificationsHandler();
    }, [dispatch]);


  return (
        <SafeAreaView style={styles.container}>
            <Toast />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                {loadNotifications && loadNotifications.map((notification, index) => (
                    <View key={index} style={styles.notificationContainer}>
                        <TouchableOpacity
                            onPress={() => 
                                navigation?.navigate(
                                    notification.targetType !== null ? 'SingleQuestion' : 'SingleBlog', 
                                    notification.targetType !== null 
                                        ? { questionSlug: notification.link } 
                                        : { blogSlug: notification.link }
                                )
                            }
                            style={styles.notificationItem}
                            // {notification.targetType !== null ? questionSlug: notification.link : blogSlug: notification.link }
                        >
                            <User
                                userId={notification.sender._id}
                                name={notification.sender.name}
                                photo={notification.sender.photo?.url}
                                username={notification.sender.username}
                            />
                            
                            <Text style={styles.notificationTitle}>{notification.title}</Text>
                        </TouchableOpacity>
                        <DeleteNotification notification={notification && notification}/>
                        
                        {/* <RemoveNotificationIcons
                            notification={notification}
                        /> */}
                    </View>
                ))}
                {loadMoreButton()}
            </ScrollView>
            <View style = {styles.footer}>
                <FooterTabs />
            </View>
        </SafeAreaView>

  )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollViewContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    notificationItem: {
        flex: 1,
        padding: 10,
    },
    notificationText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    notificationTitle: {
        fontSize: 14,
        color: 'gray',
    },
    button: {
        padding: 12,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    footer: {
      backgroundColor: '#333',
      justifyContent: 'flex-end',
    },   

    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
  button: {
    borderRadius: 20,
    backgroundColor: 'transparent',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonTextGray: {
    color: '#808080',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  icons: {
    marginLeft: 15,
    marginRight: 15,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // paddingBottom: 10,
  },
  dialog: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonRed: {
    borderRadius: 20,
    backgroundColor: 'red',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    // width: '45%',
    marginBottom: 10,
    borderWidth: 1,  // Add this line
    borderColor: 'red',  // Add this line
  },
  buttonTextWhite: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
    userAccessContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

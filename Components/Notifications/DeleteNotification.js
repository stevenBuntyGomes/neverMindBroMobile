import React, { useState, useEffect } from 'react';
import {
    Dimensions, SafeAreaView, View, Text, Modal,
    TouchableOpacity, ScrollView, StyleSheet, FlatList 
} from 'react-native';
import { removeUserNotificationAction } from '../../Actions/NotificationAction';
import {
    MaterialCommunityIcons
} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';


const DeleteNotification = ({notification = ''}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useDispatch();

    const menuVisibleHandler = () => {
        setMenuVisible(!menuVisible);
    };

    const deleteNotificationHandler = async () => {
        await dispatch(removeUserNotificationAction(notification._id));
    }
    
  return (
    <View style={styles.iconsContainer}>
        <TouchableOpacity style = {styles.icons} onPress = {menuVisibleHandler}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        </TouchableOpacity>

        {/* <TouchableOpacity style = {styles.icons} onPress={commentToggleHandler}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity> */}

    <Modal 
        visible={menuVisible} 
        transparent={true} 
        onRequestClose={() => setMenuVisible(!menuVisible)}
        animationType="slide"
        >
        <View style={styles.modalContainer}>
            <View style={styles.dialog}>
            <TouchableOpacity style={styles.buttonRed} onPress={deleteNotificationHandler}>
                <Text style={styles.buttonTextWhite}>Delete</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    </View>
  )
}

export default DeleteNotification

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
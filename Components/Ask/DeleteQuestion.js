import React, { useState } from 'react';
import { View, Text, 
    TouchableOpacity, 
    Alert, StyleSheet, Modal 
  } from 'react-native';
import {
    MaterialIcons,
    Ionicons,
    FontAwesome,
    AntDesign,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {deleteQuestionAction, updateQuestionAction} from '../../Actions/questionAnswerAction'
import UpdateQuestion from './UpdateQuestion';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const DeleteQuestion = ({question}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const currentRoute = useNavigationState((state) => state.routes[state.index].name);
    const [menuVisible, setMenuVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);


    const menuVisibleHandler = () => {
        setMenuVisible(!menuVisible);
    };

    const deleteQuestionHandler = async () => {
      console.log(question._id);
      await dispatch(deleteQuestionAction(question?._id));
          // Check if current page is 'SingleQuestion'
      Toast.show({
          type: 'error',
          text1: 'question deleted.',
      });

      if (currentRoute === 'SingleQuestion') {
        // Navigate back to home page if in SingleQuestion page
        navigation?.navigate('Home');
      } else {
        // Stay on the home page
      }

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
              <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('UpdateQuestion', { 
                questionUpdate: question,
                questionId: question._id,
              })}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonRed} onPress={deleteQuestionHandler}>
                <Text style={styles.buttonTextWhite}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
  )
}

export default DeleteQuestion

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
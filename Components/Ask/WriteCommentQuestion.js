import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Text,
  TextInput,
  IconButton,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../Actions/userAction';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { answerToQuestionAction } from '../../Actions/questionAnswerAction';
import { addCommentOnAnswer } from '../../Actions/CommentReplyAnswer';
import { API, DOMAIN, APP_NAME, FB_APP_ID, ENDPOINT } from '../../config';
import { commentNotificationAction } from '../../Actions/NotificationAction';
import { answerNotificationAction } from '../../Actions/NotificationAction';
import { ScrollView, View, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import {WebView} from 'react-native-webview';
import User from '../User/User';
import RenderHtml from 'react-native-render-html';
import { io } from 'socket.io-client';
import { getCategory } from '../../Actions/categoryAction';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library
import { filterFunction } from '../Filters/filter';
import * as Animatable from 'react-native-animatable';
let socket;

const handleHead = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H2</Text>
const handleHead3 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H3</Text>
const handleHead4 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H4</Text>
const handleHead5 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H5</Text>
const handleHead6 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H6</Text>

const WriteCommentQuestion = ({
  answerId,
  question,
  answer,
  reactionAnswer,
  auth,
  onClose,
}) => {
  const richText = useRef();
  const dispatch = useDispatch();
  const contentWidth = Dimensions.get('window').width;
  const [showMsg, setShowMsg] = useState('');
  const [msgType, setMsgType] = useState(0);
  const [commentBody, setCommentBody] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [commentImage, setCommentImage] = useState([]);
  const {categories} = useSelector((state) => state.category); 

  const handleBodyChange = (content) => {
    setCommentBody(content);
    AsyncStorage.setItem('blog', content);
  };

  const handleError = () => {
    setMsgType(0);
    setShowMsg('');
  };

  const handleMsg = () => {
    setMsgType(0);
    setShowMsg('');
  };

  useEffect(() => {
    const result = filterFunction(commentBody, selectedCategories);
    // console.log(result);
    setOutputText(result);
  }, [selectedCategories, commentBody]);

  const showError = () => {
    return (
      <View style={styles.alertContainer}>
        {msgType === 2 && (
          <View style={styles.alert}>
            <Text style={styles.alertText}>Error while creating form</Text>
            <IconButton icon={() => <FontAwesomeIcon icon={faXmark} />} onPress={handleError} />
          </View>
        )}
      </View>
    );
  };

  
  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'], // Use websocket for better performance in React Native
    });
    dispatch(getCategory());
  }, []);

  const showMessage = () => {
    return (
      <View style={styles.alertContainer}>
        {msgType === 1 && (
          <View style={styles.alert}>
            <Text style={styles.alertText}>{message}</Text>
            <IconButton icon={() => <FontAwesomeIcon icon={faXmark} />} onPress={handleMsg} />
          </View>
        )}
      </View>
    );
  };



  const writeCommentHandler = async (e) => {
    e.preventDefault();
    if(!outputText){
        console.log('comment body can not be empty.');
    }else{
        await dispatch(addCommentOnAnswer(outputText, commentImage, answerId));
        setCommentImage('');
        setCommentBody('');
        // setCommentImagePreview([]);
        let followersChannel = question && question.followers;
        if(followersChannel.includes(answer.postedBy)){
            followersChannel = [...followersChannel, question.postedBy._id];
        }else{
            followersChannel = [...followersChannel, answer.postedBy, question.postedBy._id];
        }
        if(followersChannel.indexOf(auth._id) !== -1){
            followersChannel.splice(followersChannel.indexOf(auth._id), 1);
        }
        let notifier = {
            userName: auth.name,
            sender: auth,
            authId: auth._id,
            answerPostedBy: answer.postedBy, 
            questionId: question.postedBy._id,
            targetType: 'Comment',
            targetId: answer._id,
            link: question.slug,
        }
        let notification = `${notifier.userName} have commented on the answer ${answer.body.substring(0, 50)}`;
        await socket.emit('dispatch comment notification', auth._id, notifier, notification, followersChannel);
        await dispatch(commentNotificationAction(notifier, notification, followersChannel));
    }
  }

  return (
        <View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Write Comment</Text>
          </View>

          <View style={styles.formGroup}>
            {/* <WebView
              originWhitelist={['*']}
              source={{ html: '<div contenteditable="true">' + body + '</div>' }}
              onMessage={(event) => handleBodyChange(event.nativeEvent.data)}
              style={styles.editor}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Write something amazing..."
              value={commentBody}
              onChangeText={setCommentBody}
              multiline={true}
              numberOfLines={6}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>choose a Filter</Text>
            <Animatable.View animation="fadeInUp" duration={1000} style={styles.container}>
              {categories && (
                <SectionedMultiSelect
                  items={categories.map((category) => ({
                    name: category.name,
                    id: category.name,
                  }))}
                  uniqueKey="id"
                  selectText="Select Filter"
                  single={true} // Ensures only one item can be selected
                  onSelectedItemsChange={(selectedItems) => {
                    // Store only the first selected item as a string
                    if (selectedItems.length > 0) {
                      setSelectedCategories(selectedItems[0]);
                    } else {
                      setSelectedCategories(''); // Clear the selection if no item is selected
                    }
                  }}
                  selectedItems={selectedCategories ? [selectedCategories] : []} // Wrap in array for compatibility
                  showDropDowns={true}
                  readOnlyHeadings={false}
                  IconRenderer={Icon}
                  styles={multiSelectStyles}
                />
              )}
            </Animatable.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={writeCommentHandler}>
              <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={onClose}>
              <Text style={styles.buttonTextWhite}>close</Text>
          </TouchableOpacity>
          <Text style={styles.label}>The output will look like this</Text>
          <RenderHtml
            contentWidth={contentWidth}
            baseStyle={{ fontSize: 18 }}
            source={{ html: outputText }}
            // source={{ html: `${answer.body.slice(0, 230)}...` }}
          />
        </View>
  )
}

const styles = StyleSheet.create({
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editor: {
    height: 200,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#333',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonTextWhite: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  alertContainer: {
    marginTop: 10,
  },
  alert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  alertText: {
    color: 'white',
  },
  input: {
      backgroundColor: '#eee',
      borderRadius: 5,
      padding: 12,
      margin: 0,
      width: '100%',
  },
});

const multiSelectStyles = {
  selectToggle: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  chipsWrapper: {
    marginTop: 10,
  },
  chipContainer: {
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
};


export default WriteCommentQuestion
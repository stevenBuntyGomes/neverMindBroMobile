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
import { API, DOMAIN, APP_NAME, FB_APP_ID, ENDPOINT } from '../../config';
// import { io } from 'socket.io-client';
// import { answerNotificationAction } from '../../Actions/NotificationAction';
import { updateReplyOnBlogCommentAction } from '../../Actions/CommentReplyActiion';
import { ScrollView, View, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import {WebView} from 'react-native-webview';
import User from '../User/User';
let socket;


const handleHead = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H2</Text>
const handleHead3 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H3</Text>
const handleHead4 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H4</Text>
const handleHead5 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H5</Text>
const handleHead6 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H6</Text>

const UpdateReplyBlog = ({
  open,
  onClose,
  username,
  name,
  comment,
  commentId,
  replyId,
  replyUserId,
  selectedBlog,
  auth,
}) => {
  const richText = useRef();
  const dispatch = useDispatch();
  const contentWidth = Dimensions.get('window').width;
  const [showMsg, setShowMsg] = useState('');
  const [msgType, setMsgType] = useState(0);
  const [replyBody, setReplyBody] = useState('');
  const [replyImage, setReplyImage] = useState([]);

  const handleBodyChange = (content) => {
    setReplyBody(content);
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


    const updateCommentHandler = async (e) => {
      e.preventDefault();
      if(!replyBody){
          console.log('comment body can not be empty.');
      }else{
          await dispatch(updateReplyOnBlogCommentAction(replyBody, replyImage, selectedBlog._id, commentId, replyId));
          setReplyImage([]);
          onClose();
          // setCommentImagePreview([]);
      }
    }

  useEffect(() => {
    setReplyBody(comment);
  }, [selectedBlog]);
  return (
              <Modal
            visible={open}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
          >
            <View style={styles.modalContainer}>
              <View style={styles.dialog}>
                <View>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Update Reply</Text>
                  </View>

                  <View style={styles.formGroup}>
                    {/* <WebView
                      originWhitelist={['*']}
                      source={{ html: '<div contenteditable="true">' + body + '</div>' }}
                      onMessage={(event) => handleBodyChange(event.nativeEvent.data)}
                      style={styles.editor}
                    /> */}
                    <RichEditor
                      ref={richText}
                      onChange={handleBodyChange}
                      style={styles.editor}
                      placeholder="Write something amazing..."
                      initialContentHTML={replyBody}
                    />
                    <RichToolbar
                      editor={richText}
                      actions={[
                        actions.heading2,  
                        actions.heading3,  
                        actions.heading4,  
                        actions.heading5,  
                        actions.setBold, 
                        actions.setItalic, 
                        actions.insertBulletsList, 
                        actions.insertOrderedList, 
                        actions.insertLink,
                      ]}
                      iconTint="black"
                      selectedIconTint="blue"
                      disabledIconTint="gray"
                      iconMap={{ 
                        [actions.heading2]: handleHead, 
                        [actions.heading3]: handleHead3, 
                        [actions.heading4]: handleHead4, 
                        [actions.heading5]: handleHead5,  
                      }}
                    />
                  </View>
                  <TouchableOpacity style={styles.button} onPress={updateCommentHandler}>
                      <Text style={styles.buttonText}>Update Reply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonRed} onPress={onClose}>
                      <Text style={styles.buttonTextWhite}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
  )
}

export default UpdateReplyBlog


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

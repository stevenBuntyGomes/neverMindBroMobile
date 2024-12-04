import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {
    MaterialIcons,
    Ionicons,
    FontAwesome,
    AntDesign,
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from 'react-native-paper';
import { API, DOMAIN, APP_NAME, FB_APP_ID, ENDPOINT } from '../../config';
import { addRemoveReplyLikeAction, deleteReplyOnCommentAction } from '../../Actions/CommentReplyActiion' 
import UpdateReplyBlog from './UpdateReplyBlog';
import { blogLikeNotificationAction, unlikeNotificationAction } from '../../Actions/NotificationAction';
import User from '../User/User';
import RenderHtml from 'react-native-render-html';
import {io} from 'socket.io-client'
let socket;

const ReplyBlogCard = ({
  key,
  userId,
  username,
  name,
  replyImg,
  photo,
  comment,
  commentId,
  replyId,
  replyUserId,
  selectedBlog,
  user,
  likes,
  auth,
  mainComment,
}) => {
    const dispatch = useDispatch();
    const [replyToggle, setReplyToggle] = useState(false);
    const [updateReply, setUpdateReply] = useState(false);
    const contentWidth = Dimensions.get('window').width;
    // write comment feature image starts
    const [replyImage, setReplyImage] = useState('');
    const [replyImagePreview, setReplyImagePreview] = useState([]);
    const [featureIndex, setFeatureIndex] = useState(-1);
    const [userLikes, setUserLikes] = useState(false);


    const handleReplyLike = async () => {
      await dispatch(addRemoveReplyLikeAction(selectedBlog._id, commentId, replyId));
      let followers = auth.followers;
      let followings = auth.following;
      
      let notifyArray = [...followers, ...followings];
      if(selectedBlog.postedBy._id.toString() !== auth._id.toString()){
          notifyArray = [...notifyArray, selectedBlog.postedBy._id.toString()];
      }
      let arrayToString = notifyArray.map(objId => objId.toString()); 
      let followersChannel = [...new Set(arrayToString)];
      // notification on like and unlike ends
      let notifier = {
        userName: auth.name,
        sender: auth,
        authId: auth._id,
      //   answerPostedBy: answer.postedBy, 
      //   questionId: blog.postedBy._id,
        blogTargetType: 'Reply Like',
        targetId: selectedBlog._id,
        link: selectedBlog.slug,
      }
      let notification = `${auth.name} have liked the Reply ${comment} of comment ${mainComment} of blog ${selectedBlog.title}`;
      if(likes.includes(auth._id)){
        console.log('unliked blog');
        await dispatch(unlikeNotificationAction(notifier));
      }else{
        console.log('liked');
        await socket.emit('blog Reply like notification', auth._id, notifier, notification, followersChannel);
        await dispatch(blogLikeNotificationAction(notifier, notification, followersChannel));
      }
    }

    const deleteReplyHandler = async () => {
      await dispatch(deleteReplyOnCommentAction(selectedBlog._id, commentId, replyId));
    }

    const replyToggleToggleHandler = () => {
        setReplyToggle(!replyToggle);
    }

    const updateReplyToggle = () => {
        setReplyToggle(false);
        setUpdateReply(true);
    }
    const closeReplyToggle = () => {
        setUpdateReply(false);
    }

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'], // Use websocket for better performance in React Native
    });
  }, []);

  return (
    <SafeAreaView>
      <View style = {styles.container}>
        <View>
          <User
            key={userId}
            userId={userId}
            name={name}
            photo={photo}
            username={username}
          />
          <RenderHtml
            contentWidth={contentWidth}
            source={{ html: comment }}
            // source={{ html: `${answer.body.slice(0, 230)}...` }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setUserLikes(!userLikes)} 
            disabled={likes && likes.length === 0 ? true : false}>
              <Text style={!likes.length ? styles.buttonTextGray : styles.buttonText}>{`${likes && likes.length} Likes`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style = {styles.icons} onPress = {handleReplyLike}>
            {/* <Text>{answer?.likes?.includes(auth && auth?._id)}</Text> */}
            {likes && likes?.includes(auth?._id) ? (
              <AntDesign name="heart" size={24} color="red" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            )}
          </TouchableOpacity>
          {selectedBlog?.postedBy?._id == auth?._id ? (
            <TouchableOpacity onPress={replyToggleToggleHandler}>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          ) : replyUserId == auth?._id ? (
            <TouchableOpacity onPress={replyToggleToggleHandler}>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          ) : <></>}
          <Modal
            visible={replyToggle} 
            transparent={true} 
            onRequestClose={replyToggleToggleHandler}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.dialog}>
                <TouchableOpacity style={styles.button} onPress={updateReplyToggle}>
                  <Text style={styles.buttonText}>Edit Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRed} onPress={deleteReplyHandler}>
                  <Text style={styles.buttonTextWhite}>Delete Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <UpdateReplyBlog
          open = {updateReply}
          onClose = {closeReplyToggle} 
          username = {username} 
          name = {name}
          comment = {comment}
          commentId = {commentId}
          replyId = {replyId}
          replyUserId = {replyUserId}
          selectedBlog = {selectedBlog && selectedBlog}
          auth = {auth}
        />
      </View>
    </SafeAreaView>
  )
}

export default ReplyBlogCard


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
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
    marginLeft: 30,
    marginRight: 30,
  },
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

});

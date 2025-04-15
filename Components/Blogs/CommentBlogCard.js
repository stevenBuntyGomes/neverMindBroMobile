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
import { getUserProfile } from '../../Actions/userAction';
import { deleteCommentAction, addRemoveCommentLikeAction } from '../../Actions/CommentReplyActiion'
import { IconButton } from 'react-native-paper';
import { API, DOMAIN, APP_NAME, FB_APP_ID, ENDPOINT } from '../../config';
import WriteReplyBlog from './WriteReplyBlog';
import ReplyBlogCard from './ReplyBlogCard';
// import RenderHtml from 'react-native-render-html';
import User from '../User/User';
import { getSingle } from '../../Actions/questionAnswerAction'
import UpdateCommentBlog from './UpdateCommentBlog';
import Toast from 'react-native-toast-message';
import { blogLikeNotificationAction, unlikeNotificationAction } from '../../Actions/NotificationAction';
import {io} from 'socket.io-client'
let socket;

const CommentBlogCard = ({
  userId,
  username,
  name,
  commentImg,
  photo,
  comment,
  commentId,
  commentUserId,
  selectedBlog,
  user,
  likes,
  reply,
  auth,
  blog,
}) => {
  const dispatch = useDispatch();
  const contentWidth = Dimensions.get('window').width;
  const [replyToggle, setReplyToggle] = useState(false);
  const [userLikes, setUserLikes] = useState(false);
  const [updateCommentToggle, setUpdateCommentToggle] = useState(false);
  const [commentImage, setCommentImage] = useState('');
  const [commentImagePreview, setCommentImagePreview] = useState([]);
  const [featureIndex, setFeatureIndex] = useState(-1);
  const [commentUpdate, setCommentUpdate] = useState(false);


  const handleCommentLike = async () => {
    await dispatch(addRemoveCommentLikeAction(selectedBlog._id, commentId));
      // notification on like and unlike starts
      let followers = auth.followers;
      let followings = auth.following;
      
      let notifyArray = [...followers, ...followings];
      if(blog.postedBy._id.toString() !== auth._id.toString()){
          notifyArray = [...notifyArray, blog.postedBy._id.toString()];
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
        blogTargetType: 'Comment Like',
        targetId: blog._id,
        link: blog.slug,
      }
      let notification = `${auth.name} have liked the comment ${comment} of blog ${blog.title}`;
      if(likes.includes(auth._id)){
        console.log('unliked blog');
        await dispatch(unlikeNotificationAction(notifier));
      }else{
        console.log('liked');
        await socket.emit('blog comment like notification', auth._id, notifier, notification, followersChannel);
        await dispatch(blogLikeNotificationAction(notifier, notification, followersChannel));
      }
  };

    const deleteCommentHandler = async () => {
      await dispatch(deleteCommentAction(selectedBlog._id, commentId));
    };

    const replyToggleHandler = () => {
      // getSingleAnswer();
      setReplyToggle(!replyToggle);
    };

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'], // Use websocket for better performance in React Native
    });
  }, []);


    const UpdateCommentToggleHandler = () => {
      // getSingleAnswer();
      setUpdateCommentToggle(!updateCommentToggle);
    };

    const commentToggleHandler = () => {
      // getSingleAnswer();
      setUpdateCommentToggle(false);
      setCommentUpdate(!commentUpdate);
    };
  return (
     <SafeAreaView>
      <View style = {styles.container}>
        <View>
          <User
            key={userId}
            userId={userId}
            name={name}
            photo={photo && photo}
            username={username}
          />
          <Text style={styles.answerBody}>
              {comment}
          </Text>
          {/* <RenderHtml
            contentWidth={contentWidth}
            source={{ html: comment }}
          /> */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setUserLikes(!userLikes)} 
            disabled={likes && likes.length === 0 ? true : false}>
              <Text style={!likes.length ? styles.buttonTextGray : styles.buttonText}>{`${likes && likes.length} Likes`}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = {styles.button} 
            onPress={() => setReplyToggle(!replyToggle)} 
            disabled={reply && reply?.length === 0 ? true : false}>
              <Text style = {!reply?.length ? styles.buttonTextGray : styles.buttonText}>{`${reply && reply?.length} Replys`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style = {styles.icons} onPress = {handleCommentLike}>
            {/* <Text>{answer?.likes?.includes(auth && auth?._id)}</Text> */}
            {/* likes && likes?.findIndex((l) => l._id == auth?._id) > -1 */}
            {likes && likes?.includes(auth?._id) ? (
              <AntDesign name="heart" size={24} color="red" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style = {styles.icons} onPress={() => setReplyToggle(!replyToggle)}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          {blog?.postedBy?._id == auth?._id ? (
            <View>
              <TouchableOpacity onPress={UpdateCommentToggleHandler}>
                <MaterialIcons name="more-vert" size={24} color="black" />
              </TouchableOpacity>
              <Modal
                visible={updateCommentToggle} 
                transparent={true} 
                onRequestClose={() => setUpdateCommentToggle(!updateCommentToggle)}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={styles.dialog}>
                    <TouchableOpacity style={styles.button} onPress={commentToggleHandler}>
                      <Text style={styles.buttonText}>Edit Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRed} onPress={deleteCommentHandler}>
                      <Text style={styles.buttonTextWhite}>Delete Comment</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          ): commentUserId == auth?._id ? (
            <View>
              <TouchableOpacity onPress={UpdateCommentToggleHandler}>
                <MaterialIcons name="more-vert" size={24} color="black" />
              </TouchableOpacity>
              <Modal
                visible={updateCommentToggle} 
                transparent={true} 
                onRequestClose={() => setUpdateCommentToggle(!updateCommentToggle)}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={styles.dialog}>
                    <TouchableOpacity style={styles.button} onPress={commentToggleHandler}>
                      <Text style={styles.buttonText}>Edit Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRed} onPress={deleteCommentHandler}>
                      <Text style={styles.buttonTextWhite}>Delete Comment</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          ): <></>}
          <UpdateCommentBlog
            open = {commentUpdate}
            onClose = {commentToggleHandler}
            blog = {blog && blog}
            comment = {comment}
            commentId = {commentId}
            commentUserId = {userId}
            selectedBlog = {selectedBlog && selectedBlog}
            auth={auth}
          />
        </View>
        <Modal
          visible={replyToggle}
          animationType="slide"
          transparent={true}
          onRequestClose={replyToggleHandler}
        >
          <TouchableWithoutFeedback onPress={() => setReplyToggle(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.dialog}>
              <WriteReplyBlog
                blogId = {selectedBlog?._id}
                commentId = {commentId}
                selectedBlog = {selectedBlog}
                auth={auth}
                onClose = {replyToggleHandler}
                mainComment = {comment}
              />
              {/* comments starts */}
                  
                  {
                    reply?.length > 0 ? reply?.map((repli, index) => (
                      <ReplyBlogCard
                          key = {index}
                          userId = {repli?.user?._id}
                          username = {repli?.user?.username}
                          name = {repli?.user?.name}
                          replyImg = {repli?.image && repli?.image}
                          photo = {repli?.user?.photo && repli?.user?.photo?.url}
                          comment = {repli?.comment}
                          commentId = {commentId}
                          replyId = {repli?._id}
                          replyUserId = {repli?.user._id}
                          selectedBlog = {selectedBlog}
                          user = {user && user}
                          likes = {repli?.likes && repli?.likes}
                          auth = {auth}
                          mainComment = {comment}
                        />
                    )) : (
                        <Text>No Comments Yet</Text>
                    ) 
                  }
              {/* comments ends */}
            </ScrollView>
          </View>
        </Modal>
        <Toast/>
      </View>
     </SafeAreaView>
  )
}

export default CommentBlogCard


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
  answerBody: {
      fontSize: 16,
      marginVertical: 10,
  },

});

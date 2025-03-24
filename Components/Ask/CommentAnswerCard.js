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
import { deleteCommentAnswerAction, addRemoveCommentLikeAnswerAction } from '../../Actions/CommentReplyAnswer'
import { IconButton } from 'react-native-paper';
import { API, DOMAIN, APP_NAME, FB_APP_ID, ENDPOINT } from '../../config';
import UpdateAnswerDialog from './UpdateAnswerDialog';
import WriteReplyAnswer from './WriteReplyAnswer';
import ReplyAnswerCard from './ReplyAnswerCard';
import RenderHtml from 'react-native-render-html';
import User from '../User/User';
import { getSingle } from '../../Actions/questionAnswerAction'
import UpdateCommentAnswer from './UpdateCommentAnswer';
import Toast from 'react-native-toast-message';
import { LikeNotificationAction, unlikeNotificationAction } from '../../Actions/NotificationAction';
import {io} from 'socket.io-client'
import { getSocket } from '../../SocketClient';
let socket;

const CommentAnswerCard = ({
  userId,
  username,
  name,
  commentImg,
  photo,
  comment,
  commentId,
  commentUserId,
  reactionAnswer,
  user,
  likes,
  reply,
  question,
  answer,
  auth,
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
    let followersChannel = question && question.followers;
    if (followersChannel.includes(answer.postedBy)) {
      followersChannel = [...followersChannel, question.postedBy._id];
    } else {
      followersChannel = [...followersChannel, answer.postedBy, question.postedBy._id];
    }
    if (followersChannel.indexOf(auth._id) !== -1) {
      followersChannel.splice(followersChannel.indexOf(auth._id), 1);
    }
    await dispatch(addRemoveCommentLikeAnswerAction(reactionAnswer._id, commentId));
    let notifier = {
      userName: auth.name,
      sender: auth,
      authId: auth._id,
      answerPostedBy: answer.postedBy,
      questionId: question.postedBy._id,
      targetType: 'Like',
      targetId: commentId,
      link: question.slug,
    };
    let notification = `${notifier.userName} have liked comment ${comment.substring(0, 50)}... of answer ${answer.body.substring(0, 50)}...`;
    let index = answer.comments.findIndex((l) => l._id == commentId);
    if (index !== -1) {
      if (answer.comments[index].likes.includes(auth._id)) {
        await dispatch(unlikeNotificationAction(notifier));
      } else {
        await socket.emit('setUp comment like notification', auth._id, notifier, notification, followersChannel);
        await dispatch(LikeNotificationAction(notifier, notification, followersChannel));
      }
    }
  };

  const deleteCommentHandler = async () => {
    await dispatch(deleteCommentAnswerAction(reactionAnswer._id, commentId));
  };

  const getSingleAnswer = async () => {
    await dispatch(getReactionAnswer(answer._id));
  };

  const replyToggleHandler = () => {
    // getSingleAnswer();
    setReplyToggle(!replyToggle);
  };
  const UpdateCommentToggleHandler = () => {
    // getSingleAnswer();
    setUpdateCommentToggle(!updateCommentToggle);
  };
  const commentToggleHandler = () => {
    // getSingleAnswer();
    setUpdateCommentToggle(false);
    setCommentUpdate(!commentUpdate);
  };

  

  useEffect(() => {
    socket = getSocket();
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
          {/* <Text style={styles.answerDate}>Published {formatDistanceToNow(new Date(answer?.createdAt))}</Text>
          <Text style={styles.answerBody}>
              {showFullAnswer !== answer._id ? `${answer.body.slice(0, 230)}...` : answer.body}
          </Text> */}
          <RenderHtml
            contentWidth={contentWidth}
            source={{ html: comment }}
            // source={{ html: `${answer.body.slice(0, 230)}...` }}
          />
          {/* <Reaction question={selectedQuestion} answer={reactionAnswer} /> */}
          {/* {comment?.body?.length > 230 && (
            <>
              <TouchableOpacity 
                  style={styles.buttonBorderless} 
                  onPress={() => setShowFullAnswer(showFullAnswer == comment._id ? -1 : comment._id)}>
                  <Text style={styles.buttonText}>{showFullAnswer === comment._id ? `See Less` : `See More`}</Text>
              </TouchableOpacity>
            </>
            
          )} */}
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
          {answer?.postedBy?._id == auth?._id ? (
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
          ) : commentUserId == auth?._id ? (
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
          <UpdateCommentAnswer
            open = {commentUpdate}
            onClose = {commentToggleHandler}
            question = {question}
            answer = {answer}
            comment = {comment}
            commentId = {commentId}
            commentUserId = {userId}
            reactionAnswer = {reactionAnswer && reactionAnswer}
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
              <WriteReplyAnswer
                answerId={reactionAnswer?._id}
                commentId = {commentId}
                question={question}
                answer={answer}
                reactionAnswer = {reactionAnswer}
                auth={auth}
                onClose = {replyToggleHandler}
              />
              {/* comments starts */}
                  
                  {
                    reply?.length > 0 ? reply?.map((repli, index) => (
                      <>
                        <ReplyAnswerCard
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
                          reactionAnswer = {reactionAnswer}
                          user = {user && user}
                          likes = {repli?.likes && repli?.likes}
                          question = {question}
                          answer = {answer}
                          auth = {auth}
                          commentHeader = {comment}
                      />
                        
                      </>
                    )) : (
                        <Text>No Comments Yet</Text>
                    ) 
                  }
              {/* comments ends */}
            </ScrollView>
          </View>
        </Modal>
      </View>
      <Toast/>
    </SafeAreaView>
  )
}

export default CommentAnswerCard

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

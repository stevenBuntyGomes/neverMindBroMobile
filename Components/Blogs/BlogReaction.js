import React, { useState, useEffect } from 'react';
import { 
  View, Text, Button, Modal, StyleSheet, 
  FlatList, TouchableOpacity, SafeAreaView, Dimensions, ScrollView,
} from 'react-native';
import { Avatar, IconButton, Dialog, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
} from '@expo/vector-icons';
import {
  likeUnlikeAnswersAction, 
  getReactionAnswer,
  deleteAnswerAction,
} from '../../Actions/questionAnswerAction';
import { readSingleBlog, likeUnlikeBlogs, removeBlogs } from '../../Actions/blogAction';
import User from '../User/User';
import WriteCommentBlog from './WriteCommentBlog';
import CommentBlogCard from './CommentBlogCard';
import { isAuth, getUserProfile } from '../../Actions/userAction'
// import { LikeNotificationAction, unlikeNotificationAction } from '../../Actions/NotificationAction';
// import { io } from 'socket.io-client';
import { API, DOMAIN, APP_NAME, FB_APP_ID, ENDPOINT } from '../../config';
import RenderHtml from 'react-native-render-html';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { nullifyBlog } from '../../Reducers/blogReducer';
import { blogLikeNotificationAction } from '../../Actions/NotificationAction';
import {io} from 'socket.io-client'
let socket;

const BlogReaction = ({ blog, auth }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contentWidth = Dimensions.get('window').width;
  const {
    blog: selectedBlog,
    updateBlogMessage,
    blogDeleteMessage,
  } = useSelector((state) => state.blog);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const [commentToggle, setCommentToggle] = useState(false);
  const [userLikes, setUserLikes] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [showFullAnswer, setShowFullAnswer] = useState(-1);
  const [channelConnector, setChannelConnector] = useState(0);
  const [addAnswerOpen, setAddAnswerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const handleAddAnswerOpen = () => {
    setAddAnswerOpen(true);
    setAnchorEl(false);
  };

  const handleAddAnswerClose = () => setAddAnswerOpen(false);

    const getSingleBlog = async () => {
        await dispatch(readSingleBlog(blog?.slug));
    };

    const commentToggleHandler = () => {
        getSingleBlog();
        setCommentToggle(!commentToggle);
    };


    const userLikesToggleHandler = () => {
        getSingleBlog();
        setUserLikes(!userLikes);
    };
    const answerUpdateToggleHandler = () => {
        // getSingleAnswer();
        setAnchorEl(!anchorEl);
    };

  const deleteBlogHandler = async () => {
    console.log(auth.role);
    await dispatch(removeBlogs(blog.slug, auth.role));
  };

  useEffect(() => {
    getSingleBlog();
    // console.log(answer.likes);
  }, [dispatch]);

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'], // Use websocket for better performance in React Native
    });
  }, []);

  useEffect(() => {
    if(blogDeleteMessage !== null){
      navigation.navigate('Blogs');
    }
  }, [blogDeleteMessage]);

  useEffect(() => {
    setAddAnswerOpen(false);
    setChannelConnector(1);
  }, [selectedBlog]);

  const handleLike = async () => {
    await dispatch(likeUnlikeBlogs(blog?.slug));
    await dispatch(readSingleBlog(blog?.slug));

    let followers = auth?.followers;
    let followings = auth?.following;

    let notifyArray = [...followers, ...followings];
    let arrayToString = notifyArray.map(objId => objId.toString()); 
    let followersChannel = [...new Set(arrayToString)];
    let notifier = {
      userName: auth.name,
      sender: auth,
      authId: auth._id,
    //   answerPostedBy: answer.postedBy, 
    //   questionId: blog.postedBy._id,
      blogTargetType: 'Like',
      targetId: blog._id,
      link: blog.slug,
    }

    let notification = `${auth?.name} have liked the blog ${blog.title}`;

    if(selectedBlog.likes.some(like => like._id.toString() == auth._id.toString())){
    //   await dispatch(unlikeNotificationAction(notifier));
    }else{
      await socket.emit('blog like notification', auth._id, notifier, notification, followersChannel);
      await dispatch(blogLikeNotificationAction(notifier, notification, followersChannel));
    }
  };

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={userLikesToggleHandler} disabled={!blog?.likes?.length}>
                    <Text style={!blog?.likes?.length ? styles.buttonTextGray : styles.buttonText}>{`${blog && blog?.likes?.length} Likes`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress = {commentToggleHandler} disabled={!selectedBlog?.comments?.length}>
                    <Text style = {!blog?.comments?.length ? styles.buttonTextGray : styles.buttonText}>{`${blog?.comments?.length} Comments`}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                <TouchableOpacity style = {styles.icons} onPress = {handleLike}>
                {/* <Text>{answer?.likes?.includes(auth && auth?._id)}</Text> */}
                {blog && blog?.likes?.findIndex((l) => l._id === auth?._id) > -1 ? (
                    <AntDesign name="heart" size={24} color="red" />
                ) : (
                    <AntDesign name="hearto" size={24} color="black" />
                )}
                </TouchableOpacity>

                <TouchableOpacity style = {styles.icons} onPress={commentToggleHandler}>
                  <Ionicons name="chatbubble-outline" size={24} color="black" />
                </TouchableOpacity>

                {blog?.postedBy?._id == auth?._id && (
                <View>
                    <TouchableOpacity onPress={answerUpdateToggleHandler}>
                        <MaterialIcons name="more-vert" size={24} color="black" />
                    </TouchableOpacity>
                  <Modal
                    visible={anchorEl} 
                    transparent={true} 
                    onRequestClose={() => setAnchorEl(!anchorEl)}
                    animationType="slide"
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.dialog}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BlogUpdate', { 
                                blogUpdate: blog,
                                blogId: blog?._id,
                                blogRole: blog?.postedBy?.role
                              })}>
                                <Text style={styles.buttonText}>Edit Blog</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonRed} onPress={deleteBlogHandler}>
                                <Text style={styles.buttonTextWhite}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <Toast/>
                    </View>
                    </Modal>
                </View>
                )}
            </View>

            <Modal 
                visible={userLikes} 
                transparent={true} 
                onRequestClose={() => setUserLikes(!userLikes)}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.dialog}>
                        <Text style={styles.modalTitle}>Liked By</Text>
                        {selectedBlog?.likes?.length ? (
                            <FlatList
                                data={selectedBlog.likes}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                <User
                                    userId={item?._id}
                                    name={item?.name}
                                    photo={item?.photo?.url}
                                    username={item?.username}
                                />
                                )}
                            />
                        ) : (
                            <Text>No Likes Yet</Text>
                        )}
                        <TouchableOpacity style={styles.buttonRed} onPress={() => setUserLikes(!userLikes)}>
                          <Text style={styles.buttonTextWhite}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* comment modal starts */}
            <Modal
                visible={commentToggle}
                animationType="slide"
                transparent={true}
                onRequestClose={commentToggleHandler}
            >
                <View style={styles.modalContainer}>
                <ScrollView style={styles.dialog}>
                    <WriteCommentBlog
                        slug={blog?.slug}
                        // question={question}
                        // answer={answer}
                        selectedBlog = {selectedBlog}
                        auth={auth}
                        onClose = {commentToggleHandler}
                    />
                    {/* comments starts */}
                        
                        {
                        selectedBlog && selectedBlog?.comments?.length > 0 ? selectedBlog?.comments?.map((comment, index) => (
                            <CommentBlogCard
                                key = {index}
                                userId = {comment.user._id}
                                username = {comment.user.username}
                                name = {comment.user.name}
                                commentImg = {comment.image && comment.image}
                                photo = {comment?.user?.photo && comment?.user?.photo?.url}
                                comment = {comment.comment}
                                commentId = {comment._id}
                                commentUserId = {comment.user._id}
                                selectedBlog = {selectedBlog && selectedBlog}
                                user = {user && user}
                                likes = {comment?.likes && comment?.likes}
                                reply = {comment?.reply && comment?.reply}
                                auth = {auth}
                                blog = {selectedBlog && selectedBlog}
                            />
                        )) : (
                            <Text>No Comments Yet</Text>
                        ) 
                        }
                    {/* comments ends */}
                </ScrollView>
                </View>
            </Modal>
            {/* comment modal ends */}
            
            

            {/* <View>
            <User
                key={answer.postedBy?._id}
                userId={answer.postedBy?._id}
                name={answer.postedBy?.name}
                photo={answer.postedBy?.photo?.url}
                username={answer.postedBy?.username}
            />
            <RenderHtml
                contentWidth={contentWidth}
                source={{ html: showFullAnswer === answer._id ? answer.body : `${answer.body.slice(0, 230)}...` }}
                // source={{ html: `${answer.body.slice(0, 230)}...` }}
            />
            <Reaction question={selectedQuestion} answer={answer} />
            {answer.body.length > 230 && (
                <>
                <TouchableOpacity 
                    style={styles.buttonBorderless} 
                    onPress={() => setShowFullAnswer(showFullAnswer == answer._id ? -1 : answer._id)}>
                    <Text style={styles.buttonText}>{showFullAnswer === answer._id ? `See Less` : `See More`}</Text>
                </TouchableOpacity>
                </>
                
            )}
        </View> */}

            {/* <UpdateAnswerDialog
              open={addAnswerOpen}
              onClose={handleAddAnswerClose}
              message={message}
              question={question}
              answer={answer}
              auth = {auth && auth}
            /> */}
        </View>
    </SafeAreaView>
  )
}

export default BlogReaction

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

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../config';
import User from '../../Components/User/User';
import { getAuthUserInPublic, publicUserForFollow } from '../../Actions/publicUserAction';
import {
  readSingleQuestion,
  followUnfollowQuestionAction,
  deleteQuestionAction,
  deleteAnswerAction,
} from '../../Actions/questionAnswerAction';
import AnswerDialog from '../../Components/Ask/AnswerDialog';
import Reaction from '../../Components/Ask/Reaction';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { useCookies } from 'react-cookie';
import RenderHtml from 'react-native-render-html';
import DeleteQuestion from '../../Components/Ask/DeleteQuestion';
import FooterTabs from '../../Components/nav/FooterTabs';

const SingleQuestion = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { questionSlug } = route.params;
  const {token, loading} = useSelector((state) => state.user);
  const contentWidth = Dimensions.get('window').width;
  const getToken = async () => {
    const authToken = await AsyncStorage.getItem('@token');
    // dispatch(setTokenApp(authToken));
  }
//   const [cookies, setCookie] = useCookies(['acceptCookies']);
  const [showPopup, setShowPopup] = useState(false);
  const [showFullAnswer, setShowFullAnswer] = useState(-1);
  const [size, setSize] = useState();
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [addAnswerOpen, setAddAnswerOpen] = useState(false);
  const [addQuestionObj, setAddQuestionObj] = useState({});
  const [showMainAnswers, setShowMainAnswers] = useState([]);
  const [loadQuestion, setLoadQuestion] = useState({});
  const [loadingMoreAnswers, setLoadingMoreAnswers] = useState(false);
  
  const {
    auth,
    user,
    loading: userLoading,
  } = useSelector((state) => state.user);

  const {
    message,
    question: selectedQuestion,
    answers: selectedAnswers,
    newAnswer,
    answer: selectedAnswer,
    deleteQuestionId,
    deleteAnswerId,
    questionId,
    questionMessage,
    answerMessage,
    answerSize,
    updatedAnswer,
  } = useSelector((state) => state.questionAnswer);

  // scrolling with out button
  const handleScroll = async ({ layoutMeasurement, contentOffset, contentSize }) => {
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 800; // Increased threshold
    if (isCloseToBottom && !loadingMoreAnswers && size >= limit) {
      await loadMoreAnswerHandler();
    }
  };

  // scrolling with out button

  const getauthUserHandler = async () => {
    await dispatch(getAuthUserInPublic());
  }

  const handleAddAnswerOpen = (question) => {
    setAddAnswerOpen(true);
    setAddQuestionObj(question);
  };

  const handleAddAnswerClose = () => setAddAnswerOpen(false);

  const handleAddAnswerCreate = (question) => {
    // handleAddQuestionClose();
  };

  const followUnfollowQuestionHandler = async (questionId) => {
    await dispatch(followUnfollowQuestionAction(questionId));
  };

  const deleteQuestionHandler = async (questionId) => {
    await dispatch(deleteQuestionAction(questionId));
    navigation.navigate('Home');
  };

  const loadMoreAnswerHandler = async () => {
    if (loadingMoreAnswers) return;
    setLoadingMoreAnswers(true);
    let toSkip = skip + limit;
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(`${API}/question/get-question/${questionSlug}`, { skip: toSkip, limit }, config);
    setShowMainAnswers([...showMainAnswers, ...data.answers]);
    setSkip(toSkip);
    setSize(data.size);
    setLoadingMoreAnswers(false);
  };

  const loadMoreButton = () => {
    return (
      <>
        {size > 0 && size >= limit && (
          <TouchableOpacity style={styles.buttonBorderless} onPress={loadMoreAnswerHandler}>
            <Text style={styles.buttonText}>Load More</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  useEffect(() => {
    getauthUserHandler();
    if (questionSlug) {
      dispatch(readSingleQuestion(questionSlug, skip, limit));
    }
  }, [dispatch, questionSlug]);

  useEffect(() => {
    if (selectedAnswers) {
      setShowMainAnswers(selectedAnswers);
      setSize(answerSize);
    }
  }, [selectedAnswers]);

  useEffect(() => {
    if (selectedQuestion) {
      setLoadQuestion(selectedQuestion);
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (questionMessage) {
      Toast.show({
          type: 'success',
          text1: questionMessage,
      });
    }
    if (answerMessage) {
      Toast.show({
          type: 'success',
          text1: answerMessage,
      });
    }
  }, [questionMessage, answerMessage]);

  useEffect(() => {
    if(selectedAnswer){
      const updatedAnswers = [...showMainAnswers];
      const index = updatedAnswers.findIndex((l) => l._id == selectedAnswer._id);
      if(index !== -1){
        updatedAnswers[index] = selectedAnswer;
      }
      setShowMainAnswers([...updatedAnswers]);
      Toast.show({
          type: 'success',
          text1: 'answer updated successfully..',
      });
    }
    // if(updatedAnswer){
    //   Toast.show({
    //       type: 'success',
    //       text1: 'answer updated successfully..',
    //   });
    // }
  }, [selectedAnswer]);

  useEffect(() => {
    if(newAnswer){
      const updatedAnswers = [...showMainAnswers];
      updatedAnswers.unshift(newAnswer);
      setShowMainAnswers([...updatedAnswers]);
      // dispatch(nullifyAnswer());
      let newSkip = skip + 1;
      setSkip(newSkip);
      setAddAnswerOpen(false);
      Toast.show({
          type: 'success',
          text1: 'New answer added successfully..',
      });
    }
  }, [newAnswer]);

  useEffect(() => {
    if(deleteAnswerId){
      const updatedAnswers = [...showMainAnswers];
      const deleteAnswerIndex = updatedAnswers.findIndex((l) => l._id == deleteAnswerId);
      if(deleteAnswerIndex !== -1){
        updatedAnswers.splice(deleteAnswerIndex, 1);
      }
      setShowMainAnswers(updatedAnswers);
    }
  }, [deleteQuestionId, deleteAnswerId, questionId]);

//   useEffect(() => {
//     if (cookies.acceptCookies) {
//       const cookieAcceptedTime = new Date(cookies.acceptCookies);
//       const currentTime = new Date();
//       const timeDifference = (currentTime - cookieAcceptedTime) / (1000 * 60 * 60);
//       if (timeDifference >= 24) {
//         if (!auth) {
//           setShowPopup(true);
//         }
//       } else {
//         setShowPopup(false);
//       }
//     } else if (!cookies.acceptCookies && !auth) {
//       setShowPopup(true);
//     } else {
//       setShowPopup(false);
//     }
//   }, [auth, cookies]);
useEffect(() => {
    getToken();
  }, [dispatch]);

  if (userLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Toast/>
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
        >
            <View style={styles.questionContainer}>
              <View style = {styles.userAccessContainer}>
                <User
                  key={selectedQuestion && selectedQuestion?.postedBy?._id}
                  userId={selectedQuestion && selectedQuestion?.postedBy?._id}
                  name={selectedQuestion && selectedQuestion?.postedBy?.name}
                  photo={selectedQuestion && selectedQuestion?.postedBy?.photo?.url}
                  username={selectedQuestion && selectedQuestion?.postedBy?.username}
                  createdAt={selectedQuestion && selectedQuestion?.createdAt}
                />
                {auth && auth._id === selectedQuestion?.postedBy?._id ? (
                  <DeleteQuestion question={selectedQuestion && selectedQuestion}/>
                ) : (<></>)}
              </View>
              
                <Text style={styles.questionTitle}>{loadQuestion?.title}</Text>
                {/* <TouchableOpacity onPress={() => deleteQuestionHandler(loadQuestion && loadQuestion?._id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleAddAnswerOpen(loadQuestion && loadQuestion)}>
                    <Text style={styles.buttonText}>Answer</Text>
                </TouchableOpacity>
                
                {auth && (
                  <TouchableOpacity 
                      style={loadQuestion && loadQuestion?.followers?.includes(auth._id) ? styles.buttonRed : styles.button} 
                      onPress={() => followUnfollowQuestionHandler(loadQuestion && loadQuestion._id)}>
                      <Text style={loadQuestion && loadQuestion?.followers?.includes(auth._id) ? styles.buttonTextWhite : styles.buttonText}>{loadQuestion && loadQuestion?.followers?.includes(auth._id) ? 'Unfollow' : 'Follow'}</Text>
                  </TouchableOpacity>
                )}
            </View>
            <AnswerDialog
                open={addAnswerOpen}
                onClose={handleAddAnswerClose}
                onCreate={handleAddAnswerCreate}
                message={message}
                question={addQuestionObj}
                auth={auth && auth}
            />
            <ScrollView>
            {showMainAnswers && showMainAnswers.map((answer, index) => (
                <View key={index}>
                    <User
                      key={answer.postedBy?._id}
                      userId={answer.postedBy?._id}
                      name={answer.postedBy?.name}
                      photo={answer.postedBy?.photo?.url}
                      username={answer.postedBy?.username}
                      createdAt={answer && answer?.createdAt}
                    />
                    {/* <Text style={styles.answerDate}>Published {formatDistanceToNow(new Date(answer?.createdAt))}</Text>
                    <Text style={styles.answerBody}>
                        {showFullAnswer !== answer._id ? `${answer.body.slice(0, 230)}...` : answer.body}
                    </Text> */}
                    <RenderHtml
                      contentWidth={contentWidth}
                      baseStyle={{ fontSize: 18 }}
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
                </View>
                ))}
                {loadingMoreAnswers && (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                )}
                </ScrollView>
            <Toast />
        </ScrollView>
        <View style = {styles.footer}>
            <FooterTabs />
        </View>
    </SafeAreaView>
  );
};

export default SingleQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  userAccessContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    padding: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  answersContainer: {
    marginTop: 20,
  },
  answerItem: {
    marginBottom: 20,
  },
  answerDate: {
    fontSize: 12,
    color: 'grey',
  },
  answerBody: {
    fontSize: 16,
    marginVertical: 10,
  },

  button: {
    borderRadius: 20,
    backgroundColor: 'transparent',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
    borderWidth: 1,  // Add this line
    borderColor: '#333',  // Add this line
  },
  buttonBorderless: {
    borderRadius: 20,
    backgroundColor: 'transparent',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,  // Add this line
    borderColor: 'transparent',  // Add this line
  },
  buttonRed: {
    borderRadius: 20,
    backgroundColor: 'red',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
    borderWidth: 1,  // Add this line
    borderColor: 'red',  // Add this line
  },
    buttonText: {
      color: '#333',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    buttonTextWhite: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    footer: {
      backgroundColor: '#333',
        justifyContent: 'flex-end',
    },
    loaderContainer: {
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
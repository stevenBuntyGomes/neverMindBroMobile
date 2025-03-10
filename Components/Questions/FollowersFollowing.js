import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator,
  TouchableOpacity, Image, Dimensions} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Texts from '@kaloraat/react-native-text'
import SubmitButton from '../auth/SubmitButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Button } from 'react-native-paper';
import { getQuestion } from '../../Actions/questionAnswerAction';
import { API } from '../../config';
import { setTokenApp } from '../../Actions/userAction';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import Reaction from '../Ask/Reaction';
import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import User from '../User/User';
import DeleteQuestion from '../Ask/DeleteQuestion';
import axios from "axios";

const FollowersFollowing = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contentWidth = Dimensions.get('window').width;
  const {token, auth, user, loading: userLoading} = useSelector((state) => state.user);
  const {
    message, 
    questions, 
    size: questionSize, 
    question: selectedQuestion, 
    answers: selectedAnswers, 
    newQuestion,
    questionId, 
    deleteQuestionId, 
    deleteAnswerId,
  } = useSelector((state) => state.questionAnswer);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [size, setSize] = useState();
    const [limit, setLimit] = useState(2);
    const [skip, setSkip] = useState(0);
    // const [questions, setQuestions] = useState([]);
    const [addAnswerOpen, setAddAnswerOpen] = useState(false);
    const [addQuestionObj, setAddQuestionObj] = useState({});
    const [showFullAnswer, setShowFullAnswer] = useState(-1);
    // question skip and limit
    const [mainQuestions, setMainQuestions] = useState([]);
    const [loadMoreQuestions, setLoadMoreQuestions] = useState([]);
    const [loadingMoreQuestions, setLoadingMoreQuestions] = useState(false);
    const getToken = async () => {
      const authToken = await AsyncStorage.getItem('@token');
      dispatch(setTokenApp(authToken));
    }

    const handleScroll = async ({ layoutMeasurement, contentOffset, contentSize }) => {
      const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 800; // Increased threshold
      if (isCloseToBottom && !loadingMoreQuestions && size >= limit) {
        await loadMoreQuestionHandler();
      }
    };

    // questions choosing
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // questions choosing
      // follow unfollow question handler
  const followUnfollowQuestionHandler = async (questionId) => {
    await dispatch(getQuestion(questionId));
  }
  // follow unfollow question handler
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

//   const getauthUserHandler = async () => {
//       await dispatch(getAuthUserInPublic());
//   }

  const handleAddAnswerOpen = (question) => {
    setAddAnswerOpen(true);
    setAddQuestionObj(question);   
  } 
  const handleAddAnswerClose = () => setAddAnswerOpen(false);

  const getQuestionHandler = async () => {
    await dispatch(getQuestion(skip, limit));
    setMainQuestions([...questions]);
    setSize(questionSize);
  }


  const loadMoreQuestionHandler = async () => {
    if (loadingMoreQuestions) return;
    setLoadingMoreQuestions(true);
    let toSkip = skip + limit;
    const config = {
        headers: {
            "Accept": "application/json",
            "token": `${token}`
        },
    };
    const {data, status} = await axios.post(`${API}/question/get-question-following-followers`, {toSkip, limit}, config);
    setLoadMoreQuestions([...loadMoreQuestions, ...data.questions]);
    setSkip(toSkip);
    setSize(data.size);
    // await dispatch(getClientAdvertiseActions());
    setLoadingMoreQuestions(false);
  }

  useEffect(() => {
      getToken();
  }, [dispatch]);

  useEffect(() => {
    getQuestionHandler();
    setMainQuestions([...questions]);
    setSize(questionSize);
  }, [questionSize]);

  useEffect(() => {
    // getauthUserHandler();
    // getProfileHandler();
    if(newQuestion !== null){
        if(mainQuestions){
          const updatedQuestions = [...mainQuestions];
          updatedQuestions.unshift(newQuestion);
          setMainQuestions(updatedQuestions);
        }
    }
    if(selectedQuestion){
      if(mainQuestions){
        const index = mainQuestions.findIndex((l) => l._id === selectedQuestion._id);
        if(index !== -1){
          const updatedQuestions = [...mainQuestions];
          updatedQuestions[index] = selectedQuestion;
          setMainQuestions(updatedQuestions);
        }
      }
      const loadMoreQuestionIndex = loadMoreQuestions.findIndex((l) => l._id === selectedQuestion._id);
      if(loadMoreQuestionIndex !== -1){
        const updatedLoadMoreQuestions = [...loadMoreQuestions];
        updatedLoadMoreQuestions[loadMoreQuestionIndex] = selectedQuestion;
        setLoadMoreQuestions(updatedLoadMoreQuestions);
      } 
    }
  }, [dispatch, selectedQuestion, newQuestion]);


useEffect(() => {
  if (deleteQuestionId) {
    if (mainQuestions) {
      const index = mainQuestions.findIndex((l) => l._id === deleteQuestionId);
      if (index !== -1) {
        const updatedQuestions = [...mainQuestions]; // Create a shallow copy
        updatedQuestions.splice(index, 1); // Remove the question from the copy
        setMainQuestions(updatedQuestions); // Update the state with the new array
      }
    }

    const loadMoreQuestionIndex = loadMoreQuestions.findIndex((l) => l._id === deleteQuestionId);
    if (loadMoreQuestionIndex !== -1) {
      const updatedLoadMoreQuestions = [...loadMoreQuestions]; // Create a shallow copy
      updatedLoadMoreQuestions.splice(loadMoreQuestionIndex, 1); // Remove the question from the copy
      setLoadMoreQuestions(updatedLoadMoreQuestions); // Update the state with the new array
    }
  }

  if (deleteAnswerId) {
    if (mainQuestions) {
      const index = mainQuestions.findIndex((l) => l._id === questionId);
      if (index !== -1) {
        const updatedQuestions = [...mainQuestions]; // Create a shallow copy of mainQuestions
        const answerIndex = updatedQuestions[index].answer.findIndex((l) => l._id === deleteAnswerId);
        if (answerIndex !== -1) {
          updatedQuestions[index] = {
            ...updatedQuestions[index], // Create a shallow copy of the specific question object
            answer: updatedQuestions[index].answer.filter((l) => l._id !== deleteAnswerId) // Filter out the answer
          };
        }
        setMainQuestions(updatedQuestions); // Update the state with the modified array
      }
    }

    const loadMoreQuestionIndex = loadMoreQuestions.findIndex((l) => l._id === questionId);
    if (loadMoreQuestionIndex !== -1) {
      const updatedLoadMoreQuestions = [...loadMoreQuestions]; // Create a shallow copy of loadMoreQuestions
      const answerIndex = updatedLoadMoreQuestions[loadMoreQuestionIndex].answer.findIndex((l) => l._id === deleteAnswerId);
      if (answerIndex !== -1) {
        updatedLoadMoreQuestions[loadMoreQuestionIndex] = {
          ...updatedLoadMoreQuestions[loadMoreQuestionIndex], // Shallow copy of the specific question object
          answer: updatedLoadMoreQuestions[loadMoreQuestionIndex].answer.filter((l) => l._id !== deleteAnswerId) // Filter out the answer
        };
      }
      setLoadMoreQuestions(updatedLoadMoreQuestions); // Update the state with the modified array
    }
  }
}, [deleteQuestionId, deleteAnswerId, questionId]);



  const loadMoreButton = () => {
    return (
      <>
        {size > 0 && size >= limit && (
          <TouchableOpacity style={styles.buttonBorderless} onPress={loadMoreQuestionHandler}>
            <Text style={styles.buttonText}>Load More</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const infiniteQuestionLoading = () => {
    return (
        <View>
            {loadMoreQuestions && loadMoreQuestions.map((question, index) => (
                <View style={styles.individualQuestionContainer} key = {index}>
                    <View style = {styles.userAccessContainer}>
                      <User
                          key={question && question?.postedBy?._id}
                          userId={question && question?.postedBy?._id}
                          name={question && question?.postedBy?.name}
                          photo={question && question?.postedBy?.photo?.url}
                          username={question && question?.postedBy?.username}
                          createdAt={question && question?.createdAt}
                      />
                      {auth && auth._id === question?.postedBy._id ? (
                        <DeleteQuestion question={question && question}/>
                      ) : (<></>)}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SingleQuestion', { questionSlug: question.slug })} style={styles.resultItem}>
                        <Text style={styles.questionTitle}>{question?.title}</Text>
                    </TouchableOpacity>
                    
                    {/* <TouchableOpacity onPress={() => deleteQuestionHandler(loadQuestion && loadQuestion?._id)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity> */}

                    {question && question.answer?.slice(0, 5).map((answer, index) => (
                        <View key={index}>
                            {/* <Text style={styles.answerDate}>Published {formatDistanceToNow(new Date(answer?.createdAt))}</Text>
                            <Text style={styles.answerBody}>
                                {showFullAnswer !== answer._id ? `${answer.body.slice(0, 230)}...` : answer.body}
                            </Text> */}
                            <RenderHtml
                            baseStyle={{ fontSize: 18 }}
                            contentWidth={contentWidth}
                            source={{ html: showFullAnswer === answer._id ? answer.body : `${answer.body.slice(0, 230)}...` }}
                            // source={{ html: `${answer.body.slice(0, 230)}...` }}
                            />
                            <Reaction question={question && question} answer={answer} />
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
                </View>
            ))}
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
      >
        <View style={styles.questionContainer}>
            {mainQuestions && mainQuestions.map((question, index) => (
                <View style={styles.individualQuestionContainer} key = {index}>
                    <View style = {styles.userAccessContainer}>
                      <User
                          key={question && question?.postedBy?._id}
                          userId={question && question?.postedBy?._id}
                          name={question && question?.postedBy?.name}
                          photo={question && question?.postedBy?.photo?.url}
                          username={question && question?.postedBy?.username}
                          createdAt={question && question?.createdAt}
                      />
                      {auth && auth._id === question?.postedBy._id ? (
                        <DeleteQuestion question={question && question}/>
                      ) : (<></>)}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SingleQuestion', { questionSlug: question.slug })} style={styles.resultItem}>
                        <Text style={styles.questionTitle}>{question?.title}</Text>
                    </TouchableOpacity>
                    
                    {/* <TouchableOpacity onPress={() => deleteQuestionHandler(loadQuestion && loadQuestion?._id)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity> */}

                    {question && question.answer?.slice(0, 5).map((answer, index) => (
                        <View key={index}>
                            {/* <Text style={styles.answerDate}>Published {formatDistanceToNow(new Date(answer?.createdAt))}</Text>
                            <Text style={styles.answerBody}>
                                {showFullAnswer !== answer._id ? `${answer.body.slice(0, 230)}...` : answer.body}
                            </Text> */}
                            <RenderHtml
                              baseStyle={{ fontSize: 18 }}
                              contentWidth={contentWidth}
                              source={{ html: showFullAnswer === answer._id ? answer.body : `${answer.body.slice(0, 230)}...` }}
                            // source={{ html: `${answer.body.slice(0, 230)}...` }}
                            />
                            <Reaction question={question && question} answer={answer} />
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
                </View>
            ))}
            {infiniteQuestionLoading()}
            {loadingMoreQuestions && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FollowersFollowing

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
  userAccessContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
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
});
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, SafeAreaView, View, Text, Image, StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView, Modal, FlatList, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../../config';
import Reaction from '../Ask/Reaction';
import { useNavigation } from '@react-navigation/native';
import User from './User';
import DeleteQuestion from '../Ask/DeleteQuestion';
import axios from "axios";
import AnswerDialog from '../Ask/AnswerDialog';
import { getProfileQuestionAction, followUnfollowQuestionAction } from '../../Actions/questionAnswerAction';
import Toast from 'react-native-toast-message';

const ProfileQuestion = ({username = null}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {auth, user, loading: userLoading} = useSelector((state) => state.user);
    const {message, 
        question: selectedQuestion, 
        answers: selectedAnswers, 
        newQuestion,  profileQuestions: questions, 
        profileQuestionSize: questionSize,
        updatedQuestion,
    } = useSelector((state) => state.questionAnswer);
    const [size, setSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(3);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loadQuestions, setLoadQuestions] = useState([]);
    // create answer dialog box starts
    const [addAnswerOpen, setAddAnswerOpen] = useState(false);
    const [addQuestionObj, setAddQuestionObj] = useState({});
    const [loadingMoreQuestions, setLoadingMoreQuestions] = useState(false);

    const handleScroll = async ({ layoutMeasurement, contentOffset, contentSize }) => {
      const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 800; // Increased threshold
      if (isCloseToBottom && !loadingMoreQuestions && size >= limit) {
        await loadMoreQuestionHandler();
      }
    };
    const handleAddAnswerOpen = (question) => {
        setAddAnswerOpen(true);
        setAddQuestionObj(question);   
    } 
    const handleAddAnswerClose = () => setAddAnswerOpen(false);
    const handleAddAnswerCreate = (question) => {
        handleAddQuestionClose();
    };
    const getProfileQuestionHandler = async () => {
        await dispatch(getProfileQuestionAction(username, skip, limit));
    }
    const followUnfollowQuestionHandler = async (questionId) => {
        await dispatch(followUnfollowQuestionAction(questionId));
    }
    const loadMoreQuestionHandler = async () => {
        if (loadingMoreQuestions) return;
        setLoadingMoreQuestions(true);
        let toSkip = skip + limit;
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data, status} = await axios.post(`${API}/question/profileQuestion/get`, {username, skip: toSkip, limit}, config);
        setLoadQuestions([...loadQuestions, ...data.questions]);
        setSkip(toSkip);
        setSize(data.size);
        setLoadingMoreQuestions(false);
    }
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
    useEffect(() => {
        getProfileQuestionHandler();
    }, [dispatch]);
    useEffect(() => {
      setLoadQuestions([...questions]);
      setSize(questionSize);
        if(selectedQuestion){
            const loadQuestionIndex = loadQuestions.findIndex((l) => l._id === selectedQuestion._id);
            if(loadQuestionIndex != -1){
                const updatedLoadQuestions = [...loadQuestions];
                updatedLoadQuestions[loadQuestionIndex] = selectedQuestion;
                setLoadQuestions([...updatedLoadQuestions]);
            }
        }
    }, [dispatch, selectedQuestion, questionSize, username]);
    useEffect(() => {
        if(updatedQuestion){
            const loadQuestionIndex = loadQuestions.findIndex((l) => l._id === selectedQuestion._id);
            if(loadQuestionIndex != -1){
                const updatedLoadQuestions = [...loadQuestions];
                updatedLoadQuestions[loadQuestionIndex] = selectedQuestion;
                setLoadQuestions([...updatedLoadQuestions]);
            }
        }
    }, [updatedQuestion]);
  return (
     <SafeAreaView style={styles.container}>
        <Toast/>
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
        >
            {loadQuestions && loadQuestions.map((question, index) => (
                <View key = {index} style={styles.questionContainer}>
                    <TouchableOpacity onPress={() => navigation?.navigate('SingleQuestion', { questionSlug: question.slug })} style={styles.resultItem}>
                        <Text style={styles.questionTitle}>{question?.title}</Text>
                    </TouchableOpacity>
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => handleAddAnswerOpen(question && question)}>
                            <Text style={styles.buttonText}>Answer</Text>
                        </TouchableOpacity>
                        
                        {auth && (
                        <TouchableOpacity 
                            style={question && question?.followers?.includes(auth._id) ? styles.buttonRed : styles.button} 
                            onPress={() => followUnfollowQuestionHandler(question && question._id)}>
                            <Text style={question && question?.followers?.includes(auth._id) ? styles.buttonTextWhite : styles.buttonText}>{question && question?.followers?.includes(auth._id) ? 'Unfollow' : 'Follow'}</Text>
                        </TouchableOpacity>
                        )}
                    </View>
                </View>
            ))}
            {loadingMoreQuestions && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            <AnswerDialog
                open={addAnswerOpen}
                onClose={handleAddAnswerClose}
                onCreate={handleAddAnswerCreate}
                message = {message}
                question = {addQuestionObj}
            />
        </ScrollView>
        
     </SafeAreaView>
  )
}

export default ProfileQuestion

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
    fontSize: 16,
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
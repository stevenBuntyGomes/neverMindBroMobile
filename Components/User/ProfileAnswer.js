import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, SafeAreaView, View, Text, Image, StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView, Modal, FlatList, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../../config';
import Reaction from '../Ask/Reaction';
// import RenderHTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import User from './User';
import DeleteQuestion from '../Ask/DeleteQuestion';
import axios from "axios";
import AnswerDialog from '../Ask/AnswerDialog';
import { getProfileAnswerAction, followUnfollowQuestionAction } from '../../Actions/questionAnswerAction';
import Toast from 'react-native-toast-message';

const ProfileAnswer = ({username = null}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const contentWidth = Dimensions.get('window').width;
    const {auth, user, loading: userLoading} = useSelector((state) => state.user);
    const {message, answer, answers, answerSize} = useSelector((state) => state.questionAnswer);
    const [showFullAnswer, setShowFullAnswer] = useState(-1);
    const [size, setSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(2);
    const [loadAnswers, setLoadAnswers] = useState([]);
    const [loadingMoreAnswers, setLoadingMoreAnswers] = useState(false);


    const handleScroll = async ({ layoutMeasurement, contentOffset, contentSize }) => {
      const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 800; // Increased threshold
      if (isCloseToBottom && !loadingMoreAnswers && size >= limit) {
        await loadMoreAnswersHandler();
      }
    };
    
    const getProfileAnswerHandler = async () => {
        await dispatch(getProfileAnswerAction(username, skip, limit));
    }

    const loadMoreAnswersHandler = async () => {
        if (loadingMoreAnswers) return;
        setLoadingMoreAnswers(true);
        let toSkip = skip + limit;
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data, status} = await axios.post(`${API}/question/get/profileAnswer`, {username, skip: toSkip, limit}, config);
        setLoadAnswers([...loadAnswers, ...data.answers]);
        setSkip(toSkip);
        setSize(data.size);
        setLoadingMoreAnswers(false);
    }

    const loadMoreButton = () => {
        return (
        <>
            {size > 0 && size >= limit && (
            <TouchableOpacity style={styles.buttonBorderless} onPress={loadMoreAnswersHandler}>
                <Text style={styles.buttonText}>Load More</Text>
            </TouchableOpacity>
            )}
        </>
        );
    };

    useEffect(() => {
        getProfileAnswerHandler();
        setLoadAnswers([...answers]);
        setSize(answerSize);
    }, [dispatch, answerSize, username]);
    useEffect(() => {
        setLoadAnswers([...answers]);
    }, [answers]);

    useEffect(() => {
        if(answer){
            const loadAnswerIndex = loadAnswers.findIndex((l) => l._id == answer._id);
            if(loadAnswerIndex !== -1){
                const updatedLoadAnswers = [...loadAnswers];
                updatedLoadAnswers[loadAnswerIndex] = answer;
                setLoadAnswers([...updatedLoadAnswers]);
            }
        }
    }, [answer]);

  return (
    <SafeAreaView style={styles.container}>
        <Toast/>
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
        >
            {loadAnswers && loadAnswers.map((answer, index) => (
                <View key = {index} style={styles.questionContainer}>
                   <TouchableOpacity onPress={() => navigation?.navigate('SingleQuestion', { questionSlug: answer?.question?.slug })} style={styles.resultItem}>
                        <Text style={styles.questionTitle}>{answer?.question?.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.answerBody}>
                        {showFullAnswer !== answer._id ? `${answer.body.slice(0, 230)}...` : answer.body}
                    </Text>
                    {/* <RenderHTML
                        baseStyle={{ fontSize: 18 }}
                        contentWidth={contentWidth}
                        source={{ html: showFullAnswer === answer._id ? answer.body : `${answer.body.slice(0, 230)}...` }}
                    // source={{ html: `${answer.body.slice(0, 230)}...` }}
                    /> */}
                    <Reaction question={answer?.question} answer={answer} />
                    <>
                        <TouchableOpacity 
                            style={styles.buttonBorderless} 
                            onPress={() => setShowFullAnswer(showFullAnswer == answer._id ? -1 : answer._id)}>
                            <Text style={styles.buttonText}>{showFullAnswer === answer._id ? `See Less` : `See More`}</Text>
                        </TouchableOpacity>
                    </>     
                </View>
            ))}
            {loadingMoreAnswers && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
        </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileAnswer

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
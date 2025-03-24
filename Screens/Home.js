import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Texts from '@kaloraat/react-native-text'
import SubmitButton from '../Components/auth/SubmitButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FooterTabs from '../Components/nav/FooterTabs';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Button } from 'react-native-paper';
import Ask from '../Components/Ask/Ask';
import PopularQuestion from '../Components/Questions/PopularQuestion';
import FollowersFollowing from '../Components/Questions/FollowersFollowing';
import TagsCategories from '../Components/Questions/TagsCategories';
import { getAuthUserInPublic } from '../Actions/publicUserAction';
import { io } from 'socket.io-client';
import { getSocket } from '../SocketClient';
import { API, ENDPOINT } from '../config';
import { notificationBarUpdateAction } from '../Actions/NotificationAction';
import { answerNotificationAction } from '../Actions/NotificationAction';
import { Platform } from 'react-native';
let socket = null;

const PopularRoute = () => (
  <>
    <PopularQuestion/>
  </>
);

const FollowersFollowingRoute = () => (
  <>
    <FollowersFollowing/>
  </>
);

const TagsCategoriesRoute = () => (
  <>
    <TagsCategories/>
  </>
);

const renderScene = SceneMap({
  popular: PopularRoute,
  followersFollowing: FollowersFollowingRoute,
  tagsCategories: TagsCategoriesRoute,
});

const initialLayout = { width: Dimensions.get('window').width };


const Home = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState(0);
  const [limit, setLimit] = useState(2);
  const [skip, setSkip] = useState(0);
  const {token, auth, user, loading: userLoading} = useSelector((state) => state.user);
  const {
    message, 
    question: selectedQuestion, 
    answers: selectedAnswers, 
    newQuestion, 
    questionId, 
    deleteQuestionId, 
    deleteAnswerId,
    updatedQuestion,
    questionMessage,
    answerMessage,
  } = useSelector((state) => state.questionAnswer);
  // const [questions, setQuestions] = useState([]);
  const [addAnswerOpen, setAddAnswerOpen] = useState(false);
  const [addQuestionObj, setAddQuestionObj] = useState({});
  const [showFullAnswer, setShowFullAnswer] = useState(-1);
  // question skip and limit
  const [mainQuestions, setMainQuestions] = useState([]);
  const [loadMoreQuestions, setLoadMoreQuestions] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const getauthUserHandler = async () => {
    await dispatch(getAuthUserInPublic());
  }

  // send notification on new question
  const newQuestionNotification = async (question) => {
    // notification create question
        let notifier = {
            userName: auth.name,
            sender: auth,
            authId: auth._id,
            questionId: question.postedBy._id,
            targetType: 'Question',
            targetId: question && question._id,
            link: question && question.slug,
        }
        let followers = auth?.followers;
        let followings = auth?.following;
        let notifyArray = [...followers, ...followings];
        let arrayToString = notifyArray.map(objId => objId.toString()); 
        let followersChannel = [...new Set(arrayToString)];
        let notification = `${notifier.userName} have a new question ${question.title.substring(0, 50)} from ${auth.name}`;
        await socket.emit('send question notification', auth._id, notifier, notification, followersChannel);
        await dispatch(answerNotificationAction(notifier, notification, followersChannel));
      // notification create question
  }
  // send notification on new question

  useEffect(() => {
    if(newQuestion !== null){
      newQuestionNotification(newQuestion);
    }
  }, [newQuestion]);


  useEffect(() => {
    getauthUserHandler();
  }, [dispatch]);
  // question skip and limit
  // questions choosing
  const [value, setValue] = useState(0);
  const [routes] = useState([
    { key: 'popular', title: 'Popular' },
    { key: 'followersFollowing', title: 'Followers/Following' },
    { key: 'tagsCategories', title: 'Tags/Cats' },
  ]);

  useEffect(() => {
      socket = getSocket();
      // if(auth && auth.name !== undefined && !socketConnected){
      //   setSocketConnected(true);
      //   console.log(auth?.name);
      //   socket.emit("setup", auth && auth);
      // }
      // socket.on('connected', () => {
      //   console.log('auth user connected and joined socket io');
      // });
      // socket.on('liked post', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     targetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //     _id: notifier.targetId,
      //   }
      //   console.log('post liked');
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // // liked comment of answer
      // socket.on('liked comment post', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     targetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      
      // // liked comment of answer
      // // comment answer
      // socket.on('comment answer', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     targetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // // comment answer
      // // reply on comment answer
      // socket.on('reply on comment answer', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     targetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // // reply on comment answer
      // // answer question notification
      // socket.on('receive answer notification', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     targetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // // answer question notification 
      // // receive question notification
      // socket.on('receive question notification', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     targetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // // receive question notification
      // // <<--BLOG NOTIFICATION-->>
      // socket.on('new blog notification', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     blogTargetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // socket.on('liked blog', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     blogTargetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // socket.on('liked comment on blog', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     blogTargetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // socket.on('comment on blog', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     blogTargetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //     // link: notifier.link,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // socket.on('reply comment on blog', (notifier, notification) => {
      //   let notificationObj = {
      //     title: notification,
      //     blogTargetType: notifier.targetType,
      //     targetId: notifier.targetId,
      //     sender: notifier.sender,
      //   }
      //   dispatch(notificationBarUpdateAction(notificationObj));
      // });
      // <<--BLOG NOTIFICATION-->>
    }, [auth?.name]);

  return (
    <SafeAreaView style={styles.container}>
        <View
            // showsVerticalScrollIndicator={false}
            // contentContainerStyle={styles.scrollViewContent}
            style = {styles.scrollViewContent}
        >
          <Ask auth={''}/>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'black' }}
                style={styles.tabBar}
                labelStyle={styles.tabLabel}
                activeColor="#333"  
                inactiveColor="gray" 
              />
            )}
          />
          
        </View>
        <View style = {styles.footer}>
              <FooterTabs />
          </View>
  </SafeAreaView>
  )
}

export default Home


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
  },
  questionContainer: {
    marginBottom: 20,
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      backgroundColor: 'white',
    },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    color: 'black',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabLabelActive: {
    color: '#333',
  },
  tabLabelInactive: {
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
  },

  footer: {
      backgroundColor: '#333',
        justifyContent: 'flex-end',
    },  
});
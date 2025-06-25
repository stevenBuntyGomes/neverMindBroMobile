import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import SubmitButton from '../../Components/auth/SubmitButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FooterTabs from '../../Components/nav/FooterTabs';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Button } from 'react-native-paper';
import Ask from '../../Components/Ask/Ask';
import PopularBlogs from '../../Components/Blogs/PopularBlogs';
import FollowUnfollowBlogs from '../../Components/Blogs/FollowUnfollowBlogs';
import TagsCatBlogs from '../../Components/Blogs/TagsCatBlogs';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import { nullifyBlog } from '../../Reducers/blogReducer';

const PopularRoute = () => (
  <>
    <PopularBlogs/>
  </>
);

const FollowersFollowingRoute = () => (
  <>
    <FollowUnfollowBlogs/>
  </>
);

const TagsCategoriesRoute = () => (
  <>
    <TagsCatBlogs/>
  </>
);


const renderScene = SceneMap({
  popular: PopularRoute,
  followersFollowing: FollowersFollowingRoute,
  tagsCategories: TagsCategoriesRoute,
});

const initialLayout = { width: Dimensions.get('window').width };


const Blogs = () => {
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0);
    const [size, setSize] = useState(0);
    const [limit, setLimit] = useState(2);
    const [skip, setSkip] = useState(0);
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
      await dispatch(nullifyBlog());
    }

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
  return (
    <SafeAreaView style={styles.container}>
        <View
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

export default Blogs

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
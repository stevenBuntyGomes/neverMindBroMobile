import React, {useState, useEffect, useRef} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import SubmitButton from '../../Components/auth/SubmitButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FooterTabs from '../../Components/nav/FooterTabs';
import { searchBlogsAll, emptySearchBlog } from '../../Actions/blogAction';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { API } from '../../config';
import axios from 'axios';
import User from '../../Components/User/User';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const questionsScrollViewRef = useRef(null);
  const blogsScrollViewRef = useRef(null);
  const peopleScrollViewRef = useRef(null);
  const [routes] = useState([
    { key: 'questions', title: 'Q/A' },
    { key: 'blogs', title: 'Blogs' },
    { key: 'people', title: 'People' },
  ]);
  const {
    searchBlog,
    loading,
    message,
    searchUser,
    searchQuestions,
    questionSize,
    blogSize,
    userSize,
    } = useSelector((state) => state.blog);
  const [ search, setSearch ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ loadMoreQuestions, setLoadMoreQuestions ] = useState([]);
  const [ loadMoreBlogs, setLoadMoreBlogs ] = useState([]);
  const [ loadMoreUsers, setLoadMoreUsers ] = useState([]);
  const [questionsSize, setQuestionsSize] = useState();
  const [blogsSize, setBlogsSize] = useState();
  const [usersSize, setUsersSize] = useState();
  const [ value, setValue ] = useState(0);
  const [searchLimit, setSearchLimit] = useState(3);
  // question skip and limit
  const [questionLimit, setQuestionLimit] = useState(3);
  const [questionSkip, setQuestionSkip] = useState(0);
  // question skip and limit
  // blog skip and limit
  const [blogLimit, setBlogLimit] = useState(3);
  const [blogSkip, setBlogSkip] = useState(0);
  // blog skip and limit
  // users skip and limits
  const [userLimit, setUserLimit] = useState(3);
  const [userSkip, setUserSkip] = useState(0);
  // users skip and limits

    const searchSubmit = async (search) => {
        if (search !== '') {
            await dispatch(searchBlogsAll({search}));
        }
    }

    const emptySearchBlogHandler = async () => {
        await dispatch(emptySearchBlog());
    }

    const loadMoreQuestionsButton = async () => {
        let toSkip = questionSkip + questionLimit;
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {
            data,
            status
        } = await axios.post(`${API}/question/get-question-search`, {
            skip: toSkip,
            limit: questionLimit,
            search,
        }, config);
        setLoadMoreQuestions([...loadMoreQuestions, ...data.questions]);
        setQuestionSkip(toSkip);
        setQuestionsSize(data.size);
        setTimeout(() => {
          questionsScrollViewRef.current.scrollToEnd({ animated: true });
        }, 100); // Added delay to ensure items are rendered before scrolling

    }
    // load more questions
    // load more blogs button
    const loadMoreBlogsButton = async () => {
        let toSkip = blogSkip + blogLimit;
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {
            data,
            status
        } = await axios.post(`${API}/blog/get-blogs-search`, {
            skip: toSkip,
            limit: blogLimit,
            search,
        }, config);
        setLoadMoreBlogs([...loadMoreBlogs, ...data.blogs]);
        setBlogSkip(toSkip);
        setBlogsSize(data.size);
        setTimeout(() => {
          blogsScrollViewRef.current.scrollToEnd({ animated: true });
        }, 100); // Added delay to ensure items are rendered before scrolling
    }
    // load more blogs button
    // load more users button
    const loadMoreUsersButton = async () => {
        let toSkip = userSkip + userLimit;
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {
            data,
            status
        } = await axios.post(`${API}/auth/get-users-search`, {
            skip: toSkip,
            limit: userLimit,
            search,
        }, config);
        setLoadMoreUsers([...loadMoreUsers, ...data.users]);
        setUserSkip(toSkip);
        setUsersSize(data.size);
        setTimeout(() => {
          peopleScrollViewRef.current.scrollToEnd({ animated: true });
        }, 100); // Added delay to ensure items are rendered before scrolling

    }

    // useEffect(() => {
    //     setSearchResults([...searchBlog, ...searchUser, ...searchQuestions]);
    // }, [searchBlog, searchUser, searchQuestions]);

        useEffect(() => {
        if (search !== '') {
            searchSubmit(search);
        } else {
            emptySearchBlogHandler();
            setLoadMoreQuestions([]);
        }
        setQuestionsSize(questionSize);
        setBlogsSize(blogSize);
        setUsersSize(userSize);
    }, [dispatch, search]);

      const QuestionsRoute = () => (
    <ScrollView 
      ref={questionsScrollViewRef}
      contentContainerStyle={styles.scene}>
      {searchQuestions && searchQuestions.map((question, i) => (
        <TouchableOpacity onPress={() => navigation?.navigate('SingleQuestion', { questionSlug: question.slug })} key={i} style={styles.resultItem}>
          <Text>{question.title}</Text>
        </TouchableOpacity>
      ))}
      {loadMoreQuestions && loadMoreQuestions.map((question, i) => (
        <TouchableOpacity key={i} style={styles.resultItem}>
          <Text>{question.title}</Text>
        </TouchableOpacity>
      ))}
      {searchQuestions && searchQuestions.length > 2 && (
        <>
          {
            questionsSize > 0 && questionSize >= searchLimit && (
              <TouchableOpacity style={styles.button} onPress={loadMoreQuestionsButton}>
                  <Text style={styles.buttonText}>Load More</Text>
              </TouchableOpacity>
            )
          }
        </>
      )}
    </ScrollView>
  );

  const BlogsRoute = () => (
    <ScrollView 
      ref={blogsScrollViewRef}
      contentContainerStyle={styles.scene}>
      {searchBlog && searchBlog.map((b, i) => (
        <TouchableOpacity key={i} style={styles.resultItem}>
          <Text>{b.title}</Text>
        </TouchableOpacity>
      ))}
      {loadMoreBlogs && loadMoreBlogs.map((blog, i) => (
        <TouchableOpacity key={i} style={styles.resultItem}>
          <Text>{blog.title}</Text>
        </TouchableOpacity>
      ))}
      {searchBlog && searchBlog.length > 2 && (
        <>
          {
            blogsSize > 0 && blogsSize >= searchLimit && (
              <TouchableOpacity style={styles.button} onPress={loadMoreBlogsButton}>
                  <Text style={styles.buttonText}>Load More</Text>
              </TouchableOpacity>
            )
          }
        </>
      )}
    </ScrollView>
  );

  const PeopleRoute = () => (
    <ScrollView 
      ref={peopleScrollViewRef}
      contentContainerStyle={styles.scene}>
      {searchUser && searchUser.map((user, index) => (
        <User key={index} userId={user._id} name={user.name} photo={user.photo?.url} username={user.username} />
      ))}
      {loadMoreUsers && loadMoreUsers.map((user, index) => (
        <User key={index} userId={user._id} name={user.name} photo={user.photo?.url} username={user.username} />
      ))}
      {searchUser && searchUser.length > 2 && (
        <>
          {
            usersSize > 0 && usersSize >= searchLimit && (
              <TouchableOpacity style={styles.button} onPress={loadMoreUsersButton}>
                  <Text style={styles.buttonText}>Load More</Text>
              </TouchableOpacity>
            )
          }
        </>
      )}
    </ScrollView>
  );

  const renderScene = SceneMap({
    questions: QuestionsRoute,
    blogs: BlogsRoute,
    people: PeopleRoute,
  });



  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
        >
            <TextInput
              style={styles.searchInput}
              placeholder="Search for anything"
              value={search}
              onChangeText={setSearch}
          />
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: styles.container.width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={styles.indicator}
                style={styles.tabContainer}
                labelStyle={styles.label}
              />
            )}
          />
        </ScrollView>
        <View style = {styles.footer}>
            <FooterTabs />
        </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    scrollViewContent: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
    },
    
    searchInput: {
      backgroundColor: '#eee',
        borderRadius: 5,
        padding: 15,
        marginTop: 8,
        marginBottom: 8,
        width: '100%',
    },
    backgroundColor: '#eee',
        borderRadius: 5,
        padding: 12,
        margin: 8,
        width: '100%',
    searchButton: {
        backgroundColor: '#333',
        padding: 10,
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    footer: {
        justifyContent: 'flex-end',
        backgroundColor: '#333',
        color: 'white',
    },
    tabContainer: {
      backgroundColor: '#333',
      color: 'white',
      marginTop: 25,
      borderRadius: 5
    },
    indicator: {
      color: '#ccc'
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#333',
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

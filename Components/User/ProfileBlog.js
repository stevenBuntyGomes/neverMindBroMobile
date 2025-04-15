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
import BlogCard from '../Blogs/BlogCard';
import Toast from 'react-native-toast-message';
import { getProfileBlogsAction } from '../../Actions/blogAction';

const ProfileBlog = ({username = null}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {auth, user, loading: userLoading} = useSelector((state) => state.user);
    const {blogs, loading, blog: selectedBlog, size: blogSize} = useSelector((state) => state.blog);
    const [size, setSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(2);
    const [loadedBlogs, setLoadedBlogs] = useState([]);
    const [loadingMoreBlogs, setLoadingMoreBlogs] = useState(false);

    const getProfileBlogHandler = async () => {
      await dispatch(getProfileBlogsAction(username, skip, limit));
    }

    const handleScroll = async ({ layoutMeasurement, contentOffset, contentSize }) => {
      const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 800; // Increased threshold
      if (isCloseToBottom && !loadingMoreBlogs && size >= limit) {
        await loadMoreBlogsButtonHandler();
      }
    };

    useEffect(() => {
      getProfileBlogHandler();
      setLoadedBlogs([...blogs]);
      setSize(blogSize);
    }, [dispatch, blogSize, username]);

    const loadMoreBlogsButtonHandler = async () => {
        if (loadingMoreBlogs) return;
        setLoadingMoreBlogs(true);
        let toSkip = skip + limit;
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`${API}/blog/get/blogs/profile`, {username, toSkip, limit}, config);
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSkip(toSkip);
        setSize(data.size);
        setLoadingMoreBlogs(false);
    }

    const loadMoreButton = () => {
        return (
        <>
            {size > 0 && size >= limit && (
            <TouchableOpacity style={styles.buttonBorderless} onPress={loadMoreBlogsButtonHandler}>
                <Text style={styles.buttonText}>Load More</Text>
            </TouchableOpacity>
            )}
        </>
        );
    };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
      >
        {loadedBlogs && loadedBlogs.map((blog, i) => (
          <BlogCard
              key = {i} 
              blog = {blog && blog} 
              categories = {blog.categories && blog.categories}
              tags = {blog.tags && blog.tags}
          />
        ))}
        {loadingMoreBlogs && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileBlog


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
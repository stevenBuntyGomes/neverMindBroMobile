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
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../config';
import User from '../../Components/User/User';
import { getAuthUserInPublic, publicUserForFollow } from '../../Actions/publicUserAction';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { useCookies } from 'react-cookie';
import RenderHtml from 'react-native-render-html';
import FooterTabs from '../../Components/nav/FooterTabs';
import { readSingleBlog } from '../../Actions/blogAction';
import RenderHTML from 'react-native-render-html';
import BlogReaction from '../../Components/Blogs/BlogReaction';

const SingleBlog = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { blogSlug } = route.params;
  const {
    token, 
    auth,
    user,
    loading: userLoading
  } = useSelector((state) => state.user);
  const {
    blogs, 
    loading, 
    blog: selectedBlog,
    updateBlogMessage,
  } = useSelector((state) => state.blog);
  const contentWidth = Dimensions.get('window').width;
  const getToken = async () => {
  const authToken = await AsyncStorage.getItem('@token');
    // dispatch(setTokenApp(authToken));
  }

  const getauthUserHandler = async () => {
    await dispatch(getAuthUserInPublic());
  }

  useEffect(() => {
    getauthUserHandler();
    if (blogSlug) {
      dispatch(readSingleBlog(blogSlug));
    }
  }, [dispatch, blogSlug]);

    const showBlogCategories = () => {
        return (
            <View style={styles.categoryContainer}>
                <Text style={styles.subTitle}>Categories</Text>
                {selectedBlog && selectedBlog?.categories?.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('CategoryScreen', { slug: category.slug })}
                        style={styles.categoryButton}
                    >
                        <Text style={styles.buttonText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };


    const showBlogTags = () => {
        return (
            <View style={styles.tagContainer}>
                <Text style={styles.subTitle}>Tags</Text>
                {selectedBlog && selectedBlog.tags?.map((tag, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('TagScreen', { slug: tag.slug })}
                        style={styles.tagButton}
                    >
                        <Text style={styles.buttonTextTags}>{tag.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };



  return (
     <SafeAreaView style={styles.container}>
      <Toast/>
      <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
            <TouchableOpacity>
                <Text style={styles.title}>{selectedBlog && selectedBlog.title}</Text>
            </TouchableOpacity>
            {/* {auth && auth._id === blog?.postedBy?._id ? (
                <InfoBlogs blog={blog} />
            ) : null} */}
        </View>
        <User
          userId={selectedBlog && selectedBlog?.postedBy?._id}
          name={selectedBlog && selectedBlog?.postedBy?.name}
          photo={selectedBlog && selectedBlog?.postedBy?.photo?.url}
          username={selectedBlog && selectedBlog?.postedBy?.username}
          createdAt={selectedBlog && selectedBlog?.createdAt}
        />
        <View style={styles.row}>
            {/* {showBlogCategories()} */}
            {showBlogTags()}
        </View>
        <View style={styles.row}>
          {selectedBlog?.photo && (
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: selectedBlog?.photo?.url }}
                    alt={selectedBlog?.title}
                />
            </View>
          )}
          
          <View style={styles.excerptContainer}>
              <RenderHTML contentWidth={contentWidth} source={{ html: selectedBlog?.body }} baseStyle={{ fontSize: 18 }}/>
          </View>
        </View>
        <BlogReaction blog = {selectedBlog && selectedBlog} auth = {auth}/>
      </ScrollView>
      <View style = {styles.footer}>
          <FooterTabs />
      </View>
     </SafeAreaView>
  )
}

export default SingleBlog


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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    tagButton: {
        borderColor: '#007bff',
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    tagContainer: {
        flex: 1,
        marginLeft: 8,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
    },
    buttonTextTags: {
        color: '#333',
        textAlign: 'center',
    },
    row: {
        // flexDirection: 'row',
        marginBottom: 16,
    },
    imageContainer: {
        flex: 1,
        marginRight: 8,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
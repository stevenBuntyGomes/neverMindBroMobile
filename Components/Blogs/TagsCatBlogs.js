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
import BlogCard from './BlogCard';
import { blogListWithCategoryTags } from '../../Actions/blogAction';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getTags } from '../../Actions/tagAction';

const TagsCatBlogs = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const contentWidth = Dimensions.get('window').width;
    const {blogsCatTags: blogs, tagsSize: blogSize} = useSelector((state) => state.blog);
    const { tags } = useSelector((state) => state.tag);
    const {token, auth, user, loading: userLoading} = useSelector((state) => state.user);
    const [limit, setLimit] = useState(2);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(blogSize);
    const [loadedBlogs, setLoadedBlogs] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [value, setValue] = useState(0);
    const [loadingMoreBlogs, setLoadingMoreBlogs] = useState(false);

    const getToken = async () => {
      const authToken = await AsyncStorage.getItem('@token');
      dispatch(setTokenApp(authToken));
    }

    const handleScroll = async ({ layoutMeasurement, contentOffset, contentSize }) => {
      const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 800; // Increased threshold
      if (isCloseToBottom && !loadingMoreBlogs && size >= limit) {
        await loadMoreBlogs();
      }
    };

    const getBlogsTagsrHandler = async () => {
        dispatch(blogListWithCategoryTags(skip, limit, selectedCategories, selectedTags));
        setLoadedBlogs([...blogs]);
        setSize(blogSize);
    }

      const loadMoreBlogs = async () => {
        if (loadingMoreBlogs) return;
        setLoadingMoreBlogs(true);
        let toSkip = skip + limit;
        console.log(toSkip);
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data} = await axios.post(`${API}/blog/blogs-categories-tags`, {skip: toSkip, limit, selectedCategories, selectedTags, token}, config);
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSkip(toSkip);
        setSize(data.size);
        setLoadingMoreBlogs(false);
        // /
      }


    const loadMoreBlogsButton = () => {
        return (
        <>
            {size > 0 && size >= limit && (
            <TouchableOpacity style={styles.buttonBorderless} onPress={loadMoreBlogs}>
                <Text style={styles.buttonText}>Load More</Text>
            </TouchableOpacity>
            )}
        </>
        );
    };

    useEffect(() => {
      getToken();
      dispatch(getTags());
    }, [dispatch]);


    useEffect(() => {
      getBlogsTagsrHandler();
      setLoadedBlogs([...blogs]);
      setSize(blogSize);
    }, [selectedTags, blogSize]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
        >
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tags</Text>
            <Animatable.View animation="fadeInUp" duration={1000} style={styles.container}>
                {tags && (
                  <SectionedMultiSelect
                    items={tags.map((tag) => ({
                      name: tag.name,
                      id: tag._id,
                    }))}
                    uniqueKey="id"
                    selectText="Select Tags"
                    onSelectedItemsChange={(selectedItems) => setSelectedTags(selectedItems)}
                    selectedItems={selectedTags}
                    showDropDowns={true}
                    readOnlyHeadings={false}
                    IconRenderer={Icon} // Adding the IconRenderer prop
                    styles={multiSelectStyles}
                  />
                )}
              </Animatable.View>
          </View>
          <View style={styles.questionContainer}>
              {loadedBlogs && loadedBlogs.map((blog, index) => (
                  <View key = {index}>
                      <BlogCard 
                          key = {index} 
                          blog = {blog && blog} 
                          categories = {blog && blog.categories}
                          tags = {blog && blog.tags}
                      />
                      {/* <Text>{blog?.title}</Text> */}
                  </View>
              ))}
              {loadingMoreBlogs && (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                )}
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default TagsCatBlogs

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

    formGroup: {
      marginBottom: 20,
    },
});

const multiSelectStyles = {
  selectToggle: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  chipsWrapper: {
    marginTop: 10,
  },
  chipContainer: {
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
};

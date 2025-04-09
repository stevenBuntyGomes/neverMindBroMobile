import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TextInput,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { createBlogPublicUser, createBlog } from '../../Actions/blogAction';
import { getTags } from '../../Actions/tagAction';
import { getCategory } from '../../Actions/categoryAction';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { blogLikeNotificationAction } from '../../Actions/NotificationAction';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ENDPOINT } from '../../config';
import { io } from 'socket.io-client';
// import RenderHtml from 'react-native-render-html';
import { filterFunction } from '../../Components/Filters/filter';

let socket;

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor, fontWeight: 'bold' }}>H2</Text>;
const handleHead3 = ({ tintColor }) => <Text style={{ color: tintColor, fontWeight: 'bold' }}>H3</Text>;
const handleHead4 = ({ tintColor }) => <Text style={{ color: tintColor, fontWeight: 'bold' }}>H4</Text>;
const handleHead5 = ({ tintColor }) => <Text style={{ color: tintColor, fontWeight: 'bold' }}>H5</Text>;

const BlogCreate = () => {
    const richText = useRef(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [body, setBody] = useState(''); // Default to an empty string
    const [outputText, setOutputText] = useState('');
    const contentWidth = Dimensions.get('window').width;
    const [title, setTitle] = useState('');
    const {categories} = useSelector((state) => state.category); 
    const {tags} = useSelector((state) => state.tag);
    const [selectedCategories, setSelectedCategories] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const {blog, newBlog, message, error, loading} = useSelector((state) => state.blog);
    const {token, auth, user, loading: userLoading} = useSelector((state) => state.user);
    const [images, setImages] = useState([]);
    const [featureImage, setFeatureImage] = useState('');
    const [imagesPreview, setImagesPreview] = useState([]);

    const handleBodyChange = (content) => {
        // if (typeof content === 'string') {
        //     setBody(content);
        //     // AsyncStorage.setItem('blog', content);
        // } else {
        //     console.error('Invalid content type for RichEditor:', typeof content);
        // }
    };




    const categoryDispatchHandler = async () => {
        await dispatch(getCategory());
    }

    const tagDispatchHandler = async () => {
        await dispatch(getTags());
    }

    const getauthUserHandler = async () => {
        await dispatch(getAuthUserInPublic());
    }

    const newBlogNotificationHandler = async (newBlog) => {
      let notifier = {
          userName: auth.name,
          sender: auth,
          authId: auth._id,
          questionId: newBlog && newBlog?.postedBy?._id,
          blogTargetType: 'Blog',
          targetId: newBlog && newBlog?._id,
          link: newBlog && newBlog?.slug,
      }
      let followers = auth?.followers;
      let followings = auth?.followings;
      let followersChannel =  [...new Set([...followers, followings])];
      let notification = `${notifier.userName} have a new Blog ${newBlog && newBlog?.title?.substring(0, 50)} from ${auth.name}`;
      await socket.emit('send blog notification', auth._id, notifier, notification, followersChannel);
      await dispatch(blogLikeNotificationAction(notifier, notification, followersChannel));
  }

    useEffect(() => {
      socket = io(ENDPOINT, {
        transports: ['websocket'], // Use websocket for better performance in React Native
      });
      categoryDispatchHandler();
      tagDispatchHandler();
      getauthUserHandler();
      // initCategories();
      // initTags();
    }, [dispatch]);


    useEffect(() => {
      if(newBlog){
        console.log(auth.name);
        newBlogNotificationHandler();
        navigation?.navigate('SingleBlog', { blogSlug: newBlog?.slug });
      }
    }, [newBlog]);

      useEffect(() => {
        const result = filterFunction(body, selectedCategories);
        console.log(result);
        setOutputText(result);
      }, [selectedCategories]);


    const publishBlog = async (e) => {
        e.preventDefault();
        // 
        if(!title || !body || selectedTags.length == 0 || selectedCategories){
          Toast.show({
              type: 'error',
              text1: 'All the input fields must be filled.',
          });
        }else{
            // formData.set('body', body);
            // console.log('ready to publishBlog');
            if(auth && auth.role == 1){
                selectedCategories, selectedTags
                await dispatch(createBlog(title, outputText, selectedCategories, selectedTags, featureImage, images));
            }else if(auth && auth.role == 0){
                // await dispatch(createBlogPublicUser(formData));
                await dispatch(createBlogPublicUser(title, outputText, selectedCategories, selectedTags, featureImage, images));
            }
            setBody('');
            setTitle('');
            setSelectedCategories('');
            setSelectedTags([]);
            // setMsgType(1);
            // toast.success('new blow has been created!');
            // newBlogNotification();
        }
        
    };

  const createBlogForm = () => {
    return (
      <>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Create Blog</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Body</Text>
          <TextInput
              style={styles.input}
              placeholder="Write something amazing..."
              value={body}
              onChangeText={setBody}
              multiline={true}
              numberOfLines={6}
            />
        </View>
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
          <View style={styles.formGroup}>
            <Text style={styles.label}>choose a category</Text>
            <Animatable.View animation="fadeInUp" duration={1000} style={styles.container}>
              {categories && (
                <SectionedMultiSelect
                  items={categories.map((category) => ({
                    name: category.name,
                    id: category.name,
                  }))}
                  uniqueKey="id"
                  selectText="Select Tag"
                  single={true} // Ensures only one item can be selected
                  onSelectedItemsChange={(selectedItems) => {
                    // Store only the first selected item as a string
                    if (selectedItems.length > 0) {
                      setSelectedCategories(selectedItems[0]);
                    } else {
                      setSelectedCategories(''); // Clear the selection if no item is selected
                    }
                  }}
                  selectedItems={selectedCategories ? [selectedCategories] : []} // Wrap in array for compatibility
                  showDropDowns={true}
                  readOnlyHeadings={false}
                  IconRenderer={Icon}
                  styles={multiSelectStyles}
                />
              )}
            </Animatable.View>
          </View>

        <TouchableOpacity style={styles.button} onPress={publishBlog}>
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
        <Text style={styles.label}>The output will look like this</Text>
        {/* <RenderHtml
            contentWidth={contentWidth}
            baseStyle={{ fontSize: 18 }}
            source={{ html: outputText }}
            // source={{ html: `${answer.body.slice(0, 230)}...` }}
          /> */}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {createBlogForm()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BlogCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  editor: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 400, // Fixed height for RichEditor
    maxHeight: 400, // Maximum height to allow scrolling within the editor
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#333',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    width: '45%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  input: {
      backgroundColor: '#eee',
      borderRadius: 5,
      padding: 12,
      margin: 8,
      width: '100%',
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
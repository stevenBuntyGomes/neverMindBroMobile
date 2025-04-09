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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { updateBlog, updateBlogPublicUser } from '../../Actions/blogAction';
import { getTags } from '../../Actions/tagAction';
import { getCategory } from '../../Actions/categoryAction';
import { getAuthUserInPublic } from '../../Actions/publicUserAction';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import FooterTabs from '../../Components/nav/FooterTabs';

const handleHead = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H2</Text>
const handleHead3 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H3</Text>
const handleHead4 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H4</Text>
const handleHead5 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H5</Text>
const handleHead6 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H6</Text>


const BlogUpdate = ({ route = null }) => {
    const richText = useRef();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const {categories} = useSelector((state) => state.category); 
    const {tags} = useSelector((state) => state.tag);
    const {
      blogUpdate,
      blogId,
      blogRole
    } = route.params;
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const {blog, newBlog, message, error, loading, updatedBlog} = useSelector((state) => state.blog);
    const {token, auth, user, loading: userLoading} = useSelector((state) => state.user);
    const [images, setImages] = useState([]);
    const [featureImage, setFeatureImage] = useState('');
    const [imagesPreview, setImagesPreview] = useState([]);
    const [closeFeatureImage, setCloseFeatureImage] = useState(false);
    const [closeImages, setCloseImages] = useState(false);
  const handleBodyChange = (content) => {
    setBody(content);
    AsyncStorage.setItem('blog', content);
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


    useEffect(() => {
      categoryDispatchHandler();
      tagDispatchHandler();
      getauthUserHandler();
    }, [dispatch]);

    useEffect(() => {
      if(blogUpdate){
        setTitle(blogUpdate?.title);
        setBody(blogUpdate?.body);
        setSelectedCategories(blogUpdate?.categories?.map(category => category._id) || []);
        setSelectedTags(blogUpdate?.tags?.map(tag => tag._id) || []);
      }
    }, [blogUpdate]);

    useEffect(() => {
      if(updatedBlog){
        navigation?.navigate('SingleBlog', { blogSlug: updatedBlog?.slug });
      }
    }, [updatedBlog]);
    const publishBlog = async (e) => {
        e.preventDefault();
        // 
        if(!title || !body || selectedTags.length == 0 || selectedCategories.length == 0){
          // setMsgType(2);
          // setShowMsg('all the fields are required');
          Toast.show({
              type: 'error',
              text1: 'All the input fields must be filled.',
          });
        }else{
            // formData.set('body', body);
            // console.log('ready to publishBlog');
            if(auth && auth.role == 1){
                console.log('auth is 1');
                await dispatch(updateBlog(title, body, selectedCategories, selectedTags, featureImage, images, closeFeatureImage, closeImages, blogUpdate.slug, auth?.role));
            }else if(auth && auth.role == 0){
                // await dispatch(createBlogPublicUser(formData));
                console.log('auth is 0');
                await dispatch(updateBlogPublicUser(title, body, selectedCategories, selectedTags, featureImage, images, blogUpdate.slug));
            }
            setBody('');
            setTitle('');
            setSelectedCategories([]);
            setSelectedTags([]);
            // setMsgType(1);
            // toast.success('new blow has been created!');
            // newBlogNotification();
        }
        
    };

    useEffect(() => {
      // console.log('auth role => ', auth?.role);
    }, [auth]);

  const updateBlogForm = () => {
    return (
      <>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Update Blog</Text>
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
          <RichEditor
            ref={richText}
            onChange={handleBodyChange}
            style={styles.editor}
            placeholder="Write something amazing..."
            initialContentHTML={body}
            scrollEnabled={true} // Ensure scroll is enabled for RichEditor
          />
          <RichToolbar
            editor={richText}
            actions={[
              actions.heading2,
              actions.heading3,
              actions.heading4,
              actions.heading5,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
            ]}
            iconTint="black"
            selectedIconTint="blue"
            disabledIconTint="gray"
            iconMap={{
              [actions.heading2]: handleHead,
              [actions.heading3]: handleHead3,
              [actions.heading4]: handleHead4,
              [actions.heading5]: handleHead5,
            }}
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
              <Text style={styles.label}>Categories</Text>
              <Animatable.View animation="fadeInUp" duration={1000} style={styles.container}>
                {categories && (
                  <SectionedMultiSelect
                    items={categories.map((category) => ({
                      name: category.name,
                      id: category._id,
                    }))}
                    uniqueKey="id"
                    selectText="Select Tags"
                    onSelectedItemsChange={(selectedItems) => setSelectedCategories(selectedItems)}
                    selectedItems={selectedCategories}
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
          {updateBlogForm()}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style = {styles.footer}>
          <FooterTabs />
      </View>
    </SafeAreaView>
  );
}

export default BlogUpdate



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // containerKey: {
    
  // },
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
  footer: {
    backgroundColor: '#333',
    justifyContent: 'flex-end',
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
import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Text,
  IconButton,
} from 'react-native-paper';
import { TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../Actions/userAction';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { answerToQuestionAction } from '../../Actions/questionAnswerAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID, ENDPOINT } from '../../config';
// import { io } from 'socket.io-client';
import { answerNotificationAction } from '../../Actions/NotificationAction';
import { ScrollView, View, StyleSheet, Modal, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { createQuestion } from '../../Actions/questionAnswerAction';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library
import * as Animatable from 'react-native-animatable';
import { getTags } from '../../Actions/tagAction';
import { getCategory } from '../../Actions/categoryAction';
import { filterFunction } from '../Filters/filter';
import {io} from 'socket.io-client'
let socket;

const handleHead = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H2</Text>
const handleHead3 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H3</Text>
const handleHead4 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H4</Text>
const handleHead5 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H5</Text>
const handleHead6 = ({tintColor}) => <Text style={{color: tintColor, fontWeight: 'bold'}}>H6</Text>

const QuestionDialog = ({
    open,
    onClose,
}) => {
  const richText = useRef();
  const dispatch = useDispatch();
  const [showMsg, setShowMsg] = useState('');
  const [msgType, setMsgType] = useState(0);
  const [question, setQuestion] = useState('');
  const [outputText, setOutputText] = useState('');
  const {categories} = useSelector((state) => state.category); 
  const {tags} = useSelector((state) => state.tag);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [images, setImages] = useState([]);
  const handleBodyChange = (content) => {
    setQuestion(content);
  };

  const publishQuestion = async () => {
    if(!outputText || !selectedCategories || !selectedTags){
      console.log("all the fields are required");
    }else{
      await dispatch(createQuestion(outputText, selectedCategories, selectedTags));
      setQuestion('');
      setSelectedCategories([]);
      setSelectedTags([]);
      onClose();
    }
  }

  useEffect(() => {
    const result = filterFunction(question, selectedCategories);
    // console.log(result);
    setOutputText(result);
  }, [selectedCategories, question]);
  
  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'], // Use websocket for better performance in React Native
    });
  }, []);


    useEffect(() => {
      // getToken();
      dispatch(getTags());
      dispatch(getCategory());
    }, [dispatch]);
  const createAnswerForm = () => {
    return (
      <>
        <ScrollView>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Create Question</Text>
          </View>

          <View style={styles.formGroup}>
            {/* <RichEditor
              ref={richText}
              onChange={handleBodyChange}
              style={styles.editor}
              placeholder="Write something amazing..."
              initialContentHTML={question}
            /> */}
            {/* <RichToolbar
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
            /> */}
            <TextInput
                style={styles.input}
                placeholder="Add Question"
                value={question}
                onChangeText={setQuestion}
                multiline={true} // Allows multiple lines of text
                numberOfLines={6} // Shows 4 rows by default
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
              <Text style={styles.label}>Choose Filter</Text>
              <Animatable.View animation="fadeInUp" duration={1000} style={styles.container}>
                {categories && (
                  <SectionedMultiSelect
                    items={categories.map((category) => ({
                      name: category.name,
                      id: category._id,
                    }))}
                    uniqueKey="id"
                    selectText="Choose Filter"
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
          <TouchableOpacity style={styles.button} onPress={publishQuestion}>
              <Text style={styles.buttonText}>Publish</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={onClose}>
              <Text style={styles.buttonTextWhite}>close</Text>
          </TouchableOpacity>
          <Text style={styles.label}>The output will look like this</Text>
          <Text style={styles.buttonText}>{outputText}</Text>
        </ScrollView>
      </>
    );
  };
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.dialog}>
          {createAnswerForm()}
        </View>
      </View>
    </Modal>
  )
}

export default QuestionDialog

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editor: {
    height: 200,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#333',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonRed: {
    borderRadius: 20,
    backgroundColor: 'red',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    // width: '45%',
    marginBottom: 10,
    borderWidth: 1,  // Add this line
    borderColor: 'red',  // Add this line
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonTextWhite: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  alertContainer: {
    marginTop: 10,
  },
  alert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  alertText: {
    color: 'white',
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
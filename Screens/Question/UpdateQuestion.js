import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library
import { updateQuestionAction } from '../../Actions/questionAnswerAction';
import { getCategory } from '../../Actions/categoryAction';
import { getTags } from '../../Actions/tagAction';
import * as Animatable from 'react-native-animatable';
import { filterFunction } from '../../Components/Filters/filter';

const UpdateQuestion = ({ route = '' }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [questionId, setQuestionId] = useState(null);
  const [outputText, setOutputText] = useState('');
  const { categories } = useSelector((state) => state.category);
  const { tags } = useSelector((state) => state.tag);
  const { questionUpdate } = route.params;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (questionUpdate) {
      setQuestion(questionUpdate.title);
      setQuestionId(questionUpdate._id);
      setSelectedCategories(questionUpdate.categories || []);
      setSelectedTags(questionUpdate.tags || []);
    } 
    dispatch(getCategory());
    dispatch(getTags());
  }, [dispatch, questionUpdate]);


  useEffect(() => {
    const result = filterFunction(question, selectedCategories);
    // console.log(result);
    setOutputText(result);
  }, [selectedCategories, question]);

  const handleUpdateQuestion = () => {
    if (!outputText) {
      // Handle empty question case
    } else {
      dispatch(updateQuestionAction(questionId, outputText, selectedCategories, selectedTags));
      setQuestion('');
      setSelectedCategories([]);
      setSelectedTags([]);
      // You can add navigation pop or any success feedback here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            value={question}
            onChangeText={setQuestion}
            style={styles.input}
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categories</Text>
          <Animatable.View animation="fadeInUp" duration={1000} style={styles.container}>
            {categories && (
              <SectionedMultiSelect
                items={categories.map((category) => ({
                      name: category.name,
                      id: category.slug,
                  }))}
                uniqueKey="id"
                selectText="Select Categories"
                onSelectedItemsChange={(selectedItems) => setSelectedCategories(selectedItems)}
                selectedItems={selectedCategories}
                showDropDowns={true}
                readOnlyHeadings={false}
                IconRenderer={Icon} // Adding the IconRenderer prop
                styles={multiSelectStyles}
              />
            )}
          </Animatable.View>
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

        <TouchableOpacity style={styles.button} onPress={handleUpdateQuestion}>
          <Text style={styles.buttonText}>Update Question</Text>
        </TouchableOpacity>
        <Text style={styles.label}>The output will look like this</Text>
        <Text>{outputText}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default UpdateQuestion;
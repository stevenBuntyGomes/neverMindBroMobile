import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Button, Dialog, Portal, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';
import QuestionDialog from "./QuestionDialog";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Ask = ({ auth }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);

    const handleAddQuestionOpen = () => {
        setAddQuestionOpen(!addQuestionOpen);
    }
    
  return (
    <View style={styles.form}>
        {/* <TextInput
            style={styles.input}
            placeholder="type your question or post..."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onPress={handleAddQuestionOpen}
        /> */}
        <QuestionDialog
            open={addQuestionOpen}
            onClose={handleAddQuestionOpen}
            // onCreate={handleAddAnswerCreate}
            // message={message}
            // question={addQuestionObj}
            // auth={auth && auth}
        />
        <View style={styles.actionsContainer}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleAddQuestionOpen}>
                <FontAwesome5
                    name = "question"
                    size = {16} 
                    style = {styles.fontAwesome}
                    color = '#333'
                />
                <Text style={styles.buttonText}>Ask</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation?.navigate('BlogCreate')}>
                <FontAwesome5
                    name = "plus"
                    size = {16} 
                    style = {styles.fontAwesome}
                    color = '#333'
                />
                <Text style={styles.buttonText}>
                    Post
                </Text>
            </TouchableOpacity>
        </View>
        
    </View>
  )
}

export default Ask

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 12,
        margin: 8,
        width: '100%',
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: 'transparent',
        padding: 12,
        marginTop: 10,
        width: '45%',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#333',
        justifyContent: 'center', // Center child elements horizontally
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    fontAwesome: {
        alignSelf: 'center',
        color: '#333',
        marginRight: 5,  // Add space between icon and text
    },
});
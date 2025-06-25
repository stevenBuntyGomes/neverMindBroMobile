import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import Toast from 'react-native-toast-message';
import { signup, checkSignupCodeAction } from '../../Actions/userAction';
import { nullifyPreToken } from '../../Reducers/userReducer'; 

const ActivateAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { preToken } = route.params;
  const {
    auth, user, token: userToken, loading: userLoading,
    codeActivation, message
  } = useSelector((state) => state.user);

  const [code, setCode] = useState('');
  const [values, setValues] = useState({
    name: '',
    showButton: false,
    token: ''
  });

  const { name, token, showButton } = values;

  // Set up the code
  const handleCodeChange = (text) => {
    setCode(text);
  };

  // Handle submit
  const clickSubmit = async () => {
    await dispatch(checkSignupCodeAction(token, code));
  };

  const signUpNewAccountHandler = async () => {
    await dispatch(signup(token));
  };

  useEffect(() => {
    let token = preToken;
    if (token) {
      const { name } = jwtDecode(token);
      setValues({ ...values, name, token });
      dispatch(nullifyPreToken());
    }
  }, [dispatch, route.params]);

  useEffect(() => {
  }, [userToken, user]);

  useEffect(() => {
    if (codeActivation === 2) {
      Toast.show({
        type: 'success',
        text1: message,
      });
      signUpNewAccountHandler();
    } else if (codeActivation === 1) {
      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  }, [codeActivation, message]);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.text}>Hey {name}, Ready to activate your account?</Text>
            <TextInput
                style={styles.input}
                placeholder="6-digit code"
                value={code}
                onChangeText={handleCodeChange}
                maxLength={6}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={clickSubmit}>
                <Text style={styles.buttonText}>Never Mind Bro! Activate Account...</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 10 }}>
              Already have an account?{' '}
              <Text 
                onPress={() => navigation?.navigate('Signin')} 
                style={{ color: '#ff2222', fontWeight: 'bold' }}
              >
                Sign In
              </Text>
            </Text>

            <Toast />
        </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginVertical: 50,
    marginHorizontal: 20,
    flex: 1,
    
  },
  text:{
    marginTop: 15,
    marginBottom: 15,
    marginRight: 20,
    marginLeft: 20,
  },    
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  button: {
        
        borderRadius: 20,
        backgroundColor: '#333',
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        
    },
});

export default ActivateAccount;

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction, resetPasswordAction, resetPasswordCodeAction } from '../../Actions/userAction';
import { nullifyFpToken } from '../../Reducers/userReducer';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'

const ResetPassword = ({route = null}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { user, message, error, fpToken, codeActivation } = useSelector((state) => state.user);

  const handleResetCode = async (e) => {
    e.preventDefault();
    dispatch(resetPasswordCodeAction(fpToken, code));
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(resetPasswordAction(fpToken, newPassword));
      await dispatch(nullifyFpToken());
  }
  
    useEffect(() => {
        if(codeActivation == 2){
            Toast.show({
                type: 'success',
                text1: message,
            });
            setShowForm(true);
            // signUpNewAccountHandler();
        }else if(codeActivation == 1){
            Toast.show({
                type: 'error',
                text1: message,
            });
        }
    }, [codeActivation, message]);

  const resetCodeForm = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Provide Reset Code from Email</Text>
            <TextInput
              style={styles.input}
              placeholder="6-digit code"
              value={code}
              onChangeText={setCode}
              maxLength={6}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleResetCode}>
                <Text style={styles.buttonText}>Send Password Reset Code</Text>
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


  const resetPasswordForm = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Enter New Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Send Password Reset Code</Text>
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
  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.container}>
        
        {!showForm && resetCodeForm()}
        {showForm && resetPasswordForm()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 16,
  },
  h1: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 24,
    },
  container: {
    backgroundColor: '#ffffff',
    marginVertical: 50,
    marginHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
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

export default ResetPassword;
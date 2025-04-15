import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../../Actions/userAction';
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import Texts from '@kaloraat/react-native-text'

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(true);
  const { user, message, error, fpToken } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPasswordAction(email));
  };

  useEffect(() => {
    if (message) {
      Toast.show({
          type: 'success',
          text1: message,
      });
    }
    if (error) {
      Alert.alert("Error", error);
    }
  }, [dispatch, message, error]);

  useEffect(() => {
    if(fpToken !== null){
      // router.push(`/auth/password/reset/ResetCode`);
      navigation?.navigate('ResetPassword');
    }
  }, [fpToken]);

  const passwordForgotForm = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Send Password Reset Code</Text>
            </TouchableOpacity>
            <Texts small center>
                Already have an account?  
                <Texts onPress={() => navigation?.navigate('Signin')} color = "#ff2222"> Sign In</Texts>
            </Texts>
            <Toast />
        </ScrollView>
        
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        {showForm && passwordForgotForm()}
      </View>
    </SafeAreaView>
  );
};

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

export default ForgotPassword;

import React, { Fragment, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signin, authenticate, isAuth } from '../../Actions/userAction';
import GoogleLoginButton from './GoogleLoginButton';
import { registerSignError, nullifySignError } from '../../Reducers/userReducer';
import Texts from '@kaloraat/react-native-text'

const Signin = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user, success, loading, error, token } = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

    }, [token, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            let error = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
            dispatch(registerSignError(error));
            return;
        } else {
            if (!email) {
                let error = 'Email field cannot be empty.';
                await dispatch(registerSignError(error));
                return;
            } else {
                await dispatch(signin(email, password));
            }
        }
    }

    return (
        
            <SafeAreaView style={styles.formContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.form}>
                        <Text style={styles.h1}>Sign in</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => navigation?.navigate('ForgotPassword')}>
                            <Text style={styles.a}>Forgot Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                        <Texts small center>
                            Don't have an account yet?
                            <Texts onPress={() => navigation?.navigate('Signup')} color = "#ff2222">Sign Up</Texts>
                        </Texts>
                        <Texts 
                            small 
                            center
                            onPress={() => navigation?.navigate('ForgotPassword')}
                            style = {{ marginTop: 10, }}
                        >
                            Forgot Password?
                        </Texts>
                        <View style={styles.socialContainer}>
                            <GoogleLoginButton />
                        </View>
                    </View>
                    
                </ScrollView>
                
            </SafeAreaView>
    );
}

export default Signin;

const styles = StyleSheet.create({
        formContainer: {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: '#ffffff',
            marginVertical: 50,
            marginHorizontal: 20,
        },
    form: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width: '100%',
        height: '100%',
    },
    h1: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 24,
    },
    input: {
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 12,
        margin: 8,
        width: '100%',
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
    a:{
        color: '#333',
        fontSize: 14,
        textDecorationLine: 'underline',
        marginVertical: 15,
    },
    socialContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
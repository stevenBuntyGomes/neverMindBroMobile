import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, SafeAreaView, ScrollView, View, Text,
    TextInput, TouchableOpacity, Image, Modal, Button, Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signup, preSignup, authenticate } from '../../Actions/userAction';
import { isAuth } from '../../Actions/userAction';
import { useNavigation } from '@react-navigation/native';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { registerSignError, nullifySignError } from '../../Reducers/userReducer';
import CheckBox from 'expo-checkbox';
import Texts from '@kaloraat/react-native-text'
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';

const Signup = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user, success, loading, error, emailInfo, preToken } = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [termsChecked, setTermsChecked] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    useEffect(() => {
        if (isAuth()) {
            navigation?.navigate('Activate', { preToken });
        }
    }, [isAuth, dispatch]);

    const handleImagePicker = async () => {
        // Request permission to access the media library
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        // Launch the image picker
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ New way
          allowsEditing: true,
          aspect: [1, 1], // Square aspect ratio
          quality: 1, // Highest quality
          base64: true, // Ensure we get the base64 data
        });
    
        // Check if the user picked an image
        if (!result.canceled && result.assets && result.assets.length > 0) {
          const base64Image = result.assets[0].base64;
          const selectedImageUri = result.assets[0].uri;
    
          setProfileImagePreview(selectedImageUri); // Preview the image
          setProfileImage(base64Image); // Store the base64 data for uploading
        } else {
          console.log('Image selection was canceled');
        //   Toast.show({
        //     type: 'warning',
        //     text1: 'Image selection was canceled.',
        //   });
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            let error = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.';
            dispatch(registerSignError(error));
            return;
        } else {
            if (!email || !name) {
                let error = 'Name and email fields cannot be empty.';
                dispatch(registerSignError(error));
                return;
            } else if (!termsChecked) {
                let error = 'You must agree to the terms and conditions to sign up.';
                dispatch(registerSignError(error));
                Toast.show({
                    type: 'error',
                    text1: 'The terms must be agreed and checkbox should be clicked.',
                });
                return;
            } else {
                dispatch(preSignup(name, email, password, profileImage));
            }
        }
    };

    useEffect(() => {
        if(preToken !== null){
          navigation?.navigate('Activate', { preToken });
        }
    }, [preToken]);

    return (
        <SafeAreaView style={styles.formContainer}>
            <ScrollView
                    showsVerticalScrollIndicator={false}
            >
                <View style={styles.form}>
                    <Text style={styles.h1}>Create Account</Text>
                    <Text>or use your email for registration</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
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

                    <View style={styles.imageUploadContainer}>
                        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
                            <Text style={styles.buttonText}>Upload Profile Image (Optional)</Text>
                        </TouchableOpacity>
                        {profileImagePreview && (
                            <Image
                                source={{ uri: profileImagePreview }}
                                style={styles.profileImage}
                            />
                        )}
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={termsChecked}
                            onValueChange={setTermsChecked}
                            color={termsChecked ? 'black' : undefined} // Set the color to black when checked
                        />
                        <Text style={styles.checkboxLabel}>
                            I agree to the <Text onPress={() => setShowTermsModal(true)} style={styles.link}>terms and conditions</Text>
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!termsChecked}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <Texts small center>
                        Already have an account?  
                        <Texts onPress={() => navigation?.navigate('Signin')} color = "#ff2222"> Sign In</Texts>
                    </Texts>
                </View>

                <Modal
                    visible = {showTermsModal}
                    onRequestClose = {() => setShowTermsModal(false)}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Terms and Conditions</Text>
                            <Text># The site does not save any personal information except the email address which is for login purposes.</Text>
                            <Text># The site does not access any local storage information except user login of any device.</Text>
                            <Text># The site only saves login information like email. Nothing else.</Text>
                            <Text># This site does not access the camera of any device.</Text>
                            <Text># Anyone can write whatever they want on this site.</Text>
                            <Text># If you or anyone feels offended, please leave the site.</Text>
                            <Text># There will be no punishment or judgment on this site for writing.</Text>
                            <Text># Nothing on this site will be taken seriously. Everything is for fun and expressing the deepest desire of oneself.</Text>
                            <Text># People can write their deepest and darkest thoughts on any topic. So if you feel offended, just leave. Because nothing on this site will be taken seriously. So you can share yours too or leave.</Text>
                            {/* <Button style={styles.button} title="Close" onPress={() => setShowTermsModal(false)} /> */}
                            <TouchableOpacity style={styles.button} onPress={() => setShowTermsModal(false)}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Toast />
            </ScrollView>
            
        </SafeAreaView>
    );
};

export default Signup;

const styles = StyleSheet.create({
        formContainer: {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: '#ffffff',
            marginVertical: 50,
            marginHorizontal: 20,
        },
        link: {
            color: 'blue',
            textDecorationLine: 'underline', 
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
    uploadButton: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    a: {
        color: '#333',
        fontSize: 14,
        textDecorationLine: 'underline',
        marginVertical: 15,
    },
    socialContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center horizontally
        marginVertical: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        marginLeft: 10,
    },

    // modal
    modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

    // modal

});
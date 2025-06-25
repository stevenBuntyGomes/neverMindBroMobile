import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, StyleSheet, Text, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userUpdate, getProfile, userImageUpdateAciton, updateUserPassword, updateContentFilter } from '../../Actions/publicUserAction';
import * as ImagePicker from 'expo-image-picker';
import FooterTabs from '../../Components/nav/FooterTabs';
import Toast from 'react-native-toast-message';
import { nullifyMessage } from '../../Reducers/userReducer';

const ProfileSettings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, loading, updatedUser, message } = useSelector((state) => state.user);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  useEffect(() => {
    getUserInformationHandler();
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setName(user.name);
      setEmail(user.email);
      setAbout(user.about || '');
      if (user.photo) {
        setProfileImagePreview(user.photo.url);
      }
    }
  }, [user]);

  useEffect(() => {
    if(updatedUser !== null){
      navigation?.navigate('ProfileUser', { username: updatedUser?.username });
    }
  }, [updatedUser]);

  useEffect(() => {
    if (message !== null) {
      Toast.show({
        type: 'success',
        text1: message,
      });
      dispatch(nullifyMessage());
    }
  }, [message]);


  const getUserInformationHandler = async () => {
    await dispatch(getProfile());
  };

  const updateFilterFunction = async () => {
    if (selectedNumber !== null) {
      await dispatch(updateContentFilter(selectedNumber));
    }
  };


  const handleImagePicker = async () => {
    // Request permission to access the media library
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Sorry, we need camera roll permissions to make this work!',
      });
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['image'], // ✅ New way
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
      Toast.show({
        type: 'warning',
        text1: 'Image selection was canceled.',
      });
    }
  };


  const handleSubmit = async () => {
    if (!username || !name || !email){
      Toast.show({
          type: 'error',
          text1: 'Some fields are required.',
      });
    }
    await dispatch(userUpdate(username, name, email, about, profileImage));
    getUserInformationHandler();
    
  };

  const handleImageSubmit = async () => {
    if (profileImage){
      const base64Image = `data:image/jpeg;base64,${profileImage}`;
      await dispatch(userImageUpdateAciton(base64Image));
      getUserInformationHandler();
    }
  };

  const handlePasswordSubmit = async () => {
    if (!password || !confirmPassword || !oldPassword) {
      Toast.show({
          type: 'error',
          text1: 'Password fields are required.',
      });
    } else if (password !== confirmPassword) {
      Toast.show({
          type: 'error',
          text1: 'Password and Confirm Password do not match!',
      });
    } else {
      await dispatch(updateUserPassword(oldPassword, password, confirmPassword));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Image 
            source={{ uri: profileImagePreview }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
            <Text style={styles.buttonText}>Choose Profile Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Update Profile Image</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
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
            placeholder="About"
            value={about}
            onChangeText={setAbout}
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity onPress={handlePasswordSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>

          {/* update filter starts */}
          <Text style={{ marginTop: 10, marginBottom: 5, fontWeight: '600' }}>
            After how many words should filter apply:
          </Text>

          <TouchableOpacity 
            onPress={() => setFilterModalVisible(true)} 
            style={styles.input}
          >
            <Text>{selectedNumber ? `${selectedNumber} words` : "Select a number"}</Text>
          </TouchableOpacity>

          {/* Modal for selecting number */}
          <Modal visible={filterModalVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {[2, 4, 8, 10].map((num) => (
                    <TouchableOpacity
                      key={num}
                      onPress={() => {
                        setSelectedNumber(num);
                        setFilterModalVisible(false);
                      }}
                      style={styles.modalItem}
                    >
                      <Text style={styles.modalText}>{num}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity onPress={() => setFilterModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.button} onPress={updateFilterFunction}>
            <Text style={styles.buttonText}>Update Filter</Text>
          </TouchableOpacity>
          {/* update filter ends */}
        </View>
      </ScrollView>
      <Toast/>
      <View style={styles.footer}>
            <FooterTabs />
        </View>
    </SafeAreaView>
  );
}

export default ProfileSettings


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 12,
    marginVertical: 10,
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
  },
  footer: {
        backgroundColor: '#333',
        justifyContent: 'flex-end',
    },

    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '85%',
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
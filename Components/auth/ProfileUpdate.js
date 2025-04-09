import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { userUpdate, getProfile, userImageUpdateAciton, updateUserPassword } from '../../Actions/publicUserAction';
import { API } from '../../config';

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setName(user.name || '');
      setEmail(user.email || '');
      setAbout(user.about || '');
      if (user.photo?.url) {
        setProfileImage(user.photo.url);
      }
    }
  }, [user]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(`data:image/jpeg;base64,${result.base64}`);
    }
  };

  const handleImageSubmit = async () => {
    if (!profileImage) return;
    await dispatch(userImageUpdateAciton(profileImage));
    dispatch(getProfile());
    Alert.alert("Success", "Image updated!");
  };

  const handleSubmit = async () => {
    if (!username || !name || !email) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    await dispatch(userUpdate(username, name, email, about));
    dispatch(getProfile());
    Alert.alert("Success", "Profile updated!");
  };

  const handlePasswordSubmit = async () => {
    if (!oldPassword || !password || !confirmPassword) {
      Alert.alert("Error", "All password fields are required!");
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
    } else {
      await dispatch(updateUserPassword(oldPassword, password, confirmPassword));
      Alert.alert("Success", "Password updated!");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        )}
        <Button title="Pick Image" onPress={pickImage} />
        <Button title="Update Image" onPress={handleImageSubmit} color="green" />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Update Profile Info</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.textArea} placeholder="About" multiline value={about} onChangeText={setAbout} />
        <Button title="Update Info" onPress={handleSubmit} />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Update Password</Text>
        <TextInput style={styles.input} placeholder="Old Password" value={oldPassword} secureTextEntry onChangeText={setOldPassword} />
        <TextInput style={styles.input} placeholder="New Password" value={password} secureTextEntry onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} secureTextEntry onChangeText={setConfirmPassword} />
        <Button title="Update Password" onPress={handlePasswordSubmit} color="orange" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    height: 100,
    textAlignVertical: 'top',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ProfileUpdate;

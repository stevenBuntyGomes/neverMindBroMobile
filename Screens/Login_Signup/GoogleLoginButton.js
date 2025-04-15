import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginWithGoogle } from '../../Actions/userAction';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { GOOGLE_CLIENT_ID } from '../../config';

const GoogleLoginButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.user);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID, // replace with your Google Client ID
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true, // Use Expo’s proxy URI for handling redirects in Expo Go
    })
  });

  useEffect(() => {
    
  }, [token, user, dispatch]);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      dispatch(loginWithGoogle(id_token));
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />
      {loading && <Text>Loading...</Text>}
    </View>
  );
};

export default GoogleLoginButton;

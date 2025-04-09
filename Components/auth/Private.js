import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isAuth, getUserProfile } from '../../Action/userAction';

const Private = ({ children }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { user, loading } = useSelector((state) => state.user);

  const getUserProfileHandler = async () => {
    if (isAuth()) {
      await dispatch(getUserProfile());
    }
  };

  useEffect(() => {
    getUserProfileHandler();

    if (!isAuth()) {
      navigation.navigate('Signin');
    } else if (isAuth()) {
      if (user?.role === 1) {
        navigation.navigate('Admin');
      } else if (user?.role === 0) {
        if (route.name === 'Update') {
          navigation.navigate('Update');
        } else if (route.name === 'CreateBlog') {
          navigation.navigate('CreateBlog');
        } else if (route.name === 'UserBlogs') {
          navigation.navigate('UserBlogs');
        }
      }
    }
  }, [dispatch, user]);

  return <View>{children}</View>;
};

export default Private;

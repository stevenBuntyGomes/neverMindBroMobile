import React, {useState, useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { setTokenApp } from '../../Actions/userAction';
import Signin from '../../Screens/Login_Signup/Signin'
import Signup from '../../Screens/Login_Signup/Signup'
import HeaderTabs from './HeaderTabs';
import Home from '../../Screens/Home'
import Activate from '../../Screens/activate/Activate';
import ForgotPassword from '../../Screens/Login_Signup/ForgotPassword';
import ResetPassword from '../../Screens/Login_Signup/ResetPassword';
import Search from '../../Screens/Search/Search';
import SingleQuestion from '../../Screens/Question/SingleQuestion';
import SingleBlog from '../../Screens/Blogs/SingleBlog';
import UpdateQuestion from '../../Screens/Question/UpdateQuestion';
import ProfileUser from '../../Screens/Profile/ProfileUser';
import FollowersFollowings from '../../Screens/Profile/FollowersFollowings';
import Notifications from '../../Screens/Notifications/Notifications';
import ProfileSettings from '../../Screens/Profile/ProfileSettings';
import Blogs from '../../Screens/Blogs/Blogs';
import BlogCreate from '../../Screens/Blogs/BlogCreate';
import BlogUpdate from '../../Screens/Blogs/BlogUpdate';

const Stack = createNativeStackNavigator();

export default function ScreensNav(){
    const dispatch = useDispatch();
    const {token, loading} = useSelector((state) => state.user);
    const getToken = async () => {
      const authToken = await AsyncStorage.getItem('@token');
      dispatch(setTokenApp(authToken));
    }

    useEffect(() => {
      getToken();
    }, [dispatch]);
  return (
    <Stack.Navigator initialRouteName={token && token ? "Home" : "Signin"}>
      {token && token ? (
        <>
          <Stack.Screen name = "Home" component={Home}
              options = {{
                  title: "Never Mind Bro",
                  headerRight: () => <HeaderTabs/>,
                  headeheaderStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
          <Stack.Screen name = "Blogs" component={Blogs}
              options = {{
                  title: "Never Mind Bro",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
          <Stack.Screen name = "Search" component={Search}
              options = {{
                  title: "Search",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
          <Stack.Screen name = "SingleQuestion" component={SingleQuestion}
              options = {{
                  title: "Single Question",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
          <Stack.Screen name = "SingleBlog" component={SingleBlog}
              options = {{
                  title: "Single Blog",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },
              }
          }/>
          <Stack.Screen name = "BlogCreate" component={BlogCreate}
              options = {{
                  title: "Create Blog",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },
              }
          }/>
          <Stack.Screen name = "BlogUpdate" component={BlogUpdate}
              options = {{
                  title: "Update Blog",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },
              }
          }/>
          <Stack.Screen name = "ProfileUser" component={ProfileUser}
              options = {{
                  title: "User Profile",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
          <Stack.Screen name = "followersfollowings" component={FollowersFollowings}
              options = {{
                  title: "Followers/Followings",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
          <Stack.Screen name = "Notifications" component={Notifications}
              options = {{
                  title: "Notifications",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
          <Stack.Screen name = "ProfileSettings" component={ProfileSettings}
              options = {{
                  title: "Settings",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
          <Stack.Screen name = "UpdateQuestion" component={UpdateQuestion}
              options = {{
                  title: "Update Question",
                  headerRight: () => <HeaderTabs/>,
                  headerStyle: {
                    backgroundColor: 'white', // Set the background color of the header
                  },
                  headerTitleStyle: {
                    color: '#333', // Set the header title color
                  },

              }
          }/>
        </>
      ) : (
        <>
          <Stack.Screen name = 'Signin' component={Signin} options ={{headerShown: false}} />
          <Stack.Screen name = 'Signup' component={Signup} options ={{headerShown: false}} />
          <Stack.Screen name = 'ForgotPassword' component={ForgotPassword} options ={{headerShown: false}} />
          <Stack.Screen name = 'Activate' component={Activate} options ={{headerShown: false}} />
          <Stack.Screen name = 'ResetPassword' component={ResetPassword} options ={{headerShown: false}} />
        </>
      )}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }
});


import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, View, Text, Image, StyleSheet, ActivityIndicator, 
    TouchableOpacity, ScrollView, Modal, FlatList, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getAuthUserInPublic, getProfileInformationAction, publicUserForFollow } from '../../Actions/publicUserAction';
import { followAndUnfollowUser } from '../../Actions/userAction';
import { useNavigation, useRoute } from '@react-navigation/native';
import FooterTabs from '../../Components/nav/FooterTabs';
import User from '../../Components/User/User';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileAnswer from '../../Components/User/ProfileAnswer';
import ProfileBlog from '../../Components/User/ProfileBlog';
import ProfileQuestion from '../../Components/User/ProfileQuestion';
import {nullifyUpdatedUser} from '../../Reducers/userReducer'

const FollowersFollowings = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const { username } = route.params;
    const [publicUser, setPublicUser] = useState(null);
    const { auth, FollowUser: user } = useSelector((state) => state.user);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'followers', title: 'Followers' },
        { key: 'followings', title: 'Followings' },
    ]);

    useEffect(() => {
        dispatch(nullifyUpdatedUser());
        const getPublicUserHandler = async () => {
            await dispatch(publicUserForFollow(username));
        };

        const getProfileInformationHandler = async () => {
            await dispatch(getProfileInformationAction(username));
        };

        getPublicUserHandler();
        getProfileInformationHandler();
    }, [dispatch, username]);

    useEffect(() => {
        setPublicUser(user);
    }, [user]);

    if (!publicUser) {
        return (
            <>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </>
        );
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'followers':
                return (
                    <>
                        {user?.followers?.length ? (
                            <FlatList
                            data={user?.followers}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <User
                                    userId={item._id}
                                    name={item.name}
                                    photo={item.photo?.url}
                                    username={item.username}
                                />
                            )}
                            />
                        ) : (
                            <Text>No Likes Yet</Text>
                        )}
                    </>
                );
            case 'followings':
                return (
                    <>
                        {user?.following?.length ? (
                            <FlatList
                                data={user?.following}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                <User
                                    userId={item._id}
                                    name={item.name}
                                    photo={item.photo?.url}
                                    username={item.username}
                                />
                        )}
                            />
                        ) : (
                            <Text>No Likes Yet</Text>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    const initialLayout = { width: Dimensions.get('window').width };
  return (
    <SafeAreaView style={styles.container}>
        <View 
            // showsVerticalScrollIndicator={false} 
            // contentContainerStyle={styles.scrollViewContent}
            style = {styles.scrollViewContent}
        >
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: 'black' }}
                    style={styles.tabBar}
                    labelStyle={styles.tabLabel}
                    activeColor="#333"  
                    inactiveColor="gray" 
                />
                )}
            />
        </View>
    </SafeAreaView>
  )
}

export default FollowersFollowings


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
    },
    questionContainer: {
        marginBottom: 20,
    },
    commentCardLink: {
        alignItems: 'center',
    },
    commentUserImage: {
        width: 70,
        height: 70,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#333',
        justifyContent: 'flex-end',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    actionsContainer2: {
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        borderRadius: 20,
        backgroundColor: 'transparent',
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
        width: '45%',
        marginBottom: 10,
        borderWidth: 1,  // Add this line
        borderColor: '#333',  // Add this line
    },
    buttonBorderless: {
        borderRadius: 20,
        backgroundColor: 'transparent',
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,  // Add this line
        borderColor: 'transparent',  // Add this line
    },
    buttonRed: {
        borderRadius: 20,
        backgroundColor: 'red',
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
        width: '45%',
        marginBottom: 10,
        borderWidth: 1,  // Add this line
        borderColor: 'red',  // Add this line
    },
    buttonText: {
      color: '#333',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    buttonTextWhite: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // paddingBottom: 10,
    },
    dialog: {
        width: '90%',
        maxHeight: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    tabBar: {
        backgroundColor: 'white',
        color: 'black',
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    tabLabelActive: {
        color: '#333',
    },
    tabLabelInactive: {
        color: '#333',
    },
    loaderContainer: {
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
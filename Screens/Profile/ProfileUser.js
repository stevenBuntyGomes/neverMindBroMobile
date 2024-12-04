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


const ProfileUser = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const { username } = route.params;
    const { auth, FollowUser: user } = useSelector((state) => state.user);
    const [publicUser, setPublicUser] = useState(null);
    const [followUsers, setFollowUsers] = useState(false);
    const [followersOrFollowing, setFollowersOrFollowing] = useState(-1);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'questions', title: 'Questions' },
        { key: 'answers', title: 'Answers' },
        { key: 'blogs', title: 'Blogs' },
    ]);
    const userFollowhandlers = (condition) => {
        setFollowUsers(!followUsers);
        setFollowersOrFollowing(condition);
    }

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

    const followHandler = async () => {
        await dispatch(followAndUnfollowUser(user._id));
    }

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
            case 'questions':
                return <ProfileQuestion username={username} />;
            case 'answers':
                return <ProfileAnswer username={username} />;
            case 'blogs':
                return <ProfileBlog username={username} />;
            default:
                return null;
        }
    };


    const initialLayout = { width: Dimensions.get('window').width };

    return (
        <SafeAreaView style={styles.container}>
            <Toast />
            <View 
                // showsVerticalScrollIndicator={false} 
                // contentContainerStyle={styles.scrollViewContent}
                style = {styles.scrollViewContent}
            >
                <View style={styles.questionContainer}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ProfileUser', { username: user?.username })} 
                        style={styles.commentCardLink}
                    >
                        <Image 
                            style={styles.commentUserImage} 
                            source={{ uri: user?.photo?.url }} 
                            alt={user?.name} 
                        />
                        <Text style={styles.userName}>{user?.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity 
                    //followersfollowings
                        style={styles.button} 
                        onPress={() => navigation.navigate('followersfollowings', { username: user?.username })}>
                        <Text style={styles.buttonText}>Followers</Text>
                    </TouchableOpacity>
                    
                    {auth &&auth?._id ? (
                        <>
                            {user?._id == auth?._id ? (
                                <TouchableOpacity 
                                    style={styles.button} 
                                    onPress={() => navigation.navigate('ProfileSettings')}>
                                    <Text style={styles.buttonText}>Settings</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity 
                                    style={user && user?.followers?.findIndex((l) => l._id == auth?._id) > -1 ? styles.buttonRed : styles.button} 
                                    onPress={followHandler}>
                                    <Text style={user && user?.followers?.findIndex((l) => l._id == auth?._id) > -1 ? styles.buttonTextWhite : styles.buttonText}>{user && user?.followers?.findIndex((l) => l._id == auth?._id) > -1 ? 'Unfollow' : 'Follow'}</Text>
                                </TouchableOpacity>
                            )}
                        </>
                        
                    ) : (<></>)}
                </View>
                {/* <View style={styles.actionsContainer2}>
                    
                </View> */}
                <Modal 
                    visible={followUsers} 
                    transparent={true} 
                    onRequestClose={() => setFollowUsers(!followUsers)}
                    animationType="slide"
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.dialog}>
                        <Text style={styles.modalTitle}>{followersOrFollowing == 1 && 'Followers'}{followersOrFollowing == 2 && 'Following'}</Text>
                        {followersOrFollowing == 1 && (
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
                        )}
                        {followersOrFollowing == 2 && (
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
                        )}
                        <TouchableOpacity style={styles.buttonRed} onPress={() => setFollowUsers(!followUsers)}>
                            <Text style={styles.buttonTextWhite}>close</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
            <View style={styles.footer}>
                <FooterTabs />
            </View>
        </SafeAreaView>
    );
};

export default ProfileUser;

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
        fontSize: 16,
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
      fontSize: 12
    },
    buttonTextWhite: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 12
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
});
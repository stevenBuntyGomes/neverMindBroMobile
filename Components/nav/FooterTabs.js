import React, {useState, useEffect} from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Texts from '@kaloraat/react-native-text'
import {Divider} from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Badge } from 'react-native-paper';
import { useSelector } from 'react-redux'

export const Icon = ({name, text, handlePress, screenName, routeName}) => {
    const activeScreenColor = screenName === routeName && 'white';
    const { messageNotifications } = useSelector((state) => state.messages);
    const [messageNotificationCount, setMessageNotifciationCount] = useState([]);

    useEffect(() => {
    // console.log('notification has been updated', messageNotifications);
        setMessageNotifciationCount(messageNotifications);
    }, [messageNotifications?.length]);
    return (
        <TouchableOpacity onPress={handlePress}>
            <>
                {name == 'facebook-messenger' && messageNotificationCount.length > 0 && (
                    <Badge style={styles.badge}>{messageNotificationCount.length}</Badge>
                )}
                <FontAwesome5
                    name = {name} 
                    size = {25} 
                    style = {styles.fontAwesome}
                    color = {activeScreenColor}
                />
                
            </>
        </TouchableOpacity>
    );
}

const FooterTabs = () => {
    const navigation = useNavigation();
    const route = useRoute();
    return(
        <>
            <Divider width={1}/>
            <View style = {styles.container}>
                <Icon
                    name = "home" 
                    text = "Home" 
                    handlePress = {() => navigation.navigate('Home')}
                    screenName = "Home"
                    routeName = {route.name} 
                />
                <Icon
                    name = "book" 
                    text = "book" 
                    handlePress = {() => navigation.navigate('Blogs')}
                    screenName = "Blogs"
                    routeName = {route.name} 
                />
                <Icon
                    name = "facebook-messenger" 
                    text = "Chats" 
                    handlePress = {() => navigation.navigate('Chats')}
                    screenName = "CreateBook"
                    routeName = {route.name} 
                />
                <Icon
                    name = "list-ol" 
                    text = "Profile" 
                    handlePress = {() => navigation.navigate('Profile')}
                    screenName = "Profile"
                    routeName = {route.name}  
                />
                <Icon 
                    name = "user" 
                    text = "Account" 
                    handlePress = {() => navigation.navigate('Account')}
                    screenName = "Account"
                    routeName = {route.name}
                />
            </View>
        </>
    );
}

export default FooterTabs;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between',
    },
    fontAwesome: {
        marginBottom: 3,
        alignSelf: 'center',
        color: 'white'
    },
    badge: {
        position: 'absolute',
        zIndex: 100,
        top: -4,
        right: -10,
        backgroundColor: 'red',
        color: '#fff',
        fontSize: 12,
        height: 20,
        minWidth: 20,
        borderRadius: 10,
        textAlign: 'center',
        paddingHorizontal: 4,
    },
});

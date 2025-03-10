import React from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Texts from '@kaloraat/react-native-text'
import {Divider} from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export const Icon = ({name, text, handlePress, screenName, routeName}) => {
    const activeScreenColor = screenName === routeName && 'white'; 
    return (
        <TouchableOpacity onPress={handlePress}>
            <>
                <FontAwesome5
                    name = {name} 
                    size = {25} 
                    style = {styles.fontAwesome}
                    color = {activeScreenColor}
                />
                {/* <Texts>
                    {text}
                </Texts> */}
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
});

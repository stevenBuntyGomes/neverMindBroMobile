import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const User = ({
    userId = null, 
    name = null, 
    photo = null, 
    username = null,
    createdAt = null,
}) => {
    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation?.navigate('ProfileUser', { username: username })} style={styles.commentCardLink}>
        <View style={styles.userSection}>
            <Avatar
                rounded
                source={{ uri: photo }}
                size="medium"
            />
            <Text style={styles.userName}>
                {name}{"\n"}
                {createdAt !== null && (
                    <Text style={styles.date}>Published {dayjs(createdAt).fromNow()}</Text>
                )}
            </Text>
            
        </View>
        {/* <Image style={styles.commentUserImage} source={{ uri: photo }} alt={name} />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userName}>/{userId}</Text> */}
    </TouchableOpacity>
  )
}

export default User

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 20,
        // backgroundColor: 'white',
        // margin: 20,
        flex: 1,
        borderRadius: 5,
    },
    // commentCardLink: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     padding: 10,
    //     // marginTop: 10,
    //     backgroundColor: '#fff',
    //     borderRadius: 8,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 8,
    //     elevation: 2,
    // },
    commentUserImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    date: {
        marginLeft: 8,
        fontSize: 14,
        color: '#777',
    },

});
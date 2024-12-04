import React from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native'

const SubmitButton = ({title, handleSubmit, loading}) => {
    return (
        <TouchableOpacity
            onPress = {handleSubmit}
            style = {styles.TouchableOpacity}
        >
            <View style = {styles.submitBtn}>
                <Text style = {styles.headline}>{loading ? "please wait" : title}</Text>
            </View>
            
        </TouchableOpacity>
    )
}

export default SubmitButton;

const styles = StyleSheet.create({
    TouchableOpacity: {
        backgroundColor: "#ff9900",
        justifyContent: "center",
        height: 50,
        marginBottom: 20,
        marginHorizontal: 40,
        borderRadius: 24,
    },
    submitBtn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    headline: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 0,
        width: 200,
        color: '#fff'
    }
});
import React from 'react'
// import { WebView } from 'react-native-webview';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Provider } from 'react-native-paper';

const AnswerWebView = () => {
  return (
    <View >
        <WebView
        // originWhitelist={['*']}
            source={{ html: answerView }}
            style={styles.answerBody}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
        />
    </View>
    // <Text>
    //     {answerView}
    // </Text>
  )
}

export default AnswerWebView

const styles = StyleSheet.create({

});
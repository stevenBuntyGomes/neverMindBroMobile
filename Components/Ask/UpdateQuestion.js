import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const UpdateQuestion = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
        >

        </ScrollView> */}
    </SafeAreaView>
  )
}

export default UpdateQuestion

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
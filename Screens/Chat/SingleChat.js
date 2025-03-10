import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import SingleChat from '../../Components/Chats/SingleChat';

const ResponsiveChatBox = () => {
  const { auth, user } = useSelector((state) => state.user);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatContainer}>
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </View>
    </SafeAreaView>
  );
};

export default ResponsiveChatBox;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'center',
    height: height * 0.915, // Matches the 91.5vh from Next.js version
  },
});

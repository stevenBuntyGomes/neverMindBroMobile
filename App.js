import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './RootNavigation'
import { Provider } from 'react-redux';
import { store } from './store';
import { ENDPOINT } from './config';
import { useNavigationContainerRef } from "@react-navigation/native";
let socket;

export default function App() {
  return (
    <Provider store = {store}>
      <RootNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
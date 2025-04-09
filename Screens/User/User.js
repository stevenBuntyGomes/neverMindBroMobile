import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Private from '../../Components/auth/Private'; // Ensure this is your mobile-adapted version
import { useNavigation } from '@react-navigation/native';

const UserHome = () => {
  const navigation = useNavigation();

  return (
    <Private>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>User Settings</Text>

        <View style={styles.listContainer}>
          <TouchableOpacity style={[styles.listItem, styles.activeItem]}>
            <Text style={styles.listItemTextActive}>Profile Update</Text>
          </TouchableOpacity>

          {/* Uncomment if needed
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('CategoryTag')}>
            <Text style={styles.listItemText}>Create Category/Tag</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('UserBlogs')}>
            <Text style={styles.listItemText}>Update/Delete Blog</Text>
          </TouchableOpacity>
          */}

          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Update')}>
            <Text style={styles.listItemText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Private>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  activeItem: {
    backgroundColor: '#007bff',
  },
  listItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  listItemTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default UserHome;

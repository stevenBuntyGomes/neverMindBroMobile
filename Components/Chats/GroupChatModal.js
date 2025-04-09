import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupChat, searchUserAction } from '../../Actions/chatAction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const GroupChatModal = ({auth}) => {
  const { searchChatUsers: users } = useSelector((state) => state.userChat);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    await dispatch(searchUserAction(query));
    setLoading(false);
  };


  const handleSubmit = () => {
    if (!groupChatName || !selectedUsers.length) {
      alert('Please complete all fields.');
      return;
    }

    dispatch(
      createGroupChat({
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      })
    );
    alert('Group created!');
    setOpen(false);
    setGroupChatName('');
    setSelectedUsers([]);
    setSearch('');
  };

  const handleDelete = (delUser) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== delUser._id));
  };

  const handleGroup = (user) => {
    if (selectedUsers.some((u) => u._id === user._id)) {
      alert('User already added.');
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
    console.log('User added:', selectedUsers)
  };

  useEffect(() => {
    if (auth && auth._id) {
      handleSearch(auth.name);
    }
  }, [auth]);


  useEffect(() => {
  if (users.length > 0 && auth && auth._id) {
    const match = users.find((user) => user._id === auth._id);
    if (match) {
      setSelectedUsers((prev) => {
        const alreadyExists = prev.some((u) => u._id === match._id);
        if (!alreadyExists) {
          return [match, ...prev];
        }
        return prev;
      });
    }
  }
}, [users, auth]);





  useEffect(() => {
    handleSearch(search);
    if (search === '') setLoading(false);
  }, [search]);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <FontAwesome5 name="plus" size={20} color="black" style={{ marginRight: 8 }} />
        <Text style={styles.text}>New Group Chat</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Create Group Chat</Text>

            <TextInput
              placeholder="Group Name"
              style={styles.input}
              onChangeText={setGroupChatName}
              value={groupChatName}
            />

            <TextInput
              placeholder="Add Users"
              style={styles.input}
              onChangeText={setSearch}
              value={search}
            />

            <View style={styles.selectedList}>
              {selectedUsers.map((user) => (
                
                <View key={user._id} style={styles.chip}>
                  <Text>{user?.name}</Text>
                  {auth._id !== user._id ? (<>
                    <TouchableOpacity onPress={() => handleDelete(user)}>
                      <FontAwesome5 name="times-circle" size={18} color="red" />
                    </TouchableOpacity>
                  </>) : (
                    <></>
                  )}
                  
                </View>
              ))}
            </View>

            {loading ? (
              <ActivityIndicator size="small" color="gray" />
            ) : (
              <>
                {auth && (
                  <FlatList
                    data={users}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.userItem}
                        onPress={() => handleGroup(item)}
                      >
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyboardShouldPersistTaps="handled"
                    style={{ maxHeight: 200 }}
                  />
                )}
              </>
            )}

            <TouchableOpacity style={styles.buttonDark} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create Group Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOpen(false)}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '85%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  selectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    margin: 2,
  },
  userItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    marginVertical: 4,
    borderRadius: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonDark: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  text: {
    color: 'black',
    fontWeight: '500',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  closeText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
});

export default GroupChatModal;
